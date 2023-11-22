import React, {ReactElement} from "react";
import './Navbar.module.scss';

export default function Navbar(): ReactElement {
    return (
        <nav className="nav">
            <a href="/" className="siteTitle">Aparatea</a>
            <ul>
                <li>
                    <a href="/home">DOMŮ</a>
                </li>
                <li>
                    <a href="/about">O NÁS</a>
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
                <li>
                    <a href="/contactus">NAPIŠTE NÁM</a>
                </li>
            </ul>
        </nav>
    )
}