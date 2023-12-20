import './Subtitle.scss';
import React, { ReactElement } from "react";

interface IProps {
    text: string;
}

export default function Subtitle({text}: IProps): ReactElement {
    return (
        <div className="subtitle-container">
            {text}
        </div>
    )
}