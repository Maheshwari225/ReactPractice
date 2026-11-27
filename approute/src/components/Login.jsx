import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
      if(username === "admin" && password === "admin"){
        alert("Login Successful");
        navigate("/menu");
      }
      else{
        alert("Invalid Credentials");
        navigate("/LoginFailed");
      } 
    }
return(
   <table>
    <tbody>
    <tr>
        <td><input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
    </tr>
    <tr>
        <td><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>   
    </tr>
    <tr>
        <td><button onClick={handleLogin}>Login</button></td>
    </tr>
    </tbody>
   </table>
);
}