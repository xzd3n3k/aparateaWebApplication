import './Title.scss';
import React, { ReactElement } from "react";

interface IProps {
    text: string;
}

export default function Title({text}: IProps): ReactElement {
    return (
        <div className="title-container">
            {text}
        </div>
    )
}