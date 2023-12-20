import './Tools.scss';
import React, { ReactElement } from "react";
import { Heading, ImageSlider, Subheading } from "../../components";
import TImageSlide from "../../TImageSlide";
import { dt1, dt2, dt3, dta, dtb } from "../../images";

const slides: Array<TImageSlide> = [
    {
        url: dt1,
        description: "Diamantová fréza DT1 je určena pro všechny CNC stroje a ruční frézky pro spojování a frézování masivu, velkoplošných materiálů a kompozitů.",
    },
    {
        url: dt2,
        description: "Diamantová fréza DT2 s dvěma celistvými DIA zuby a tělem ze slinutého karbidu HW (tvrdost 93,8 HRA) je ideální pro CNC stroje a ruční frézky. Vhodná pro spojování a frézování masivu, velkoplošných materiálů, kompozitů a ALU materiálů. S dokonalým zakončením hrany, bez stop na obrobku a nižší hlučností při obrábění, představuje optimální volbu. Ošetřená novou laserovou technologií, s výškou DIA zubu 2-4 mm a možností ostření (3-4 krát), nabízí maximální výkonnost pro CNC stroje a frézky.",
    },
    {
        url: dt3,
        description: "Diamantová fréza DT3 je určena pro všechny CNC stroje a ruční frézky pro spojování a frézování masivu, velkoplošných materiálů a kompozitů.",
    },
    {
        url: dta,
        description: "paste-description",
    },
    {
        url: dtb,
        description: "paste-description",
    },
]

export default function Tools(): ReactElement {
    return (
        <div className="tools-container">
            <div className="top-background">
                <Heading text={"NAŠE PRODUKTY"}></Heading>
                <Subheading text={"Co Vám můžeme nabídnout..."}/>
            </div>
            <div className="image-slider-tools-container">
                <ImageSlider slides={slides} />
            </div>
        </div>
    )
}
