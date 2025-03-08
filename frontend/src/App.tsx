import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home" ;
import Order from './pages/Order';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}