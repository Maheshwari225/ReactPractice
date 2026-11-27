
import Person from "./Components/Person";

import Employee from "./Components/Employee";

export default function App(){
  const data ={
    location: "Bangalore",
    state: "Karnataka",
    country: "India"
  }
  return (
    <div className="App" style={{textAlign: "center", backgroundColor: "lightblue"}}>
      <h1>Welcome to My World!</h1>
      My Location is {data.location} <br />
      My State is  {data.state} <br />
      My country is  {data.country} <br />
      {/* <Person name="Maheshwari" job="Software Engineer" /> */}
      <Employee department="CB Development" salary="50000" />
    </div>
  );
}