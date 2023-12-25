import './Records.scss';
import React, { ReactElement } from "react";
import Select from 'react-select';
import { gear } from "../../../../images";


export default function Records(): ReactElement {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    }
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    return (
        <div className="records-container p-4 gap-3 d-flex flex-column">
            <div className="d-flex flex-row justify-content-center">
            <div className="w-100 d-flex flex-row justify-content-end">
                <button className="btn btn-light" onClick={() => {window.location.href="/sharpening/settings"}}>
                    <img src={gear} alt="Settings" width="24" height="24" />
                </button>
            </div>
            </div>

            <div className="d-flex flex-row justify-content-center">
                <form onSubmit={handleSubmit} className="d-flex flex-row gap-3 w-100 bg-body-secondary p-2 rounded">
                    <span className="w-25">
                        <label>Brusírna</label>
                        <Select options={options} placeholder="Vyberte..." />
                    </span>
                    <span className="w-50">
                        <label>Zákazník</label>
                        <Select options={options} placeholder="Vyberte..." />
                    </span>
                    <span className="w-50">
                        <label>Nástroj</label>
                        <Select options={options} placeholder="Vyberte..." />
                    </span>
                    <span className="w-25">
                        <label>Počet</label>
                        <input type="number" className="form-control" min="1" defaultValue="1"/>
                    </span>
                    <div className="d-flex flex-column justify-content-end">
                        <button type="submit" className="btn btn-light">Zapsat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}