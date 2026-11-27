import { useState } from 'react'
import Calculator from './components/Calculator';
import { useEffect } from 'react';
import UserRef from './components/UserRef';

export default function App() {
  const [data, setData] = useState({
    name: "Maheshwari",
    location: "Bangalore",
    state: "Karnataka",
    country: "India"
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Welcome ${data.name} to ${data.country}`; 
  }, [data.name, data.location, data.country]);  

  

  return (
    <div className="App" style={{textAlign: "center", backgroundColor: "lightblue", border: "1px solid black", margin: "10px" }} >
      <h1>Welcome to My World!</h1>
      Enter name : <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/> <br />
      My name is {data.name} <br />  
      My Location is {data.location} <br />
      My State is {data.state} <br />
      My country is {data.country} <br />
      <p>Counter value is {count}</p> <br />
      <button style={{margin: "5px"}} onClick={() => setCount(count + 1)}>Increase Counter</button>
      <button style={{margin: "5px"}} onClick={() => setCount(count - 1)}>Decrease Counter</button>
      <Calculator />  
      <UserRef />
    </div>
  );
}