import './About.scss';
import logo from "../../images/logos/logo.png";
import about_freza from "../../images/about_freza.png";
import about_vystavene from "../../images/about_vystavene_frezy.png";
import about_double from "../../images/about_double.png";
import React from "react";
import { Heading, Subheading, Title } from "../../components";

export default function About() {
    return (
        <div className="about-container">
            <div className="top-background">
                <Heading text={"KDO JSME?"}/>
                <Subheading text={"Něco málo o nás..."}/>
            </div>

            <div className="parts">
                <div className="first-part">
                    <div className="first-part-col items-end">
                        <div>
                            <Title text={"O NAŠÍ FIRMĚ"}/>
                            <p>
                                Jsme tým nadšených odborníků, kteří sdílí lásku k vytváření skvělých věcí. Od roku 1996
                                se naše firma specializuje na distribuci a poskytování odborného poradenství v oblasti
                                profesionálních nástrojů pro zpracování dřeva a materiálů na bázi dřeva. Nejsme jen obchodníci,
                                jsme váš partner a poradce ve světě nástrojů.
                            </p>

                            <p>
                                Již roky spolupracujeme s velkým počtem odborných firem zabývajících se zpracováním dřeva,
                                a to nejen v České republice, ale v celé Evropě. Poslední roky expandujeme a snažíme se pro
                                Vás zlepšovat náš servis a dostupnost, abychom Vám mohli být na blízko v každé situaci.
                            </p>

                            <p>
                                Naší firemní DNA jsou praktické rady podložené léty zkušeností. Rádi se těšíme z vyřešeného
                                problému a z vědomí, že naše rady, nástroje i celková technologie v praxi fungují. Zakládáme
                                si především na širokém výběru kvalitních a dostupných nástrojů od spolehlivých dodavatelů.
                            </p>
                        </div>
                        <img src={logo} alt="logo" className="about-text-logo" width='400' height='auto'/>
                    </div>
                    <div className="first-part-col-img items-end">
                        <img src={about_freza} alt="freza" width='400' height='auto'/>
                    </div>
                </div>
                <div className="first-part">
                    <div className="second-part-text max-width-half">
                        <Title text={"ODBORNÉ PORADENSTVÍ VE STROJÍRENSTVÍ"}/>
                        <p>Poskytujeme odborné poradenství ve strojírenství s dlouholetými zkušenostmi, abychom vám mohli nabídnout optimální řešení pro zpracování dřeva. Naše moderní a profesionální ostřící centrum je vybaveno nejnovějšími technologiemi, které nám umožňují efektivně a precizně servisovat různé typy nástrojů.</p>
                        <p>Díky našim zkušeným operátorům a modernímu vybavení můžeme řešit i ty nejnáročnější požadavky.</p>
                        <img src={about_vystavene} alt="freza" className="vystavene-frezy"/>
                    </div>
                    <div className="max-width-half">
                        <Title text={"RYCHLÝ A LEVNÝ SERVIS NÁSTROJŮ"}/>
                        <p>Díky speciálním novým technologiím a vybranému způsobu obsluze dokážeme efektivně, levně, rychle a především profesionálně udělat servis mnoha přístrojů.</p>
                        <p>Díky modernímu a profesionálnímu ostřícímu centru nabízíme kvalitní servis DIA a HW nástrojů. Zkušení operátoři mohou řešit nejnáročnější požadavky.</p>
                        <p> Mezi moderní vybavení patří strojní zařízení Walter, Volmer, DMG Mori, které umožňují naostřit jakýkoli typ nástroje. Po přebroušení jsou všechny nástroje měřeny s přesností 0,01 mm a dynamicky vyváženy s tolerancí G2,5."</p>
                        <img src={about_double} alt="freza" className="double-frezy"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
