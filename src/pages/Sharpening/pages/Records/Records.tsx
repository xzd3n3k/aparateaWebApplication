import './Records.scss';
import React, {ReactElement, useEffect, useState} from "react";
import Select from 'react-select';
import {gear, pencil, x, check, arrowRight} from "../../../../images";
import TSharpeningCompany from "../../../../TSharpeningCompany";
import api from "../../../../api";
import TCompany from "../../../../TCompany";
import TTool from "../../../../TTool";
import {toast} from "react-toastify";
import TOrder from "../../../../TOrder";
import {Modal} from "../../../../components";


export default function Records(): ReactElement {

    const [orders, setOrders] = useState(Array<TOrder>)

    const [selectKey, setSelectKey] = useState(0);

    const [sharpeningCompanies, setSharpeningCompanies] = useState(Array<TSharpeningCompany>);
    const [companies, setCompanies] = useState(Array<TCompany>);
    const [tools, setTools] = useState(Array<TTool>);

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const [toolMenuIsOpen, setToolMenuIsOpen] = React.useState(false);
    //const filteredOptions = inputValue.trim() === '' ? staticOptions : options; TODO use this when show eg top first 5 records and when user starts typing show filtered all opts


    const fetchOrders = async () => {
        try {
            const response = await fetch(`${api}/orders`, {
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
            setOrders(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchSharpeningCompanies = async () => {
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

    const fetchCompanies = async () => {
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

    const fetchTools = async () => {
        try {
            const response = await fetch(`${api}/tools`, {
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
            setTools(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchSharpeningCompanies();
        fetchCompanies();
        fetchTools();
    }, [])

    const createOrder = async (sharpening_company_id: number, customer_id: number, tool_id: number, count: number) => {
        try {
            const response = await fetch(`${api}/createOrder`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "sharpening_company_id": sharpening_company_id,
                    "customer_id": customer_id,
                    "tool_id": tool_id,
                    "count": count
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                return;
            }

            const result = await response.json();

            if (result) {
                if (result.status_code === 401) {
                    window.location.href = "/sharpening/login";
                } else if (result === 201) {
                    toast.success(`Zapsáno`);
                } else {
                    toast.error(`Server odpověděl kódem: ${result.status_code}. Kontaktujte administrátora pro více informací.`);
                }
            } else {
                toast.error(`Server neodpověděl, zkuste to prosím znovu`);
            }

            fetchOrders();

        } catch (error) {
            console.error('Error creating order:', error);
            return 'error';
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const brusirnaInputValue = formData.get('brusirna-input') as string;
        const zakaznikInputValue = formData.get('zakaznik-input') as string;
        const nastrojInputValue = formData.get('nastroj-input') as string;
        const pocetInputValue = formData.get('pocet-input') as string;

        const order_created = await createOrder(Number(brusirnaInputValue), Number(zakaznikInputValue), Number(nastrojInputValue), Number(pocetInputValue));
        if (order_created === 'error') {
            toast.error('Nejsou vyplněna všechna pole!');
        } else {
            setSelectKey((prevKey) => prevKey + 1);
        }

    }

    const transformedSharpeningCompanies = sharpeningCompanies.map(option => ({
        value: option.id,
        label: option.name,
    }));

    const transformedCompanies = companies.map(company => ({
        value: company.id,
        label: company.name,
    }));

    const transformedTools = tools.map(tool => ({
        value: tool.id,
        label: tool.name,
    }))

    function sortOrdersByColumn(orders: Array<TOrder>, columnName: string, direction: 'asc'|'desc') {

        // return orders;
        setOrders(prevOrders => {
            return [...prevOrders].sort((a, b) => {
                const valueA = String(a[columnName as keyof TOrder]).toLowerCase();
                const valueB = String(b[columnName as keyof TOrder]).toLowerCase();

                if (direction === 'asc') {
                    return valueA.localeCompare(valueB);
                } else if (direction === 'desc') {
                    return valueB.localeCompare(valueA);
                } else {
                    throw new Error('Invalid sort direction');
                }
            });
        });
        console.log('Orders');
        return;
    }


    return (
        <div className="records-container p-4 gap-3 d-flex flex-column">
            <div className="d-flex flex-row justify-content-center">
            <div className="w-100 d-flex flex-row justify-content-end">
                <button className="btn btn-light" onClick={() => {window.location.href="/sharpening/settings"}}>
                    <img src={gear} alt="Settings" width="24" height="24" />
                </button>
            </div>
            </div>

            <div className="d-flex flex-row justify-content-center">
                <form onSubmit={handleSubmit} className="d-flex flex-row gap-3 w-100 bg-body-secondary p-2 rounded">
                    <span className="w-25">
                        <label>Brusírna</label>
                        <Select name="brusirna-input" options={transformedSharpeningCompanies} placeholder="Vyberte..." noOptionsMessage={() => "Nenalezeno"} />
                    </span>
                    <span className="w-50">
                        <label>Zákazník</label>
                        <Select
                            name="zakaznik-input"
                            options={transformedCompanies}
                            menuIsOpen={menuIsOpen}
                            onInputChange={(inputValue, { action }) => {
                                setMenuIsOpen(action === 'input-change' && inputValue.trim() !== '');
                            }}
                            onBlur={() => setMenuIsOpen(false)}
                            placeholder="Vyberte..."
                            noOptionsMessage={() => "Nenalezeno"}
                        />
                    </span>
                    <span className="w-50">
                        <label>Nástroj</label>
                        <Select
                            key={selectKey}
                            isClearable={true}
                            name="nastroj-input"
                            options={transformedTools}
                            placeholder="Vyberte..."
                            noOptionsMessage={() => "Nenalezeno"}
                            menuIsOpen={toolMenuIsOpen}
                            onInputChange={(inputValue, { action }) => {
                                setToolMenuIsOpen(action === 'input-change' && inputValue.trim() !== '');
                            }}
                            onBlur={() => setToolMenuIsOpen(false)}
                        />
                    </span>
                    <span className="w-25">
                        <label>Počet</label>
                        <input key={selectKey} name="pocet-input" type="number" className="form-control" min="1" defaultValue="1"/>
                    </span>
                    <div className="d-flex flex-column justify-content-end">
                        <button type="submit" className="btn btn-light">Zapsat</button>
                    </div>
                </form>
            </div>

            <div className="w-75 d-flex flex-row gap-3">
                <Select
                    name="brusirna-state-input"
                    options={transformedSharpeningCompanies}
                    placeholder="Brusírna..."
                    noOptionsMessage={() => "Nenalezeno"}
                    className="w-50"
                />
                <Select
                    name="brusirna-state-input"
                    options={[{label: "zadáno", value: "zadáno"}, {label: "převzato", value: "převzato"}, {label: "nabroušeno", value: "nabroušeno"}]}
                    placeholder="Stav před..."
                    noOptionsMessage={() => "Nenalezeno"}
                    className="w-75"
                />
                <div className="d-flex flex-column justify-content-center">
                    <img src={arrowRight} alt="Submit" width="24" height="24" />
                </div>
                <Select
                    name="brusirna-state-input"
                    options={[{label: "zadáno", value: "zadáno"}, {label: "převzato", value: "převzato"}, {label: "nabroušeno", value: "nabroušeno"}]}
                    placeholder="Stav po..."
                    noOptionsMessage={() => "Nenalezeno"}
                    className="w-75"
                />
                <button className="btn btn-light" onClick={() => {console.log('change-state')}}>
                    <img src={check} alt="Submit" width="24" height="24" />
                </button>
            </div>

            <div>
                {/*<Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat brusírnu ${selectedCompanyName}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />*/}
                {/*<Modal isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={confirmEditModal} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />*/}
                <table className="table table-hover">
                    <thead>
                    <tr>
                        {/*<th><input type="checkbox" className="form-check-input" onChange={(event => {selectAll(event)})} /></th>*/}
                        <th className="cursor-pointer" onClick={() => {sortOrdersByColumn(orders, 'sharpening_id', 'desc')}} >Brusírna</th>
                        <th className="cursor-pointer" onClick={() => {sortOrdersByColumn(orders, 'customer_id', 'desc')}} >Zákazník</th>
                        <th className="cursor-pointer" onClick={() => {sortOrdersByColumn(orders, 'tool_id', 'desc')}} >Nástroj</th>
                        <th>Počet</th>
                        <th className="cursor-pointer" onClick={() => {sortOrdersByColumn(orders, 'id', 'desc')}} >Čas</th>
                        <th>Datum</th>
                        <th className="cursor-pointer" onClick={() => {sortOrdersByColumn(orders, 'status', 'desc')}}>Stav</th>
                        <th className="d-flex flex-row justify-content-end">
                            {/*<button disabled={selectedCompanies.length < 1} className="btn btn-light" onClick={deleteSelected}>*/}
                            {/*    <img src={x} alt="Delete" width="24" height="24" />*/}
                            {/*</button>*/}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((order: TOrder) => (
                        <tr className="cursor-pointer" key={order.id}>
                            {/*<td><input value={company.id} id="row-check" name="row-check" type="checkbox" className="form-check-input" onChange={(event) => {selectThis(event)}} /></td>*/}
                            <td>{sharpeningCompanies.find((company) => company.id === order.sharpening_id)?.name || 'N/A'}</td>
                            <td>{companies.find((company) => company.id === order.customer_id)?.name || 'N/A'}</td>
                            <td>{tools.find((tool) => tool.id === order.tool_id)?.name || 'N/A'}</td>
                            <td>{order.count}</td>
                            <td>{order.time}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td className="d-flex flex-row gap-3 justify-content-end">
                                {/*<button className="btn btn-light" onClick={() => {openEdit(company)}}>*/}
                                {/*    <img src={pencil} alt="Edit" width="24" height="24" />*/}
                                {/*</button>*/}
                                {/*<button className="btn btn-light" onClick={() => {openModal(company.name, company.id)}}>*/}
                                {/*    <img src={x} alt="Delete" width="24" height="24" />*/}
                                {/*</button>*/}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
