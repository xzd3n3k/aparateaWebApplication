import './Settings.scss';
import React, {ReactElement, useState, ReactNode, useEffect} from "react";
import { arrowLeft, plus } from "../../../../images";
import {Accounts, Companies, SharpeningCompanies} from "../index";
import { Modal } from "../../../../components";
import { toast } from "react-toastify";
import api from "../../../../api";
import TCompany from "../../../../TCompany";
import Select from "react-select";

export default function Settings(): ReactElement {
    const [updateUsers, setUpdateUsers] = useState(false);
    const [updateSharpeningCompanies, setUpdateSharpeningCompanies] = useState(false);
    const [updateCompanies, setUpdateCompanies] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);

    const [selectedOption, setSelectedOption] = useState("users");

    const [generateRandom, setGenerateRandom] = useState(false);

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>('');
    const [companyId, setCompanyId] = useState<number>(0);

    const [name, setName] = useState<string>('');
    const [note, setNote] = useState<string>("");

    const [companyName, setCompanyName] = useState<string>('');
    const [companyEmail, setCompanyEmail] = useState<string>('');
    const [companyState, setCompanyState] = useState<string>('');
    const [companyTown, setCompanyTown] = useState<string>('');
    const [companyStreet, setCompanyStreet] = useState<string>('');
    const [companyCisloPopisne, setCompanyCisloPopisne] = useState<string>('');
    const [companyPsc, setCompanyPsc] = useState<string>('');
    const [companyPhone, setCompanyPhone] = useState<string>('');
    const [companyIc, setCompanyIc] = useState<string>('');
    const [companyDic, setCompanyDic] = useState<string>('');
    const [companyExecutive, setCompanyExecutive] = useState<string>('');
    const [companyNote, setCompanyNote] = useState<string>('');

    const [companies, setCompanies] = useState(Array<TCompany>);

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch(`${api}/companies`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                return;
            }

            const result = await response.json();
            setCompanies(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const transformedCompanies = companies.map(company => ({
        value: company.id,
        label: company.name,
    }));

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const modalTitle: () => string = () => {
        switch (selectedOption) {
            case "users":
                return 'Vytvořit uživatelský účet'
            case "sharpeningCompanies":
                return 'Přidat brusírnu'
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
            case "sharpeningCompanies":
                return 'Přidat'
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

    const btnBody: ReactNode =
        selectedOption === "users" ? (
            <form id="create-account-form" className="d-flex flex-column gap-3">
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
                <Select options={transformedCompanies}
                        menuIsOpen={menuIsOpen}
                        onInputChange={(inputValue, { action }) => {
                            setMenuIsOpen(action === 'input-change' && inputValue.trim() !== '');
                        }}
                        onBlur={() => setMenuIsOpen(false)}
                        placeholder="Firma (volitelné)"
                        noOptionsMessage={() => "Nenalezeno"}
                        onChange={selectSelected => {if(selectSelected) {setCompanyId(selectSelected.value)} else {setCompanyId(0)} }}
                        isDisabled={generateRandom}
                />
            </form>
        ) : selectedOption === "sharpeningCompanies" ? (
                <form id="create-sharpening-company-form" className="d-flex flex-column gap-3">
                    <input onChange={event => setName(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Název" />
                    <input onChange={event => setNote(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Poznámka (volitelné)" />
                </form>
        ) : selectedOption === "customers" ? (
                <form id="create-company-form" className="d-flex flex-column gap-3">
                    <input onChange={event => setCompanyName(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Název" />
                    <input onChange={event => setCompanyEmail(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Email" />
                    <input onChange={event => setCompanyState(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Stát (volitelné)" />
                    <input onChange={event => setCompanyTown(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Město (volitelné)" />
                    <input onChange={event => setCompanyStreet(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Ulice (volitelné)" />
                    <input onChange={event => setCompanyCisloPopisne(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="č.p (volitelné)" />
                    <input onChange={event => setCompanyPsc(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="PSČ (volitelné)" />
                    <input onChange={event => setCompanyPhone(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Mobil (volitelné)" />
                    <input onChange={event => setCompanyIc(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="IČ (volitelné)" />
                    <input onChange={event => setCompanyDic(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="DIČ (volitelné)" />
                    <input onChange={event => setCompanyExecutive(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Ředitel (volitelné)" />
                    <input onChange={event => setCompanyNote(event.target.value)} disabled={generateRandom} type="text" className="form-control" placeholder="Poznámka (volitelné)" />
                </form>
            ) :
            <div>ostatni</div>
    ;


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
                        "phone": phone,
                        "company_id": companyId
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
                const formVar: HTMLFormElement = document.getElementById('create-account-form') as HTMLFormElement;
                formVar.reset();
                setShowModal(false);
                break;
            case "sharpeningCompanies":
                const sharpeningCompResponse = await fetch(`${api}/createSharpeningCompany`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": name,
                        "note": note
                    }),
                });

                const sharpeningCompResult = await sharpeningCompResponse.json();

                if (sharpeningCompResponse.status === 200) {
                    if (sharpeningCompResult === 'Sharpening company already exists!') {
                        toast.error('Brusírna již existuje!');

                    } else {
                        setUpdateSharpeningCompanies(!updateSharpeningCompanies);
                        toast.success("Brusírna úspěšně přidána");
                    }

                } else if (sharpeningCompResponse.status === 401) {
                    window.location.href = "/sharpening/login";
                } else {
                    toast.error("Chyba při vytváření brusírny!");
                }
                const sharpeningCompanyForm: HTMLFormElement = document.getElementById('create-sharpening-company-form') as HTMLFormElement;
                sharpeningCompanyForm.reset();
                setShowModal(false);
                break;
            case "customers":
                const companiesResponse = await fetch(`${api}/createCompany`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": companyName,
                        "email": companyEmail,
                        "state": companyState,
                        "town": companyTown,
                        "street": companyStreet,
                        "cislo_popisne": companyCisloPopisne,
                        "psc": companyPsc,
                        "phone": companyPhone,
                        "ic": companyIc,
                        "dic": companyDic,
                        "executive": companyExecutive,
                        "note": companyNote
                    }),
                });

                const companiesResult = await companiesResponse.json();

                if (companiesResponse.status === 200) {
                    if (companiesResult === 'Company already exists!') {
                        toast.error('Zákazník již existuje!');

                    } else {
                        setUpdateCompanies(!updateCompanies);
                        toast.success(`Zákazník úspěšně přidán`);
                    }

                } else if (companiesResponse.status === 401) {
                    window.location.href = "/sharpening/login";
                } else {
                    toast.error("Chyba při vytváření zákazníka!");
                }
                const companyForm: HTMLFormElement = document.getElementById('create-company-form') as HTMLFormElement;
                companyForm.reset();
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
            case "sharpeningCompanies":
                return <SharpeningCompanies updateRecords={updateSharpeningCompanies}/>;
            case "customers":
                return <Companies updateRecords={updateCompanies} />;
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

                <input type="radio" name="option" className="btn-check" id="btncheck2" autoComplete="off" onChange={() => setSelectedOption("sharpeningCompanies")} />
                <label className="btn btn-outline-primary" htmlFor="btncheck2">Brusírny</label>

                <input type="radio" name="option" className="btn-check" id="btncheck3" autoComplete="off" onChange={() => setSelectedOption("customers")} />
                <label className="btn btn-outline-primary" htmlFor="btncheck3">Zákazníci</label>

                <input type="radio" name="option" className="btn-check" id="btncheck4" autoComplete="off" onChange={() => setSelectedOption("tools")} />
                <label className="btn btn-outline-primary" htmlFor="btncheck4">Nástroje</label>

                <input type="radio" name="option" className="btn-check" id="btncheck5" autoComplete="off" onChange={() => setSelectedOption("orders")} disabled/>
                <label className="btn btn-outline-primary" htmlFor="btncheck5">Objednávky</label>
            </div>
            {renderComponent()}
        </div>
    )
}