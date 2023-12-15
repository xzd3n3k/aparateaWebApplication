import './Contact.scss';
import React, { ReactElement } from "react";
import {Heading, Subheading} from "../../components";

export default function Contact(): ReactElement {
    return (
        <div className="contact-container">
            <div className="top-background">
                <Heading text={"NAPIŠTE NÁM"}></Heading>
                <Subheading text={"Jsme tu pro Vás..."}/>
            </div>
        </div>
    )
}
