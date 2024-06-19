
// import React, { useEffect, useState } from 'react';
// import '../App.css';
// import axios from "../axiosConfig";
// import { useNavigate } from 'react-router-dom';

// function Sidebar({ username, onPlaylistClick }) {
//   const [playlists, setPlaylists] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [clickedIndex, setClickedIndex] = useState(null); // 클릭된 아이템의 인덱스

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (username) {
//       fetchUserId();
//     }
//   }, [username]);

//   const fetchUserId = async () => {
//     try {
//       const response = await axios.get(`/api/users/username/${username}`);
//       setUserId(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching user ID:', error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       const fetchPlaylists = async () => {
//         try {
//           const response = await axios.get(`/api/users/${userId}/playlists`);
//           setPlaylists(response.data);
//           console.log(response.data);
//         } catch (error) {
//           console.error('Error fetching playlists:', error);
//         }
//       };

//       fetchPlaylists();
//     }
//   }, [userId]);

//   const handleLogout = async () => {
//     try {
//       await axios.get('/logout', { withCredentials: true });
//       navigate('/login');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handlePlaylistClick = (url, index) => {
//     setClickedIndex(index); // 클릭된 인덱스 설정
//     onPlaylistClick(url);
//   };

//   return (
//     <div className="sidebar">
//       <div className="user-info">
//         <h2>회원 정보</h2>
//         <p>이름: {username}</p>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <div className="playlists">
//         <h2>저장된 플레이리스트</h2>
//         <ul>
//           {playlists.map((playlist, index) => (
//             <li
//               key={index}
//               className={`playlist-item ${clickedIndex === index ? 'clicked' : ''}`}
//               onClick={() => handlePlaylistClick(playlist.playlistsUrl, index)}
//             >
//               {playlist.playlists}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';

function Sidebar({ username, playlists, onPlaylistClick }) {
  const [userId, setUserId] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null); // 클릭된 아이템의 인덱스
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetchUserId();
    }
  }, [username]);

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
          {playlists.map((playlist, index) => (
            <li
              key={index}
              className={`playlist-item ${clickedIndex === index ? 'clicked' : ''}`}
              onClick={() => handlePlaylistClick(playlist.playlistsUrl, index)}
            >
              {playlist.playlists}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
