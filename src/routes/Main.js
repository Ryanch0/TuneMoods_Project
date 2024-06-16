import axios from "../axiosConfig";
import { useEffect, useState } from "react";

function Main(){
    const[username,setUsername] = useState('');


    useEffect(()=>{
        fetchCurrentUser();
    },[])

 const fetchCurrentUser = async () => {
    try {
        const response = await axios.get('/api/users/myName');
        setUsername(response.data);

        console.log(response.data,'성공')
    } catch(error) {
        console.error('Error', error)
        setUsername('');
    }
}

return (
    <div>
        {username != ''? <h1>Welcome, {username}</h1>
        : <h1>You are not logged in</h1>}
    </div>
)
}

export default Main