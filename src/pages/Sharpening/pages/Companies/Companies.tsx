import React, {ReactElement, useEffect, useState} from "react";
import {Modal} from "../../../../components";
import {pencil, x} from "../../../../images";
import TCompany from "../../../../TCompany";
import api from "../../../../api";

interface IProps {
    updateRecords: boolean;
}

export default function Companies({updateRecords}: IProps): ReactElement {

    const [companies, setCompanies] = useState(Array<TCompany>);

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

    // TODO show name, phone, email, ic, dic and note and rest in modal after click
    return (
        <div>
            {/*<Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat uživatele ${selectedUserEmail}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />*/}
            {/*<Modal isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={confirmEditModal} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />*/}
            <table className="table table-hover">
                <thead>
                <tr>
                    {/*<th><input type="checkbox" className="form-check-input" onChange={(event => {selectAll(event)})} /></th>*/}
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
                    {/*<th className="d-flex flex-row justify-content-end">*/}
                    {/*    <button disabled={selectedAccounts.length < 1} className="btn btn-light" onClick={deleteSelected}>*/}
                    {/*        <img src={x} alt="Delete" width="24" height="24" />*/}
                    {/*    </button>*/}
                    {/*</th>*/}
                </tr>
                </thead>
                <tbody>
                {companies?.map((company: TCompany) => (
                    <tr className="cursor-pointer" key={company.id}>
                        {/*<td><input value={company.id} id="row-check" name="row-check" type="checkbox" className="form-check-input" onChange={(event) => {selectThis(event)}} /></td>*/}
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
                        {/*<td className="d-flex flex-row gap-3 justify-content-end">*/}
                        {/*    <button className="btn btn-light" onClick={() => {openEdit(user)}}>*/}
                        {/*        <img src={pencil} alt="Edit" width="24" height="24" />*/}
                        {/*    </button>*/}
                        {/*    <button className="btn btn-light" onClick={() => {openModal(user.email, user.id)}}>*/}
                        {/*        <img src={x} alt="Delete" width="24" height="24" />*/}
                        {/*    </button>*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
