import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';

function Sidebar({ username, playlists, onPlaylistClick }) {
    const [userId, setUserId] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [localPlaylists, setLocalPlaylists] = useState(playlists);
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            fetchUserId();
        }
    }, [username]);

    useEffect(() => {
        setLocalPlaylists(playlists);
    },[playlists])

    const fetchUserId = async () => {
        try {
            const response = await axios.get(`/api/users/username/${username}`);
            setUserId(response.data);
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
        setClickedIndex(index);
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
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="sidebar">
            <div className="user-info">
            <svg className="profile-picture" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                    <circle cx="12" cy="12" r="10" fill="#bbb" />
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#fff"/>
                </svg>
                <h4>{username}</h4>
                <button onClick={handleLogout} className="logout-button">로그아웃</button>
            </div>
            <div className="playlists">
                <h3>저장된 플레이리스트</h3>
                <ul>
                    {localPlaylists.map((playlist, index) => (
                        <li
                            key={index}
                            className={`playlist-item ${clickedIndex === index ? 'clicked' : ''}`}
                            onClick={() => handlePlaylistClick(playlist.playlistsUrl, index)}
                        >
                            <div className="playlist-content">
                                <span className="playlist-text">{playlist.playlists}</span>
                                <span className="delete-icon" onClick={(e) => { e.stopPropagation(); handleDelete(playlist); }}>🗑️</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
