import './Contact.scss';
import React, { ReactElement } from "react";
import {Heading, Subheading, Subtitle, Title} from "../../components";

export default function Contact(): ReactElement {
    const companyAddress = 'Tuřanka 295/52, Aparatea, s.r.o.';

    const isTouchScreenDevice = () => {
        try{
            document.createEvent('TouchEvent');
            return true;
        }catch(e){
            return false;
        }
    }
    const handleNavigationClick = () => {
        const formattedAddress = encodeURIComponent(companyAddress);

        if (isTouchScreenDevice()) {
            window.open(`geo:0,0?q=${formattedAddress}`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}`, '_blank');
        }
    }

    return (
        <div className="contact-container">
            <div className="top-background">
                <Heading text={"NAPIŠTE NÁM"}></Heading>
                <Subheading text={"Jsme tu pro Vás..."}/>
            </div>
            <div className="flex flex-row gap-50 padding-50">
                <iframe title="lokace" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.4085590327195!2d16.680892976402625!3d49.173833478456196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712ead896fafb6b%3A0xd3dfff075324ae61!2sAparatea%2C%20s.r.o.!5e0!3m2!1scs!2scz!4v1703055742828!5m2!1scs!2scz" width="400" height="300" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="find-us flex flex-row justify-center">
                    <div className="flex flex-col find-us-content gap">
                        <Title text={"PROVOZOVNA SPOLEČNOSTI"}/>
                        <Subtitle text={"Kde nás najdete?"} />
                        <p>Naše provozovna sídlí na adrese:</p>
                        <div>
                            <p>APARATEA s.r.o.</p>
                            <p>Tuřanka 295/52</p>
                            <p>627 00 Brno-Slatina</p>
                            <p>Česká republika</p>
                        </div>
                        <button  className={`${isTouchScreenDevice() ? 'navigate-btn-ionic' : 'navigate-btn-browser'}`}>Navigovat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
