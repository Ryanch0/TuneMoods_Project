// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// import axios from '../axiosConfig';
// import YouTube from 'react-youtube';
// import Sidebar from './Sidebar';
// import Modal from './Modal';
// import '../App.css';
// import { useNavigate } from 'react-router-dom';

// function EmotionAnalyzer() {
//     const [text, setText] = useState('');
//     const [chat, setChat] = useState([]);
//     const [lastQuery, setLastQuery] = useState('');
//     const [previousVideos, setPreviousVideos] = useState([]);

//     // 사용자 정보와 플레이리스트 데이터 추가
//     const [username, setUsername] = useState('');
//     const [musicData, setMusicData] = useState({
//         playlists: '',
//         playlistsUrl: ''
//     });

//     const [triggerAddPlaylist, setTriggerAddPlaylist] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [modalVideoUrl, setModalVideoUrl] = useState('');
  
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchCurrentUser();
//     }, [])

//     useEffect(() => {
//         if (triggerAddPlaylist) {
//             addPlaylist();
//         }
//     }, [musicData])

//     const fetchCurrentUser = async () => {
//         try {
//             const response = await axios.get('/api/users/myName', {
//                 withCredentials: true
//             });
//             if (response.status === 200) {
//                 setUsername(response.data);
//                 console.log(response.data, '성공')
//             } else {
//                 console.error("@check failed")
//             }

//         } catch (error) {
//             console.error('Error', error)
//             setUsername('');
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (text.trim() === '') return;

//         const userMessage = { sender: 'user', text };
//         setChat([...chat, userMessage]);

//         try {
//             const response = await axios.post('/api/analyze-emotion', { text });
//             const aiEmotion = response.data.emotion;
//             const aiMessageText = response.data.message || `기분이 ${aiEmotion} 이런 노래는 어떠세요?`;
//             const aiRecommendations = response.data.recommended_music || [];

//             const aiMessage = { sender: 'ai', text: aiMessageText };
//             const aiRecommendationsMessage = {
//                 sender: 'ai',
//                 recommendations: aiRecommendations,
//                 query: text
//             };

//             setChat([...chat, userMessage, aiMessage, ...(aiRecommendations.length ? [aiRecommendationsMessage] : [])]);
//             setPreviousVideos([...previousVideos, ...aiRecommendations.map(rec => rec.url)]);
//             setLastQuery(text);
//         } catch (error) {
//             console.error("There was an error processing your request!", error);
//         }

//         setText('');
//     };

//     const handleRecommendationRequest = async (query) => {
//         try {
//             const response = await axios.post('/api/analyze-emotion', { text: query });
//             const aiRecommendations = response.data.recommended_music || [];
//             const newRecommendations = aiRecommendations.filter(rec => !previousVideos.includes(rec.url));

//             const aiMessage = { sender: 'ai', text: "다른 노래로 다시 추천해드릴게요." };
//             const aiRecommendationsMessage = {
//                 sender: 'ai',
//                 recommendations: newRecommendations,
//                 query
//             };

//             setChat([...chat, aiMessage, aiRecommendationsMessage]);
//             setPreviousVideos([...previousVideos, ...newRecommendations.map(rec => rec.url)]);
//         } catch (error) {
//             console.error("There was an error processing your request!", error);
//         }
//     };

//     const videoOpts = {
//         height: '210',
//         width: '400',
//     };


//     // playlist저장
//     const addPlaylist = async (e) => {
//         try {

