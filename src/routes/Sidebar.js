import React from 'react';
import '../App.css';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';

function Sidebar({username}) {

    const navigate = useNavigate();


    const handleLogout = async() => {
        try{
            await axios.get('/logout',{ withCredentials: true })
                navigate('/login')
        }catch(error){
            console.error(error)
        }
    };
    


    return (
        <div className="sidebar">
            <div className="user-info">
                <h2>회원 정보</h2>
                <p>이름:{username}</p>
                <button onClick={handleLogout}>logout</button>
            </div>
            <div className="playlists">
                <h2>저장된 플레이리스트</h2>
                {/* <ul>
                    {playlists.map(function(a,i){
                        return (
                            <h4 key={i}>{a}</h4>
                        )
                    })
                    }
                </ul> */}
            </div>
        </div>
    );
}

export default Sidebar;