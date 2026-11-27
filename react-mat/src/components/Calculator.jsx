import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function Calculator() {

    const [num1,setNum1] = useState(0); 
    const [num2,setNum2] = useState(0);  

    const [result,setResult] = useState(0);
    return (
        <div>
            <h1>Calculator Component</h1>
            <Typography variant="body1">
                <label>
                    Number 1:
                    <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} sx={{ m: 1 }} />
                </label>
            </Typography>
            <Typography variant="body1">
                <label>
                    Number 2:
                    <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} sx={{ m: 1 }} />
                </label>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setResult(num1 + num2)}>
                Add
            </Button>
            <Typography variant="body1">
                Result: {result}
            </Typography>
            <Typography variant="body1">
                This is a simple calculator component.
            </Typography>
        </div>
    );
}