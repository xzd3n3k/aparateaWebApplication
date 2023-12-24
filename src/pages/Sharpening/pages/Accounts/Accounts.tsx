import './Accounts.scss';
import react, {ReactElement, useEffect, useState} from "react";
import api from "../../../../api";
import TAccount from "../../../../TAccount";
import { x, pencil } from "../../../../images";
import React from "react";

export default function Accounts(): ReactElement {

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
    }, [])

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

    const handleDelete = async (userId: number) => {
        deleteUser(userId);
    };


    return (
        <div>
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
                            <button className="btn btn-light" onClick={() => {}}>
                                <img src={pencil} alt="Edit" width="24" height="24" />
                            </button>
                            <button className="btn btn-light" onClick={() => {handleDelete(user.id)}}>
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
