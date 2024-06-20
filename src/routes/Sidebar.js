import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';

function Sidebar({ username, playlists, onPlaylistClick }) {
    const [userId, setUserId] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null); // 클릭된 아이템의 인덱스
    const [localPlaylists, setLocalPlaylists] = useState(playlists); // 로컬 상태로 플레이리스트 관리
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            fetchUserId();
        }
    }, [username]);

    useEffect(() => {
        setLocalPlaylists(playlists); // 업데이트될 때 로컬 상태 업데이트
    },[playlists])

    const fetchUserId = async () => {
        try {
            const response = await axios.get(`/api/users/username/${username}`);
            setUserId(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('/logout', { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlaylistClick = (url, index) => {
        setClickedIndex(index); // 클릭된 인덱스 설정
        onPlaylistClick(url);
    };


    const handleDelete = async (playlist) => {
        try {
            const response = await axios.delete(`/api/users/deletePlaylist`, {
                data: {
                    playlists: playlist.playlists
                }
            });
            if (response.status === 200) {
                setLocalPlaylists(localPlaylists.filter(p => p.playlistsUrl !== playlist.playlistsUrl));
                console.log('Success:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="sidebar">
            <div className="user-info">
                <h2>회원 정보</h2>
                <p>이름: {username}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="playlists">
                <h2>저장된 플레이리스트</h2>
                <ul>
                    {localPlaylists.map((playlist, index) => (
                        <li
                            key={index}
                            className={`playlist-item ${clickedIndex === index ? 'clicked' : ''}`}
                            onClick={() => handlePlaylistClick(playlist.playlistsUrl, index)}
                        >
                            <div className="playlist-content">
                                <span className="playlist-text">{playlist.playlists}</span>
                                <span className="delete-icon" onClick={(e) => { e.stopPropagation();
                                     handleDelete(playlist); }}>🗑️</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
