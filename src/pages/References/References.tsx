import React, { ReactElement } from "react";
import './References.scss';
import unknownCompany from "../../images/unknown_person.png";


export default function References(): ReactElement {
    return (
        <div>
            <h1>Reference klientů</h1>
            <div className="background-vec">
                <div className="references-header">
                    <p>Máte vlastní recenzi, kterou byste chtěli umístit na web? Napište nám do kontakního formuláře či přímo na mail <b><a href="mailto:sro@aparatea.cz">sro@aparatea.cz</a></b> &#128521;</p>
                </div>
                <div className="reviews">
                    <div className="review">
                        <img src={unknownCompany} className="unknown-company" width={100} height={100}/>
                        <div className="review-text">
                            <h3>Bršlík s.r.o.</h3>
                            <p>Společnost Aparatea nám ostří kompletně diamantové nástroje. Ze začátku jsme vyzkoušeli pár ostření a porovnali to s trhem. Během pár testů nám bylo jasné, že naostřené nástroje dokážou nafrézovat o dost víc metrů než jinde. Aparatea nám taky zachránila dva diamantové předřezy, které měly poškozené zuby – ty vyměnili a naostřili. Díky nim jsme ušetřili mnoho financí, a tak můžeme Aparateu jen doporučit!</p>
                        </div>
                    </div>
                    <div className="review">
                        <img src={unknownCompany} className="unknown-company" width={100} height={100}/>
                        <div className="review-text">
                            <h3>KPS Automobile s.r.o.</h3>
                            <p>Z dřívějších zkušeností jsme byli nespokojení s kvalitou broušení diamantových nástrojů. Při nákupu nových i firmy Aparatea nám bylo nabídnuto ostření dia fréz laserem. Ostření laserem nám přišla jako zajímavá nová technologie, a tak jsme to vyzkoušeli – diamantové nástroje přišly jako nové, označené, kolik se ubralo materiálu a nové rozměry. Nástroje frézovaly jako nové a jejich výdrž se taky vyrovnala novým nástrojům. Dnes už brousíme jen u nich, za nás jsou jedničkou na trhu.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
