import './Login.scss';
import React, { ReactElement, useState } from "react";
import api from "../../../../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(): ReactElement {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const formData = new FormData();

        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch(`${api}/login`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.status === 200) {
            localStorage.setItem('token', result.access_token);
            localStorage.setItem('token_expires', result.expires);
            window.location.href = "/sharpening/records";
        } else {
            toast.error("Špatné přihlašovací údaje!");
        }
    }

    return (
        <div className="login-container d-flex flex-row justify-content-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-50">
                <h2 className="text-center">Přihlášení do systému</h2>
                <input type="email" className="form-control" placeholder="Zadejte email" onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" placeholder="Zadejte heslo" onChange={e => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-light">Přihlásit</button>
                <ToastContainer theme="light" />
            </form>
        </div>
    )
}