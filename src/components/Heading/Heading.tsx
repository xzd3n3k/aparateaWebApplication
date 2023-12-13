import './Heading.scss';
import React, { ReactElement } from "react";

interface IProps {
    text: string;
}

export default function Heading({text}: IProps): ReactElement {
    return (
        <div className="heading-container">
            {text}
        </div>
    )
}