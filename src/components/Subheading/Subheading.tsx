import './Subheading.scss';
import React, { ReactElement } from "react";

interface IProps {
    text: string;
}

export default function Subheading({text}: IProps): ReactElement {
    return (
        <div className="subheading-container">
            {text}
        </div>
    )
}