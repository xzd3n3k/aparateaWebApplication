import './Home.scss';
import logo from "../../images/logos/logo.png";
import React from "react";

export default function Home() {

    console.log("\n\n{\\__/}\n" +
                "( • - •)\n" +
                "💶< \\  u want this money? spend it wisely though okay, good");
    console.log("\n\n{\\__/}\n" +
                "( • .•)\n" +
                "/ >💶 alright here");
    console.log("\n\n{\\__/}\n" +
                "( o .o)  💸\n" +
                "/ > >");
    console.log("\n\n{\\__/}\n" +
                "( ò .ó)\n" +
                "/ > >  the fuck did I just say-");

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
