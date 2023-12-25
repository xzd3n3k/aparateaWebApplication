import './Accounts.scss';
import react, {ReactElement, ReactNode, useEffect, useState} from "react";
import api from "../../../../api";
import TAccount from "../../../../TAccount";
import { x, pencil } from "../../../../images";
import React from "react";
import { Modal } from "../../../../components";
import { toast } from "react-toastify";

interface IProps {
    updateUsers: boolean;
}

export default function Accounts({updateUsers}: IProps): ReactElement {

    const [users, setUsers] = useState(Array<TAccount>);

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
    };

    useEffect(() => {
        fetchData();
    }, [updateUsers])

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

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<TAccount>();
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(0);

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
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    }

    const confirmEditModal = (numb: number) => {
        toast.success(`Změny uloženy`);
    }

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>('');

    const btnBody: ReactNode =
        <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
                <label>Uživatelské jméno</label>
                <input defaultValue={selectedAccount?.username} onChange={event => setUsername(event.target.value)} type="text" className="form-control" placeholder="Uživatelské jméno (volitelné)" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Jméno</label>
                <input defaultValue={selectedAccount?.first_name} onChange={event => setFirstName(event.target.value)} type="text" className="form-control" placeholder="Jméno" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Příjmení</label>
                <input defaultValue={selectedAccount?.last_name} onChange={event => setLastName(event.target.value)} type="text" className="form-control" placeholder="Příjmení" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Email</label>
                <input defaultValue={selectedAccount?.email} onChange={event => setEmail(event.target.value)} type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Mobil</label>
                <input defaultValue={selectedAccount?.phone} onChange={event => setPhone(event.target.value)} type="text" className="form-control" placeholder="Mobil (volitelné)" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Nové heslo</label>
                <input onChange={event => setPassword(event.target.value)} type="password" className="form-control" placeholder="Nové heslo" />
            </div>
        </div>


    return (
        <div>
            <Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat uživatele ${selectedUserEmail}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />
            <Modal isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={() => confirmEditModal(2)} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Uživatelské jméno</th>
                    <th>Email</th>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Mobil</th>
                    <th>Firma</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user: TAccount) => (
                    <tr className="cursor-pointer" key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.phone}</td>
                        <td>{user.linked_company}</td>
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
