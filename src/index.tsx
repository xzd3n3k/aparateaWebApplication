import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Home, About, Eshops, References, Contact, Tools, Sharpening, Login, Records, Settings} from "./pages";
import { Footer } from './components';
import './global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <div>
        <Router>
            <div>
                <div className="mainClass">
                    <ToastContainer theme="light"/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/sharpening" element={<Sharpening />} />
                    <Route path="/references" element={<References />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/eshops" element={<Eshops />} />
                    <Route path="/sharpening/login" element={<Login />} />
                    <Route path="/sharpening/records" element={<Records />} />
                    <Route path="/sharpening/settings" element={<Settings />} />
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
