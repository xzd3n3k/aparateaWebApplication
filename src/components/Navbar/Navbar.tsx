import React, { ReactElement, useEffect } from "react";
import './Navbar.scss';
import logo from '../../images/logos/logo.png'

export default function Navbar(): ReactElement {

    // const [menuActive, setMenuActive] = useState(false);
    //
    // const handleToggleClick = () => {
    //     console.log(menuActive);
    //     setMenuActive(!menuActive);
    // };

    useEffect(() => {
        const menuToggle: Element | null = document.querySelector('.menu-toggle');
        const menu: Element | null = document.querySelector('.menu');

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
            // Cleanup: Remove the event listener when the component unmounts
            if (menuToggle) {
                menuToggle.removeEventListener('click', handleToggleClick);
            }
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
