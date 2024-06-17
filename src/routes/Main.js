import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useEffect, useState } from "react";

function Main(){
    const[username,setUsername] = useState('');

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

const handleLogout = async() => {
    try{
        await axios.get('/logout',{ withCredentials: true })
            navigate('/login')

    }catch(error){
        console.error(error)
    }
};

return (
    <div>
        {username != ''? <h1>Welcome, {username}</h1>
        : <h1>You are not logged in</h1>}

         <button onClick={handleLogout}>Logout</button>;

    </div>
)
}

export default Main