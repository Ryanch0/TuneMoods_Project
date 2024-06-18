import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import '../App.css';

function EmotionAnalyzer() {
    const [text, setText] = useState('');
    const [chat, setChat] = useState([]);
    const [lastQuery, setLastQuery] = useState('');
    const [previousVideos, setPreviousVideos] = useState([]);

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
        height: '200',
        width: '350',
    };

    return (
        <div className="container">
             <h1 className="logo">
                <span className="music-note">&#9835;</span> 
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
                            <button
                                className="recommendation-button"
                                onClick={() => handleRecommendationRequest(msg.query)}>
                                다른 노래 추천받기!
                            </button>
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
    );
}

export default EmotionAnalyzer;
