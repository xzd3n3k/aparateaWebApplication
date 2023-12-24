import './Settings.scss';
import React, { ReactElement, useState } from "react";
import { arrowLeft, plus } from "../../../../images";
import { Accounts } from "../index";

export default function Settings(): ReactElement {

    const [selectedOption, setSelectedOption] = useState("users");

    const renderComponent = () => {
        switch (selectedOption) {
            case "users":
                return <Accounts />;
            case "customers":
                return 'zakaznici';
            case "tools":
                return 'naradi';
            case "orders":
                return 'objednavky';
            default:
                return null;
        }
    };

    return (
        <div className="settings-container d-flex flex-column w-100 p-4 gap-3">
            <div className="d-flex flex-row justify-content-between">
            <button className="btn btn-light" onClick={() => {window.location.href="/sharpening/records"}}>
                <img src={arrowLeft} alt="Back" width="24" height="24" />
            </button>
            <button className="btn btn-light" onClick={() => {}}>
                <img src={plus} alt="new" width="24" height="24" />
            </button>
            </div>

            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input defaultChecked={true} type="radio" name="option" className="btn-check" id="btncheck1" autoComplete="off" onChange={() => setSelectedOption("users")} />
                <label className="btn btn-outline-primary" htmlFor="btncheck1">Uživatelské účty</label>

                <input type="radio" name="option" className="btn-check" id="btncheck2" autoComplete="off" onChange={() => setSelectedOption("customers")} />
                <label className="btn btn-outline-primary" htmlFor="btncheck2">Zákazníci</label>

                <input type="radio" name="option" className="btn-check" id="btncheck3" autoComplete="off" onChange={() => setSelectedOption("tools")} />
                <label className="btn btn-outline-primary" htmlFor="btncheck3">Nástroje</label>

                <input type="radio" name="option" className="btn-check" id="btncheck4" autoComplete="off" onChange={() => setSelectedOption("orders")} disabled/>
                <label className="btn btn-outline-primary" htmlFor="btncheck4">Objednávky</label>
            </div>
            {renderComponent()}
        </div>
    )
}