import React, { ReactElement } from "react";
import './References.scss';
import unknownCompany from "../../images/unknown_person.png";
import TReference from "../../TReference";
import {Heading, Subheading} from "../../components";

const references: Array<TReference> = [
    {
        company: "Bršlík s.r.o.",
        content: {
            text: "Společnost Aparatea nám ostří kompletně diamantové nástroje. Ze začátku jsme vyzkoušeli pár ostření a porovnali to s trhem. Během pár testů nám bylo jasné, že naostřené nástroje dokážou nafrézovat o dost víc metrů než jinde. Aparatea nám taky zachránila dva diamantové předřezy, které měly poškozené zuby – ty vyměnili a naostřili. Díky nim jsme ušetřili mnoho financí, a tak můžeme Aparateu jen doporučit!"
        }
    },
    {
        company: "KPS Automobile s.r.o.",
        content: {
            text: "Z dřívějších zkušeností jsme byli nespokojení s kvalitou broušení diamantových nástrojů. Při nákupu nových i firmy Aparatea nám bylo nabídnuto ostření dia fréz laserem. Ostření laserem nám přišla jako zajímavá nová technologie, a tak jsme to vyzkoušeli – diamantové nástroje přišly jako nové, označené, kolik se ubralo materiálu a nové rozměry. Nástroje frézovaly jako nové a jejich výdrž se taky vyrovnala novým nástrojům. Dnes už brousíme jen u nich, za nás jsou jedničkou na trhu."
        }
    },
    {
        company: "DVD Jaroměřice",
        content: {
            text: "Normálně jsme brousili asi 18 sad kotoučů týdně. Kvůli tomu nám Aparatea poradila diamantový předřez, a i když jsme měli pochybnosti, vyzkoušeli jsme je. Jeden předřez nám nařezal přes 69 km desek – díky tomu jsme snížili počet broušení a šetříme tak peníze i čas. Aparatea nenabízí jen odborné poradenství, ale také profesionální broušení. Díky tomu teď vše brousíme u nich a jsme plně spokojeni."
        }
    }
];


export default function References(): ReactElement {
    return (
        <div className="references-container">
            <div className="top-background">
                <Heading text={"REFERENCE KLIENTŮ"}></Heading>
                <Subheading text={"Záleží nám na Vašem názoru..."}/>
            </div>
            <div className="references-background">
                <div className="references-header">
                    <p>Máte vlastní recenzi, kterou byste chtěli umístit na web? Napište nám do kontakního formuláře či přímo na mail <b><a href="mailto:sro@aparatea.cz">sro@aparatea.cz</a></b> &#128521;</p>
                </div>
                <div className="reviews">
                    {references.map((reference) =>
                        <div className="review">
                            <img src={unknownCompany} className="unknown-company" width={100} height={100}/>
                            <div className="review-text">
                                <h3>{reference.company}</h3>
                                <p>{reference.content.text}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
