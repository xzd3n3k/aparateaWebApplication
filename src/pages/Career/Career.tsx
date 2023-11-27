import React, { ReactElement } from "react";
import './Career.scss';
import unknownPerson from "../../images/unknown_person.png";
import TJobOffer from "../../TJobOffer";

const jobOffers: Array<TJobOffer> = [
    {
        jobTitle: "Obchodní a technický zástupce"
    },
    {
        jobTitle: "Obchodní a technický zástupce"
    },
]

export default function Career(): ReactElement {
    return (
        <div className="career-page">
            <h1>Volné pozice</h1>
            <div className="position-header">
                <p><b>Práce v terénu</b> – vyhledávání a <b>oslovování nových zákazníků</b>, tvorba nových dlouhodobých obchodních vztahů, věnování se stávajícím zákazníkům, <b>technické poradenství, svoz a rozvoz ostření DIA nástrojů a ostatních nástrojů</b>, poradenství a <b>optimalizace výrobních procesů</b> v dřevařském průmyslu.</p>
                <p>Pracujeme na <b>Tuřanka 52</b>, Brno, datum nástupu je <b>možný okamžitě</b>, a to i pro <b>OSVČ</b>. Mzda při <b>plném úvazku</b> je <b>30000 – 60000 Kč</b> měsíčně.</p>
            </div>
            <div className="positions-cards">
                {jobOffers.map((offer, index) => (
                    <div className="position-card">
                        <div className={index % 2 === 0 ? "career-offer-top-blue" : "career-offer-top-green"}></div>
                        <div className="position-info">
                            <img src={unknownPerson} className="unknown-person" width={120} height={120}/>
                            <h3>Jste to Vy?</h3>
                            <i>{offer.jobTitle}</i>
                            <div className="position-text">
                                <p>{offer.about ? offer.about : "Nabízíme nové prestižní obchodní pozice v dřevařském průmyslu. Zajímá Vás víc?"}</p>
                                <p><b>Napište nám nebo zavolejte na 704&nbsp;192&nbsp;430.</b></p>
                            </div>
                            <hr/>
                        </div>
                        <div className="career-offer-bot-white"></div>
                    </div>

                ))}
            </div>
        </div>
    )
}
