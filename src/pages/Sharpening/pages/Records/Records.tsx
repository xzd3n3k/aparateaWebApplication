import './Records.scss';
import React, {ReactElement, useEffect, useState} from "react";
import Select from 'react-select';
import { gear } from "../../../../images";
import TSharpeningCompany from "../../../../TSharpeningCompany";
import api from "../../../../api";
import TCompany from "../../../../TCompany";
import TTool from "../../../../TTool";


export default function Records(): ReactElement {

    const [sharpeningCompanies, setSharpeningCompanies] = useState(Array<TSharpeningCompany>);
    const [companies, setCompanies] = useState(Array<TCompany>);
    const [tools, setTools] = useState(Array<TTool>);

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const [toolMenuIsOpen, setToolMenuIsOpen] = React.useState(false);
    //const filteredOptions = inputValue.trim() === '' ? staticOptions : options; TODO use this when show eg top first 5 records and when user starts typing show filtered all opts


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
        fetchSharpeningCompanies();
        fetchCompanies();
        fetchTools();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    }
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

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
                        <Select options={transformedSharpeningCompanies} placeholder="Vyberte..." noOptionsMessage={() => "Nenalezeno"} />
                    </span>
                    <span className="w-50">
                        <label>Zákazník</label>
                        <Select options={transformedCompanies}
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
                        <input type="number" className="form-control" min="1" defaultValue="1"/>
                    </span>
                    <div className="d-flex flex-column justify-content-end">
                        <button type="submit" className="btn btn-light">Zapsat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
