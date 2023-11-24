import './About.scss';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-container-header">
                <h4>A něco málo…</h4>
                <h2>O NÁS</h2>
            </div>

            <div className="about-content">
                <div className="about-content-text">
                    <p>Naše firma vznikla v roce 1996 a již od této doby se <b>odborně věnujeme distribuci a především poradenství ohledně profesionálních nástrojů pro zpracování dřeva</b>, materiálů na bázi dřeva a plastů od renomovaných výrobců.</p>
                    <p>Již roky <b className="">spolupracujeme s velkým počtem odborných firem</b> zabývajících se zpracováním dřeva, a to nejen v České republice, ale v celé Evropě. Poslední <b className="">roky expandujeme </b>a snažíme se pro Vás zlepšovat náš servis a dostupnost, abychom Vám mohli být na blízko v každé situaci.</p>
                </div>

                <div className="about-content-text">
                    <p>V reakci na tržní poptávku <b>neustále rozšiřujeme naši nabídku</b>, abychom našim klientům pomohli <b>optimalizovat výrobní proces a snížit jeho náklady</b>. Na zvláštní žádost poskytujeme také nástroje s <b>neobvyklými rozměry a aplikacemi</b>.</p>
                    <p>Naši <b>kvalifikovaní zaměstnanci</b> poskytují <b>technické poradenství</b> při výrobě vhodných nástrojů a jejich údržbě.</p>
                    <p>Po celá léta se <b>aktivně účastníme domácích a zahraničních veletrhů</b> a navazujeme obchodní kontakty, které nám umožňují dynamicky rozvíjet prodej nejen v <b>Polsku, ale také třeba v České republice</b> či jiných státech.</p>
                </div>

                <div className="about-content-text">
                    <p>Již několik let je náš stánek oceněn cenou Acanthus Aureus. Soška se uděluje subjektům, jejichž postavení nejlépe odráží marketingovou strategii společnosti.</p>
                </div>
            </div>
        </div>
    )
}
