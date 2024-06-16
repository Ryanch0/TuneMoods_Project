import axios from "../axiosConfig";
import { useEffect, useState } from "react";

function Main(){
    const[username,setUsername] = useState('');


    useEffect(()=>{
        fetchCurrentUser();
    },[])

 const fetchCurrentUser = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/users/myName');
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

return (
    <div>
        {username != ''? <h1>Welcome, {username}</h1>
        : <h1>You are not logged in</h1>}
    </div>
)
}

export default Main