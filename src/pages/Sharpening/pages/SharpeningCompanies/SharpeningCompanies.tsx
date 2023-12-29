import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import {Modal} from "../../../../components";
import {pencil, x} from "../../../../images";
import TSharpeningCompany from "../../../../TSharpeningCompany";
import api from "../../../../api";
import {toast} from "react-toastify";


interface IProps {
    updateRecords: boolean;
}

export default function SharpeningCompanies({updateRecords}: IProps): ReactElement {

    const [sharpeningCompanies, setSharpeningCompanies] = useState(Array<TSharpeningCompany>);

    const fetchData = async () => {
        try {
            const response = await fetch(`${api}/sharpeningCompanies`, {
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
            setSharpeningCompanies(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [updateRecords])


    const deleteSharpeningCompany = async (id: number) => {
        try {
            const response = await fetch(`${api}/deleteSharpeningCompany?id=${id}`, {
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
            console.error('Error deleting sharpening company:', error);
        }
    };

    const editSharpeningCompany = async (id: number) => {
        try {
            const response = await fetch(`${api}/editSharpeningCompany?id=${id}`, {
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

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                else if (response.status === 206) {
                    toast.error("Některá povinně vyplnitelná pole jsou nevyplněna!")
                }
                else if (response.status === 304) {
                    toast.error("Tato brusírna již existuje!")
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
                    toast.error("Tato brusírna již existuje!")
                } else {
                    toast.error(`Server odpověděl kódem: ${result.status_code}. Kontaktujte administrátora pro více informací.`);
                }
            } else {
                toast.success(`Změny uloženy`);
            }

            fetchData();

        } catch (error) {
            console.error('Error editing sharpening company:', error);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<TSharpeningCompany>();
    const [selectedCompanyName, setSelectedCompanyName] = useState('');
    const [selectedCompanyId, setSelectedCompanyId] = useState(0);

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
        deleteSharpeningCompany(selectedCompanyId);
        toast.success(`Brusírna ${selectedCompanyName} úspěšně smazána`);
        setShowModal(false);
        setSelectedCompanyName('');
        setSelectedCompanyId(0);
    };

    const [name, setName] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const openEdit = (company: TSharpeningCompany) => {
        setSelectedCompany(company);
        setName(company.name);

        if (company.note === null) {
            setNote('');
        } else {
            setNote(company.note);
        }

        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    }

    const confirmEditModal = () => {
        if  (selectedCompany) {
            editSharpeningCompany(selectedCompany.id);
            const formVar: HTMLFormElement = document.getElementById('edit-sharpening-company-form') as HTMLFormElement;
            formVar.reset();
            setShowEditModal(false);
            setSelectedCompany(undefined);
            setName('');
            setNote('');
        }
    }


    const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);


    const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.checked) {
            setSelectedCompanies(sharpeningCompanies.map(company => company.id));
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


    const deleteSelected = async () => {

        try {
            const response = await fetch(`${api}/deleteSharpeningCompanies`, {
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
                toast.success('Vybrané brusírny byly úspěšně smazány');
            }

            fetchData();

        } catch (error) {
            console.error('Error deleting sharpening companies:', error);
        }
    };

    function handleNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleNoteInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNote(event.target.value);
    }


    const btnBody: ReactNode =
        <form id="edit-sharpening-company-form" className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
                <label>Název</label>
                <input defaultValue={selectedCompany?.name} onInput={handleNameInput} type="text" className="form-control" placeholder="Název" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Poznámka</label>
                <input defaultValue={selectedCompany?.note} onInput={handleNoteInput} type="text" className="form-control" placeholder="Poznámka (volitelné)" />
            </div>
        </form>


    return (
        <div>
            <Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat brusírnu ${selectedCompanyName}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />
            <Modal isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={confirmEditModal} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th><input type="checkbox" className="form-check-input" onChange={(event => {selectAll(event)})} /></th>
                    <th>Název</th>
                    <th>Poznámka</th>
                    <th className="d-flex flex-row justify-content-end">
                        <button disabled={selectedCompanies.length < 1} className="btn btn-light" onClick={deleteSelected}>
                            <img src={x} alt="Delete" width="24" height="24" />
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {sharpeningCompanies?.map((company: TSharpeningCompany) => (
                    <tr className="cursor-pointer" key={company.id}>
                        <td><input value={company.id} id="row-check" name="row-check" type="checkbox" className="form-check-input" onChange={(event) => {selectThis(event)}} /></td>
                        <td>{company.name}</td>
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