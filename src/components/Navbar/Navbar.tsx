import React, { ReactElement, useEffect } from "react";
import './Navbar.scss';
import { useLocation } from "react-router-dom";
import logo_square from "../../images/logos/logo_square_white.png";
export default function Navbar(): ReactElement {

    useEffect(() => {
        const menuToggle: Element | null = document.querySelector('.menu-toggle');
        const menu: Element | null = document.querySelector('.menu');
        const navBar: Element | null = document.querySelector('.nav');

        const changeBackground = () => {
            if (window.scrollY <= 80 && navBar?.classList.contains('active')) {
                navBar?.classList.toggle('active');
            } else if (window.scrollY > 80 && !(navBar?.classList.contains('active'))) {
                navBar?.classList.toggle('active');
            }
        }

        window.addEventListener('scroll', changeBackground);

        const handleToggleClick = () => {
            if (menuToggle && menu) {
                menuToggle.classList.toggle('active');
                menu.classList.toggle('active');
            }
        };

        if (menuToggle) {
            menuToggle.addEventListener('click', handleToggleClick);
        }

        return () => {
            if (menuToggle) {
                menuToggle.removeEventListener('click', handleToggleClick);
            }
            window.removeEventListener('scroll', changeBackground);
        }
    }, []);
    const location = useLocation();
    return (
        <div className="navbar-container">
            <nav className="nav justify-between items-center">
                <img src={logo_square} alt="logo" className="navbar-logo padding-top padding-bottom" width='40' height='auto'/>
                <div className="menu-toggle">
                    <input type="checkbox" className="bar"/>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={`menu items-center ${location.pathname === '/' ? "transparent-navbar" : ""}`}>
                    <li>
                        <a href="/">DOMŮ</a>
                    </li>
                    <li>
                        <a href="/about">O NÁS</a>
                    </li>
                    <li>
                        <a className="disabled" href="/tools">NÁSTROJE</a>
                    </li>
                    <li>
                        <a className="disabled" href="/grinding">BROUŠENÍ</a>
                    </li>
                    <li>
                        <a href="/references">REFERENCE</a>
                    </li>
                    <li>
                        <a className="disabled" href="/contact">KONTAKT</a>
                    </li>
                    <li className="featured">
                        <a href="/eshops">NAŠE E-SHOPY</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
