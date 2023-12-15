import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, About, Eshops, References } from "./pages";
import { Navbar, Footer } from './components';
import './global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <div>
        <Router>
            <div>
                <Navbar />
                <div className="mainClass">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/eshops" element={<Eshops />} />
                    <Route path="/references" element={<References />} />
                </Routes>
                </div>
                <footer><Footer /></footer>
            </div>
        </Router>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
