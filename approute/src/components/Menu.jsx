import  { Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./contact";    
export default function Menu() {
  return (
    <>
    
    <nav>
        <Link to="/menu/">Home</Link> |
        <Link to="/menu/about">About</Link> |
        <Link to="/menu/contact">Contact</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </nav>
    
    </> );
    }