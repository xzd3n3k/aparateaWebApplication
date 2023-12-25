import './Settings.scss';
import React, { ReactElement, useState, ReactNode } from "react";
import { arrowLeft, plus } from "../../../../images";
import { Accounts } from "../index";
import { Modal } from "../../../../components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Settings(): ReactElement {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // const confirmModal = () => {
    //     toast.success(`Uživatel úspěšně přidán`);
    //     setShowModal(false);
    // };

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

    // program to generate random strings

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generatePassword(length: number) {

        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const [generateRandom, setGenerateRandom] = useState(false);


    const btnBody: ReactNode =
        <div className="d-flex flex-column gap-3">
            <span className="d-flex flex-row gap-3">
                <label className="form-label">Generate random acc</label>
                <input type="checkbox" id="genRandom" name="genRandom" className="form-check-input"
                       onChange={() => setGenerateRandom(!generateRandom)} />
            </span>
            <input disabled={generateRandom} type="text" className="form-control" placeholder="Uživatelské jméno (volitelné)" />
            <input disabled={generateRandom} type="text" className="form-control" placeholder="Jméno" />
            <input disabled={generateRandom} type="text" className="form-control" placeholder="Příjmení" />
            <input disabled={generateRandom} type="email" className="form-control" placeholder="Email" />
            <input disabled={generateRandom} type="text" className="form-control" placeholder="Mobil (volitelné)" />
            <input disabled={generateRandom} type="password" className="form-control" placeholder="Heslo" />
        </div>

    const confirmModal = () => {
        switch (selectedOption) {
            case "users":
                toast.success(`Uživatelský účet vytvořen`);
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
                return <Accounts />;
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
            <ToastContainer theme="light" />
        </div>
    )
}