import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import {Modal} from "../../../../components";
import {pencil, x} from "../../../../images";
import TCompany from "../../../../TCompany";
import api from "../../../../api";
import {toast} from "react-toastify";

interface IProps {
    updateRecords: boolean;
}

export default function Companies({updateRecords}: IProps): ReactElement {

    const [companies, setCompanies] = useState(Array<TCompany>);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<TCompany>();
    const [selectedCompanyName, setSelectedCompanyName] = useState('');
    const [selectedCompanyId, setSelectedCompanyId] = useState(0);

    const [name, setName] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [town, setTown] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [cisloPopisne, setCisloPopisne] = useState<string>('');
    const [psc, setPsc] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [ic, setIc] = useState<string>('');
    const [dic, setDic] = useState<string>('');
    const [executive, setExecutive] = useState<string>('');
    const [note, setNote] = useState<string>('');

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
    }, [updateRecords])

    const deleteCompany = async (id: number) => {
        try {
            const response = await fetch(`${api}/deleteCompany?id=${id}`, {
                method: 'DELETE',
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

            fetchData();

        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const deleteSelected = async () => {

        try {
            const response = await fetch(`${api}/deleteCompanies`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedCompanies)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                return;
            } else {
                setSelectedCompanies([]);
                toast.success('Vybraní zákaznící byli úspěšně smazány');
            }

            fetchData();

        } catch (error) {
            console.error('Error deleting companies:', error);
        }
    };

    const editCompany = async (id: number) => {
        try {
            const response = await fetch(`${api}/editCompany?id=${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "state": state,
                    "town": town,
                    "street": street,
                    "cislo_popisne": cisloPopisne,
                    "psc": psc,
                    "phone": phone,
                    "email": email,
                    "ic": ic,
                    "dic": dic,
                    "executive": executive,
                    "note": note
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                else if (response.status === 206) {
                    toast.error("Některá povinně vyplnitelná pole jsou nevyplněna!")
                }
                else if (response.status === 304) {
                    toast.error("Tento zákazník již existuje!")
                }
                return;
            }


            const result = await response.json();

            if (result) {
                if (result.status_code === 401) {
                    window.location.href = "/sharpening/login";
                } else if (result.status_code === 206) {
                    toast.error("Některá povinně vyplnitelná pole jsou nevyplněna!");
                } else if (result.status_code === 304) {
                    toast.error("Tento zákazník již existuje!")
                } else {
                    toast.error(`Server odpověděl kódem: ${result.status_code}. Kontaktujte administrátora pro více informací.`);
                }
            } else {
                toast.success(`Změny uloženy`);
            }

            fetchData();

        } catch (error) {
            console.error('Error editing company:', error);
        }
    };

    const openModal = (companyName: string, companyId: number) => {
        setShowModal(true);
        setSelectedCompanyName(companyName);
        setSelectedCompanyId(companyId);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCompanyName('');
    };

    const confirmModal = () => {
        deleteCompany(selectedCompanyId);
        toast.success(`Zákazník ${selectedCompanyName} úspěšně smazána`);
        setShowModal(false);
        setSelectedCompanyName('');
        setSelectedCompanyId(0);
    };

    const openEdit = (company: TCompany) => {
        setSelectedCompany(company);
        setName(company.name);

        for (const key in company) {
            if (Object.prototype.hasOwnProperty.call(company, key)) {
                if ((company as any)[key] === null) {
                    (company as any)[key] = '';
                }
            }
        }

        setName(company.name);
        setState(company.state);
        setTown(company.town);
        setStreet(company.street);
        setCisloPopisne(company.cislo_popisne);
        setPsc(company.psc);
        setPhone(company.phone);
        setEmail(company.email);
        setIc(company.ic);
        setDic(company.dic);
        setExecutive(company.executive);
        setNote(company.note);


        setShowEditModal(true);
    };

    const closeEditModal = () => {
        const formVar: HTMLFormElement = document.getElementById('edit-company-form') as HTMLFormElement;
        formVar.reset();
        setShowEditModal(false);
    }

    const confirmEditModal = () => {
        if  (selectedCompany) {
            editCompany(selectedCompany.id);
            const formVar: HTMLFormElement = document.getElementById('edit-company-form') as HTMLFormElement;
            formVar.reset();
            setShowEditModal(false);
            setSelectedCompany(undefined);
            setName('');
        }
    }

    const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.checked) {
            setSelectedCompanies(companies.map(company => company.id));
        } else {
            setSelectedCompanies([]);
        }

        const checkboxes: NodeListOf<HTMLInputElement> | null = document.getElementsByName('row-check') as NodeListOf<HTMLInputElement>;
        if(checkboxes) {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = event.target.checked;
            })
        }
    }

    const selectThis = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCompanies((prevState) => {
            if (event.target.checked) {
                return [...prevState, Number(event.target.value)];
            } else {
                return prevState.filter(id => id !== Number(event.target.value));
            }
        });
    };

    function handleNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleStateInput(event: React.ChangeEvent<HTMLInputElement>) {
        setState(event.target.value);
    }

    function handleTownInput(event: React.ChangeEvent<HTMLInputElement>) {
        setTown(event.target.value);
    }

    function handleStreetInput(event: React.ChangeEvent<HTMLInputElement>) {
        setStreet(event.target.value);
    }

    function handleCisloPopisneInput(event: React.ChangeEvent<HTMLInputElement>) {
        setCisloPopisne(event.target.value);
    }

    function handlePscInput(event: React.ChangeEvent<HTMLInputElement>) {
        setPsc(event.target.value);
    }

    function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
        setPhone(event.target.value);
    }

    function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handleIcInput(event: React.ChangeEvent<HTMLInputElement>) {
        setIc(event.target.value);
    }

    function handleDicInput(event: React.ChangeEvent<HTMLInputElement>) {
        setDic(event.target.value);
    }

    function handleExecutiveInput(event: React.ChangeEvent<HTMLInputElement>) {
        setExecutive(event.target.value);
    }

    function handleNoteInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNote(event.target.value);
    }

    const btnBody: ReactNode =
        <form id="edit-company-form" className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
                <label>Název</label>
                <input defaultValue={selectedCompany?.name} onInput={handleNameInput} type="text" className="form-control" placeholder="Název" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Stát</label>
                <input defaultValue={selectedCompany?.state} onInput={handleStateInput} type="text" className="form-control" placeholder="Stát" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Město</label>
                <input defaultValue={selectedCompany?.town} onInput={handleTownInput} type="text" className="form-control" placeholder="Město" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Ulice</label>
                <input defaultValue={selectedCompany?.street} onInput={handleStreetInput} type="text" className="form-control" placeholder="Ulice" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Číslo popisné</label>
                <input defaultValue={selectedCompany?.cislo_popisne} onInput={handleCisloPopisneInput} type="text" className="form-control" placeholder="Číslo popisné" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>PSČ</label>
                <input defaultValue={selectedCompany?.psc} onInput={handlePscInput} type="text" className="form-control" placeholder="PSČ" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Mobil</label>
                <input defaultValue={selectedCompany?.phone} onInput={handlePhoneInput} type="text" className="form-control" placeholder="Mobil" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Email</label>
                <input defaultValue={selectedCompany?.email} onInput={handleEmailInput} type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>IČ</label>
                <input defaultValue={selectedCompany?.ic} onInput={handleIcInput} type="text" className="form-control" placeholder="IČ" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>DIČ</label>
                <input defaultValue={selectedCompany?.dic} onInput={handleDicInput} type="text" className="form-control" placeholder="DIČ" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Ředitel</label>
                <input defaultValue={selectedCompany?.executive} onInput={handleExecutiveInput} type="text" className="form-control" placeholder="Ředitel" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Poznámka</label>
                <input defaultValue={selectedCompany?.note} onInput={handleNoteInput} type="text" className="form-control" placeholder="Poznámka" />
            </div>
        </form>

    // TODO show name, phone, email, ic, dic and note and rest in modal after click
    return (
        <div>
            <Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat zákazníka ${selectedCompanyName}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />
            <Modal isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={confirmEditModal} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th><input type="checkbox" className="form-check-input" onChange={(event => {selectAll(event)})} /></th>
                    <th>Název</th>
                    <th>Stát</th>
                    <th>Město</th>
                    <th>Ulice</th>
                    <th>č.p</th>
                    <th>PSČ</th>
                    <th>Mobil</th>
                    <th>Email</th>
                    <th>IČ</th>
                    <th>DIČ</th>
                    <th>Ředitel</th>
                    <th>Poznámka</th>
                    <th className="d-flex flex-row justify-content-end">
                        <button disabled={selectedCompanies.length < 1} className="btn btn-light" onClick={deleteSelected}>
                            <img src={x} alt="Delete" width="24" height="24" />
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {companies?.map((company: TCompany) => (
                    <tr className="cursor-pointer" key={company.id}>
                        <td><input value={company.id} id="row-check" name="row-check" type="checkbox" className="form-check-input" onChange={(event) => {selectThis(event)}} /></td>
                        <td>{company.name}</td>
                        <td>{company.state}</td>
                        <td>{company.town}</td>
                        <td>{company.street}</td>
                        <td>{company.cislo_popisne}</td>
                        <td>{company.psc}</td>
                        <td>{company.phone}</td>
                        <td>{company.email}</td>
                        <td>{company.ic}</td>
                        <td>{company.dic}</td>
                        <td>{company.executive}</td>
                        <td>{company.note}</td>
                        <td className="d-flex flex-row gap-3 justify-content-end">
                            <button className="btn btn-light" onClick={() => {openEdit(company)}}>
                                <img src={pencil} alt="Edit" width="24" height="24" />
                            </button>
                            <button className="btn btn-light" onClick={() => {openModal(company.name, company.id)}}>
                                <img src={x} alt="Delete" width="24" height="24" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
