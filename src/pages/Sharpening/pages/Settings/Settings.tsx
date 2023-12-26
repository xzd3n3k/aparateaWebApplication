import './Settings.scss';
import React, { ReactElement, useState, ReactNode } from "react";
import { arrowLeft, plus } from "../../../../images";
import { Accounts } from "../index";
import { Modal } from "../../../../components";
import { toast } from "react-toastify";
import api from "../../../../api";

export default function Settings(): ReactElement {
    const [updateUsers, setUpdateUsers] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [selectedOption, setSelectedOption] = useState("users");

    const modalTitle: () => string = () => {
        switch (selectedOption) {
            case "users":
                return 'Vytvořit uživatelský účet'
            case "customers":
                return 'Přidat zákazníka'
            case "tools":
                return 'Přidat nástroj'
            case "orders":
                return 'Vytvořit novou objednávku'
            default:
                return '';
        }
    };

    const buttonText: () => string = () => {
        switch (selectedOption) {
            case "users":
                return 'Vytvořit'
            case "customers":
                return 'Přidat'
            case "tools":
                return 'Přidat'
            case "orders":
                return 'Vytvořit'
            default:
                return '';
        }
    };

    const title: string = modalTitle();
    const btnText: string = buttonText();

    function generatePassword(length: number) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    function generatePhoneNumber(length: number) {
        const characters ='0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const [generateRandom, setGenerateRandom] = useState(false);

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>('');

    const btnBody: ReactNode =
        <div className="d-flex flex-column gap-3">
            <span className="d-flex flex-row gap-3">
                <label className="form-label">Generate random acc</label>
                <input type="checkbox" id="genRandom" name="genRandom" className="form-check-input" defaultChecked={false}
                       onChange={(event) => {
                           setGenerateRandom((prevGenerateRandom) => {
                               if (event.target.checked) {
                                   setPassword(generatePassword(15));
                                   setEmail(`${generatePassword(6)}@gmail.com`);
                                   setFirstName(generatePassword(6));
                                   setLastName(generatePassword(6));
                                   setUsername(generatePassword(6));
                                   setPhone(generatePhoneNumber(9));

                                   return true;
                               } else {
                                   return false;
                               }
                           });
                       }} />
            </span>
            <input onChange={event => setUsername(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Uživatelské jméno (volitelné)" />
            <input onChange={event => setFirstName(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Jméno" />
            <input onChange={event => setLastName(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Příjmení" />
            <input onChange={event => setEmail(event.target.value)} disabled={generateRandom} type="email" className="form-control" placeholder="Email" />
            <input onChange={event => setPhone(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Mobil (volitelné)" />
            <input onChange={event => setPassword(event.target.value)} disabled={generateRandom} type="password" className="form-control" placeholder="Heslo" />
        </div>

    const credentialsBody: ReactNode =
        <div>
            <div className="d-flex flex-column gap-2">
                <label>Uživatelské jméno</label>
                <p>{username}</p>
            </div>
            <div className="d-flex flex-column gap-2">
                <label>Jméno</label>
                <p>{firstName} {lastName}</p>
            </div>
            <div className="d-flex flex-column gap-2">
                <label>Email</label>
                <p>{email}</p>
            </div>
            <div className="d-flex flex-column gap-2">
                <label>Mobil</label>
                <p>{phone}</p>
            </div>
            <div className="d-flex flex-column gap-2">
                <label>Heslo</label>
                <p>{password}</p>
            </div>
        </div>;

    const confirmModal = async () => {
        const checkbox: HTMLInputElement | null = document.getElementById('genRandom') as HTMLInputElement;
        if(checkbox) {
            checkbox.checked = false;
            setGenerateRandom(false);
        }

        switch (selectedOption) {
            case "users":

                const response = await fetch(`${api}/register`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "password": password,
                        "email": email,
                        "first_name": firstName,
                        "last_name": lastName,
                        "username": username,
                        "phone": phone
                    }),
                });

                const result = await response.json();

                if (response.status === 200) {
                    if (result === 'User already exists!') {
                        toast.error('Uživatelský účet již existuje!');

                    } else {
                        if (generateRandom) {
                            setShowCredentials(true);
                        }
                        setUpdateUsers(!updateUsers);
                        toast.success(`Uživatelský účet vytvořen`);
                    }

                } else if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                } else {
                    toast.error("Chyba při vytváření účtu!");
                }

                setShowModal(false);
                break;
            case "customers":
                toast.success(`Zákazník úspěšně přidán`);
                setShowModal(false);
                break;
            case "tools":
                toast.success(`Nástroj úspěšně přidán`);
                setShowModal(false);
                break;
            case "orders":
                toast.success(`Objednávka úspěšně vytvořena`);
                setShowModal(false);
                break;

        }
    }


    const renderComponent = () => {
        switch (selectedOption) {
            case "users":
                return <Accounts updateUsers={updateUsers} />;
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
            <Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title={title} body={btnBody} confirmButtonText={btnText} buttonColor="btn-primary" />
            <Modal isOpen={showCredentials} handleClose={() => {setShowCredentials(false)}} handleConfirm={() => {setShowCredentials(false)}} title="Údaje k účtu" body={credentialsBody} confirmButtonText="OK" buttonColor="visually-hidden"/>
            <div className="d-flex flex-row justify-content-between">
            <button className="btn btn-light" onClick={() => {window.location.href="/sharpening/records"}}>
                <img src={arrowLeft} alt="Back" width="24" height="24" />
            </button>
            <button className="btn btn-light" onClick={openModal}>
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