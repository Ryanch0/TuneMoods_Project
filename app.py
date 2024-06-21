import random
from flask import Flask, request, jsonify
from transformers import pipeline, MarianMTModel, MarianTokenizer
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

app = Flask(__name__)

# 번역 모델 로드
model_name = 'Helsinki-NLP/opus-mt-ko-en'
translation_tokenizer = MarianTokenizer.from_pretrained(model_name)
translation_model = MarianMTModel.from_pretrained(model_name)

# 영어 감정 분석 모델 로드
emotion_classifier = pipeline('sentiment-analysis', model="nlptown/bert-base-multilingual-uncased-sentiment")

# 유튜브 API 설정
YOUTUBE_API_KEY = 'SecretKey'
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# 이전 추천된 비디오 목록
previous_videos = []

# 추가적 키워드 학습
sad_keywords = ["슬픔", "우울", "눈물", "고독", "외로움","슬프","슬퍼","슬픈","외로운","외로워","외롭게","ㅠㅠ"]
annoyed_keywords = ["짜증", "심기불편","ㅡㅡ","빡쳐"]
positive_keywords = ["ㅋㅋ","ㅎㅎ","하하","호호"]


def translate_to_english(text):
    translated = translation_model.generate(**translation_tokenizer(text, return_tensors="pt"))
    return translation_tokenizer.decode(translated[0], skip_special_tokens=True)

def search_youtube(query):
    global previous_videos  # 전역 변수 접근
    try:
        request = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=10  # 더 많은 결과 가져오기
        )
        response = request.execute()
        results = []
        for item in response['items']:
            video_id = item['id']['videoId']
            title = item['snippet']['title']
            url = f"https://www.youtube.com/watch?v={video_id}"
            if url not in previous_videos:  # 이전에 추천되지 않은 동영상만 추가
                results.append({'title': title, 'url': url})
        random.shuffle(results)  # 결과 셔플링
        if results:
            previous_videos.append(results[0]['url'])  # 추천된 비디오를 기록
        return results[:1]  # 1개 결과 반환
    except HttpError as e:
        print(f"An HTTP error {e.resp.status} occurred: {e.content}")
        return []

def interpret_emotion(label):

    positive_queries = [
        "신나는 노래", "여행갈때 듣는 노래", "아이돌노래", "희망찬 노래", "기분좋아지는 노래"
    ]
    sad_queries = [
        "슬픈노래", "우울한노래", "분위기있는 노래", "슬픈발라드", "슬픈 피아노곡"
    ]
    angry_queries = [
        "동기부여 음악", "빡센 노래", "운동할때 듣는노래", "힙합노래", "강렬한 노래"
    ]
    annoyed_queries = [
        "기분전환 노래", "스트레스 해소 노래", "짜증날때 듣는 노래", "분노조절 해주는 노래", "비트가 좋은 노래"
    ]
    neutral_queries = [
        "조용한 노래", "평화로운 노래", "잔잔한 노래", "명상할때 듣는 노래", "차분해지는 노래"
    ]

    if '4 star' in label or '5 star' in label:
        return '좋아 보이네요 😊', random.choice(positive_queries)
    elif '1 star' in label:
        return '슬퍼 보여요 😥', random.choice(sad_queries)
    elif '2 star' in label:
        return '화가 난 거 같아요 🤬', random.choice(angry_queries)
    elif '3 star' in label:
        return '짜증 나 보여요 😡', random.choice(annoyed_queries)
    else:
        return '중립적인 거 같네요 😐', random.choice(neutral_queries)

@app.route('/analyze_emotion', methods=['POST'])
def analyze_emotion():
    text = request.json['text']

    # 특정 단어가 있는지 확인
    if any(keyword in text for keyword in sad_keywords):
        label = '1 star'
    elif any(keyword in text for keyword in annoyed_keywords):
        label = '3 start'
    elif any(keyword in text for keyword in positive_keywords):
        label = "4 start"    
    else:
        translated_text = translate_to_english(text)
        result = emotion_classifier(translated_text)
        label = result[0]['label']
    
    emotion, query = interpret_emotion(label)
    
    recommended_music = search_youtube(query + " official music video")
    if not recommended_music:
        return jsonify({'emotion': emotion, 'message': f'기분이 {emotion}하군요! 지금은 유튜브 API 쿼터가 초과되어 추천 음악을 제공할 수 없습니다.'}), 200

    return jsonify({'emotion': emotion, 'recommended_music': recommended_music})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
