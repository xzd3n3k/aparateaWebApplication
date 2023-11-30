import React from "react";

interface IProps {
    repeat?: number;
}
export default function LoremIpsumParagraph({repeat=1}: IProps) {
    const loremIpsumText = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `;

    // Using Array.from to repeat the Lorem Ipsum text
    const repeatedText = Array.from({ length: repeat }, () => loremIpsumText).join('\n');

    return (
        <p>
            {repeatedText}
        </p>
    );
};
