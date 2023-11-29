import './Home.scss';
import logo from "../../images/logos/logo.png";
import React from "react";

export default function Home() {
    return (
        <div className="home-container">
            <center>
                <a href="/">
                    <img src={logo} alt="logo" className="mainLogo" width='200' height='auto'/>
                </a>
            </center>
        </div>
    )
}
