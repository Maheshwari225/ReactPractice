import { useState } from "react";

export default function Calculator(){
const [num1, setNum1] = useState(0);
const [num2, setNum2] = useState(0);
const [result, setResult] = useState(0);
return (
    <div style={{textAlign: "center", backgroundColor: "lightcyan", border: "1px solid black", margin: "10px"}}>
        <h1>Calculator</h1>
        <p>First Number: <input type="number" min="0" value={num1} onChange={(e) => setNum1(parseInt(e.target.value))} /></p>
        <p>Second Number: <input type="number" min="0" value={num2} onChange={(e) => setNum2(parseInt(e.target.value))} /></p>
        <button  style={{margin: "5px"}} onClick={() => setResult(num1 + num2)}>Add</button>
        <button style={{margin: "5px"}} onClick={() => setResult(num1 - num2)}>Subtract</button>
        <button style={{margin: "5px"}} onClick={() => setResult(num1 * num2)}>Multiply</button>
        <button style={{margin: "5px"}} onClick={() => setResult(num1 / num2)}>Divide</button>
        <h3>Result: {result}</h3>  
    </div>
)
}