// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import ReservationPage from './pages/ReservationPage';
import FeedbackPage from './pages/FeedbackPage';

const App: React.FC = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
