import './Accounts.scss';
import {ReactElement, ReactNode, useEffect, useReducer, useState} from "react";
import api from "../../../../api";
import TAccount from "../../../../TAccount";
import { x, pencil } from "../../../../images";
import React from "react";
import { Modal } from "../../../../components";
import { toast } from "react-toastify";
import TCompany from "../../../../TCompany";
import Select, {ActionMeta, SingleValue} from "react-select";

interface IProps {
    updateUsers: boolean;
}

export default function Accounts({updateUsers}: IProps): ReactElement {

    const [modalKey, setModalKey] = useState(0);

    const [users, setUsers] = useState(Array<TAccount>);
    const [companies, setCompanies] = useState(Array<TCompany>);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<TAccount>();
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(0);

    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [companyId, setCompanyId] = useState<number>(0);

    const fetchData = async () => {
        try {
            const response = await fetch(`${api}/users`, {
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
            setUsers(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
    }, [updateUsers])

    const transformedCompanies = companies.map(company => ({
        value: company.id,
        label: company.name,
    }));

    const deleteUser = async (id: number) => {
        try {
            const response = await fetch(`${api}/deleteUser?id=${id}`, {
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
            console.error('Error deleting user:', error);
        }
    };

    const deleteSelected = async () => {

        try {
            const response = await fetch(`${api}/deleteUsers`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedAccounts)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                return;
            } else {
                setSelectedAccounts([]);
                toast.success('Vybrané účty byly úspěšně smazány');
            }

            fetchData();

        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const editUser = async (id: number) => {
        try {
            const response = await fetch(`${api}/editUser?id=${id}`, {
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

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                else if (response.status === 206) {
                    toast.error("Některá povinně vyplnitelná pole jsou nevyplněna!")
                }
                else if (response.status === 304) {
                    toast.error("Účet s tímto emailem již existuje!")
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
                    toast.error("Účet s tímto emailem již existuje!");
                } else {
                    toast.error(`Server odpověděl kódem: ${result.status_code}. Kontaktujte administrátora pro více informací.`);
                }
            } else {
                toast.success(`Změny uloženy`);
            }

            fetchData();

        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const openModal = (userEmail: string, userId: number) => {
        setShowModal(true);
        setSelectedUserEmail(userEmail);
        setSelectedUserId(userId);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUserEmail('');
    };

    const confirmModal = () => {
        deleteUser(selectedUserId);
        toast.success(`Uživatel ${selectedUserEmail} úspěšně smazán`);
        setShowModal(false);
        setSelectedUserEmail('');
        setSelectedUserId(0);
    };

    const openEdit = (user: TAccount) => {
        setSelectedAccount(user);

        setEmail(user.email);

        if (user.username === null) {
            setUsername('');
        } else {
            setUsername(user.username);
        }

        if (user.phone === null) {
            setPhone('');
        } else {
            setPhone(user.phone);
        }

        if (user.linked_company) {
            setCompanyId(user.linked_company.id);
        } else {
            setCompanyId(0);
        }

        setFirstName(user.first_name);
        setLastName(user.last_name);
        setPassword('');
        setModalKey((prevKey) => prevKey + 1);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        const formVar: HTMLFormElement = document.getElementById('edit-user-form') as HTMLFormElement;
        formVar.reset();
        setShowEditModal(false);
    }

    const confirmEditModal = () => {
        if  (selectedAccount) {
            editUser(selectedAccount.id);
            const formVar: HTMLFormElement = document.getElementById('edit-user-form') as HTMLFormElement;
            formVar.reset();
            setShowEditModal(false);
            setSelectedAccount(undefined);
            setEmail('');
            setUsername('');
            setPhone('');
            setFirstName('');
            setLastName('');
            setPassword('');
            setCompanyId(0);
        }
    }

    const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.checked) {
            setSelectedAccounts(users.map(user => user.id));
        } else {
            setSelectedAccounts([]);
        }

        const checkboxes: NodeListOf<HTMLInputElement> | null = document.getElementsByName('row-check') as NodeListOf<HTMLInputElement>;
        if(checkboxes) {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = event.target.checked;
            })
        }
    }


    const selectThis = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAccounts((prevState) => {
            if (event.target.checked) {
                return [...prevState, Number(event.target.value)];
            } else {
                return prevState.filter(id => id !== Number(event.target.value));
            }
        });
    };

    function handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handleFirstNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }

    function handleLastNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value);
    }

    function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
        setPhone(event.target.value);
    }

    function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleCompanyIdInput(value: SingleValue<{label: string, value: number}>, action: ActionMeta<{label: string, value: number}>) {;
        setCompanyId(Number(value?.value ?? 0));
    }

    const btnBody: ReactNode =
        <form id="edit-user-form" className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
                <label>Uživatelské jméno</label>
                <input defaultValue={selectedAccount?.username} onInput={handleUsernameInput} type="text" className="form-control" placeholder="Uživatelské jméno (volitelné)" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Jméno</label>
                <input defaultValue={selectedAccount?.first_name} onInput={handleFirstNameInput} type="text" className="form-control" placeholder="Jméno" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Příjmení</label>
                <input defaultValue={selectedAccount?.last_name} onInput={handleLastNameInput} type="text" className="form-control" placeholder="Příjmení" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Email</label>
                <input defaultValue={selectedAccount?.email} onInput={handleEmailInput} type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Mobil</label>
                <input defaultValue={selectedAccount?.phone} onInput={handlePhoneInput} type="text" className="form-control" placeholder="Mobil (volitelné)" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Nové heslo</label>
                <input onInput={handlePasswordInput} type="password" className="form-control" placeholder="Nové heslo" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Firma</label>
                <Select
                    placeholder="Firma"
                    options={transformedCompanies}
                    defaultValue={
                        selectedAccount?.linked_company?.name && selectedAccount?.linked_company?.name.length > 0
                            ? { label: selectedAccount?.linked_company?.name, value: selectedAccount?.linked_company?.id }
                            : null
                    }
                    noOptionsMessage={() => "Nenalezeno"}
                    isClearable={true}
                    onChange={handleCompanyIdInput}
                ></Select>
            </div>
        </form>


    return (
        <div>
            <Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat uživatele ${selectedUserEmail}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />
            <Modal key={modalKey} isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={confirmEditModal} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th><input type="checkbox" className="form-check-input" onChange={(event => {selectAll(event)})} /></th>
                    <th>Uživatelské jméno</th>
                    <th>Email</th>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Mobil</th>
                    <th>Firma</th>
                    <th className="d-flex flex-row justify-content-end">
                        <button disabled={selectedAccounts.length < 1} className="btn btn-light" onClick={deleteSelected}>
                            <img src={x} alt="Delete" width="24" height="24" />
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user: TAccount) => (
                    <tr className="cursor-pointer" key={user.id}>
                        <td><input value={user.id} id="row-check" name="row-check" type="checkbox" className="form-check-input" onChange={(event) => {selectThis(event)}} /></td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.phone}</td>
                        <td>{user.linked_company?.name}</td>
                        <td className="d-flex flex-row gap-3 justify-content-end">
                            <button className="btn btn-light" onClick={() => {openEdit(user)}}>
                                <img src={pencil} alt="Edit" width="24" height="24" />
                            </button>
                            <button className="btn btn-light" onClick={() => {openModal(user.email, user.id)}}>
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
