import './About.scss';
import logo from "../../images/logos/logo.png";
import React from "react";
import {LoremIpsum} from "../../components";

export default function About() {
    return (
        <div className="about-container">
            <div className="about-bg"><p><b>KDO JSME?</b></p></div>

            <div className="first-part">
                <div className="first-part-row">
                    <img src={logo} alt="logo" className="about-text-logo first-part-row-content" width='400' height='auto'/>
                    <span className="first-part-row-content"><LoremIpsum/></span>
                </div>
                <div className="first-part-row">
                    <span className="first-part-row-content"><LoremIpsum/></span>
                    <img src={logo} alt="logo" className="about-text-logo first-part-row-content" width='400' height='auto'/>
                </div>
                <LoremIpsum repeat={2}/>
            </div>
        </div>
    )
}
