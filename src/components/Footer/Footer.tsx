import './Footer.scss';
import React, { ReactElement } from "react";
import instagram_logo from '../../images/icons/Instagram.svg';
import facebook_logo from '../../images/icons/Facebook.svg';

export default function Footer(): ReactElement {
    return (
        <div className="footer-container inline-flex justify-end">
            <div className="padding-right-50 flex flex-col">
                <span className="inline-flex gap items-center justify-end">
                    <p>stopkovefrezy.cz</p>
                    <span style={{fontSize: "30px"}}>/</span>
                    <a href="https://www.facebook.com/Stopkovefrezy/">
                        <img src={facebook_logo} alt="facebook" width={30} height={30} />
                    </a>
                    <a href="https://www.instagram.com/stopkovefrezy.cz/">
                        <img src={instagram_logo} alt="instagram" width={30} height={30} />
                    </a>
                </span>
                <span className="inline-flex gap items-center justify-end">
                    <p>itatools.cz</p>
                    <span style={{fontSize: "30px"}}>/</span>
                    <a href="https://www.facebook.com/itatools.cz/">
                        <img src={facebook_logo} alt="facebook" width={30} height={30} />
                    </a>
                    <a href="https://www.instagram.com/itatools.cz/">
                        <img src={instagram_logo} alt="instagram" width={30} height={30} />
                    </a>
                </span>
            </div>
        </div>
    )
}
