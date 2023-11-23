import React, { ReactElement, useEffect } from "react";
import './Navbar.scss';
import logo from '../../images/logos/logo.png';

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

    return (
        <div>
            <nav className="nav">
                <a href="/">
                    <img src={logo} alt="logo" className="siteLogo" width='200' height='auto'/>
                </a>
                <div className="menu-toggle">
                    <input type="checkbox" className="bar"/>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className="menu">
                    <li>
                        <a href="/home">DOMŮ</a>
                    </li>
                    <li>
                        <a href="/about">O NÁS</a>
                    </li>
                    <li>
                        <a href="/eshops">NAŠE E-SHOPY</a>
                    </li>
                    <li>
                        <a href="/career">VOLNÁ MÍSTA</a>
                    </li>
                    <li>
                        <a href="/references">REFERENCE</a>
                    </li>
                    <li>
                        <a href="/contact">KONTAKT</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
