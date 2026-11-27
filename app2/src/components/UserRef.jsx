import { useState } from "react";
import { useRef } from "react";

export default function UserRef() {
    const [user,setUser]= useState({name:"John",age:30})
const userRef = useRef(null);
return (
    <div>
        <h1>UseRef</h1>
        <p>First Name: <input type="text" onChange={(e) => setUser({...user, name: e.target.value})} /></p>
        <p>Age: <input type="number" onChange={(e) => setUser({...user, age: parseInt(e.target.value)})} /> </p>
        <button onClick={() => userRef.current.focus()}>Focus on Name</button>
        <h3>My name is {user.name} and I am {user.age} years old.</h3>
       
    </div>
)
}