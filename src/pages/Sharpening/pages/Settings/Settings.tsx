import './Settings.scss';
import React, { ReactElement } from "react";
import {arrowLeft} from "../../../../images";

export default function Settings(): ReactElement {
    return (
        <div className="settings-container d-flex w-100 p-4">
            <button className="btn btn-light" onClick={() => {window.location.href="/sharpening/records"}}>
                <img src={arrowLeft} alt="Settings" width="24" height="24" />
            </button>
        </div>
    )
}