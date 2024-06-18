import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Sidebar from './Sidebar';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function EmotionAnalyzer() {
    const [text, setText] = useState('');
    const [chat, setChat] = useState([]);
    const [lastQuery, setLastQuery] = useState('');
    const [previousVideos, setPreviousVideos] = useState([]);
    
    // 사용자 정보와 플레이리스트 데이터 추가
    const [playlists,setPlaylists] = useState(['플레이리스트 1', '플레이리스트 2', '플레이리스트 3']);
    const [username,setUsername] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        fetchCurrentUser();
    },[])

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('/api/users/myName',{
                withCredentials: true
            });
            if(response.status === 200) {
                setUsername(response.data);
                console.log(response.data,'성공')
            } else{
                console.error("@check failed")
            }
            
        } catch(error) {
            console.error('Error', error)
            setUsername('');
        }
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim() === '') return;

        const userMessage = { sender: 'user', text };
        setChat([...chat, userMessage]);

        try {
            const response = await axios.post('/api/analyze-emotion', { text });
            const aiEmotion = response.data.emotion;
            const aiMessageText = response.data.message || `기분이 ${aiEmotion} 이런 노래는 어떠세요?`;
            const aiRecommendations = response.data.recommended_music || [];

            const aiMessage = { sender: 'ai', text: aiMessageText };
            const aiRecommendationsMessage = {
                sender: 'ai',
                recommendations: aiRecommendations,
                query: text
            };

            setChat([...chat, userMessage, aiMessage, ...(aiRecommendations.length ? [aiRecommendationsMessage] : [])]);
            setPreviousVideos([...previousVideos, ...aiRecommendations.map(rec => rec.url)]);
            setLastQuery(text);
        } catch (error) {
            console.error("There was an error processing your request!", error);
        }

        setText('');
    };

    const handleRecommendationRequest = async (query) => {
        try {
            const response = await axios.post('/api/analyze-emotion', { text: query });
            const aiRecommendations = response.data.recommended_music || [];
            const newRecommendations = aiRecommendations.filter(rec => !previousVideos.includes(rec.url));

            const aiMessage = { sender: 'ai', text: "다른 노래로 다시 추천해드릴게요." };
            const aiRecommendationsMessage = {
                sender: 'ai',
                recommendations: newRecommendations,
                query
            };

            setChat([...chat, aiMessage, aiRecommendationsMessage]);
            setPreviousVideos([...previousVideos, ...newRecommendations.map(rec => rec.url)]);
        } catch (error) {
            console.error("There was an error processing your request!", error);
        }
    };

    const videoOpts = {
        height: '210',
        width: '400',
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <h1 className="logo">
                    <span className="music-note">&#9835;</span> MyMoodMusic
                </h1>
                <div className="chat-window">
                    {chat.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text && (
                                <span className="message-text">
                                    {msg.text}
                                </span>
                            )}
                            {msg.recommendations && msg.recommendations.map((rec, idx) => (
                                <div key={idx} className="youtube-video">
                                    <YouTube videoId={rec.url.split('v=')[1]} opts={videoOpts} />
                                </div>
                            ))}
                            {msg.recommendations && (
                                <>
                                <button
                                    className="recommendation-button"
                                    onClick={() => handleRecommendationRequest(msg.query)}>
                                    다른 노래 추천받기!
                                </button>
                              <button
                              className="another-button"
                              onClick={function(){
                                console.log(msg.recommendations[0].title) //노래 이름
                                console.log(msg.recommendations[0].url)  //노래 url
                              }}>
                              플레이리스트에 추가
                            </button>
                          </>
                             
                            )}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="감정 상태를 입력해 보세요!"
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">전송</button>
                </form>
            </div>
            <Sidebar playlists={playlists} username={username}/>
        </div>
    );
}

export default EmotionAnalyzer;