//             const response = await axios.post('/api/users/saveMusic', { ...musicData, username });
//             if (response.status === 200) {
//                 alert('저장완료!')
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             if (error.response.data && error.response.data.message) {
//                 alert(error.response.data.message);
//             } else {
//                 alert('An error occurred. Please try again.');
//             }
//         } finally {
//             setTriggerAddPlaylist(false);
//         }
//     };


//     return (
//         <div className="app-container">
//             <div className="main-content">
//                 <h1 className="logo">
//                     <span className="music-note">&#9835;</span> MyMoodMusic
//                 </h1>
//                 <div className="chat-window">
//                     {chat.map((msg, index) => (
//                         <div key={index} className={`message ${msg.sender}`}>
//                             {msg.text && (
//                                 <span className="message-text">
//                                     {msg.text}
//                                 </span>
//                             )}
//                             {msg.recommendations && msg.recommendations.map((rec, idx) => (
//                                 <div key={idx} className="youtube-video">
//                                     <YouTube videoId={rec.url.split('v=')[1]} opts={videoOpts} />
//                                 </div>
//                             ))}
//                             {msg.recommendations && (
//                                 <>
//                                     <button
//                                         className="recommendation-button"
//                                         onClick={() => handleRecommendationRequest(msg.query)}>
//                                         다른 노래 추천받기!
//                                     </button>
//                                     <button
//                                         className="another-button"
//                                         onClick={function () {
//                                             setMusicData({
//                                                 playlists: msg.recommendations[0].title,
//                                                 playlistsUrl: msg.recommendations[0].url
//                                             });
//                                             setTriggerAddPlaylist(true)
//                                             console.log(musicData)
//                                         }}>
//                                         플레이리스트에 추가
//                                     </button>
//                                 </>

//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <form onSubmit={handleSubmit} className="input-form">
//                     <input
//                         type="text"
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                         placeholder="감정 상태를 입력해 보세요!"
//                         className="input-field"
//                     />
//                     <button type="submit" className="submit-button">전송</button>
//                 </form>
//             </div>
//             <Sidebar username={username} onPlaylistClick={(videoUrl) => {
//                 setModalVideoUrl(videoUrl);
//                 setShowModal(true);
//             }} />
//             <Modal show={showModal} onClose={() => setShowModal(false)} videoUrl={modalVideoUrl} /> 
//         </div>
//     );
// }

// export default EmotionAnalyzer;

import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import YouTube from 'react-youtube';
import Sidebar from './Sidebar';
import Modal from './Modal';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function EmotionAnalyzer() {
    const [text, setText] = useState('');
    const [chat, setChat] = useState([]);
    const [lastQuery, setLastQuery] = useState('');
    const [previousVideos, setPreviousVideos] = useState([]);
    const [username, setUsername] = useState('');
    const [musicData, setMusicData] = useState({
        playlists: '',
        playlistsUrl: ''
    });
    const [playlists, setPlaylists] = useState([]); // 사이드바와 공유할 상태
    const [triggerAddPlaylist, setTriggerAddPlaylist] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalVideoUrl, setModalVideoUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (triggerAddPlaylist) {
            addPlaylist();
        }
    }, [musicData]);

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('/api/users/myName', {
                withCredentials: true
            });
            if (response.status === 200) {
                setUsername(response.data);
                fetchPlaylists(response.data); // 사용자 이름을 이용해 플레이리스트 가져오기
            } else {
                console.error("@check failed");
            }
        } catch (error) {
            console.error('Error', error);
            setUsername('');
        }
    };

    const fetchPlaylists = async (username) => {
        try {
            const response = await axios.get(`/api/users/username/${username}`);
            const userId = response.data;
            const playlistsResponse = await axios.get(`/api/users/${userId}/playlists`);
            setPlaylists(playlistsResponse.data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

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

    const addPlaylist = async () => {
        try {
            const response = await axios.post('/api/users/saveMusic', { ...musicData, username });
            if (response.status === 200) {
                alert('저장완료!');
                setPlaylists([...playlists, musicData]); // 플레이리스트에 새 항목 추가
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
        } finally {
            setTriggerAddPlaylist(false);
        }
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
                                        onClick={() => {
                                            setMusicData({
                                                playlists: msg.recommendations[0].title,
                                                playlistsUrl: msg.recommendations[0].url
                                            });
                                            setTriggerAddPlaylist(true);
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
            <Sidebar 
                username={username} 
                playlists={playlists} 
                onPlaylistClick={(videoUrl) => {
                    setModalVideoUrl(videoUrl);
                    setShowModal(true);
                }} 
            />
            <Modal show={showModal} onClose={() => setShowModal(false)} videoUrl={modalVideoUrl} /> 
        </div>
    );
}

export default EmotionAnalyzer;
