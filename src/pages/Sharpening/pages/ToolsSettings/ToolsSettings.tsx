import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import api from "../../../../api";
import TTool from "../../../../TTool";
import {Modal} from "../../../../components";
import {pencil, x} from "../../../../images";
import {toast} from "react-toastify";

interface IProps {
    updateRecords: boolean;
}

export default function ToolsSettings({updateRecords}: IProps): ReactElement {

    const [tools, setTools] = useState(Array<TTool>);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedTools, setSelectedTools] = useState<number[]>([]);
    const [selectedTool, setSelectedTool] = useState<TTool>();
    const [selectedToolName, setSelectedToolName] = useState<string>('');
    const [selectedToolId, setSelectedToolId] = useState(0);

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(-1);
    const [discount, setDiscount] = useState<number>(-1);
    const [note, setNote] = useState<string>('');

    const fetchData = async () => {
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
        fetchData();
    }, [updateRecords])

    const openModal = (toolName: string, toolId: number) => {
        setShowModal(true);
        setSelectedToolName(toolName);
        setSelectedToolId(toolId);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedToolName('');
    };

    const confirmModal = () => {
        deleteTool(selectedToolId);
        toast.success(`Nástroj ${selectedToolName} úspěšně smazán`);
        setShowModal(false);
        setSelectedToolName('');
        setSelectedToolId(0);
    };

    const openEdit = (tool: TTool) => {
        setSelectedTool(tool);
        setName(tool.name);

        if (tool.note === null) {
            setNote('');
        } else {
            setNote(tool.note);
        }

        if (tool.price === null) {
            setPrice(-1);
            setDiscount(-1);
        } else {
            setPrice(tool.price);
            if (tool.discount === null) {
                setDiscount(-1);
            } else {
                setDiscount(tool.discount);
            }
        }

        setShowEditModal(true);
    };

    const closeEditModal = () => {
        const formVar: HTMLFormElement = document.getElementById('edit-tool-form') as HTMLFormElement;
        formVar.reset();
        setShowEditModal(false);
    }

    const confirmEditModal = () => {
        if  (selectedTool) {
            editTool(selectedTool.id);
            const formVar: HTMLFormElement = document.getElementById('edit-tool-form') as HTMLFormElement;
            formVar.reset();
            setShowEditModal(false);
            setSelectedTool(undefined);
            setName('');
            setPrice(-1);
            setDiscount(-1);
            setNote('');
        }
    }

    const deleteTool = async (id: number) => {
        try {
            const response = await fetch(`${api}/deleteTool?identificator=${id}`, {
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
            console.error('Error deleting tool:', error);
        }
    };

    const deleteSelected = async () => {

        try {
            const response = await fetch(`${api}/deleteTools`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedTools)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/sharpening/login";
                }
                return;
            } else {
                setSelectedTools([]);
                toast.success('Vybrané nástroje byly úspěšně smazány');
            }

            fetchData();

        } catch (error) {
            console.error('Error deleting tools:', error);
        }
    };

    const editTool = async (id: number) => {
        try {
            const response = await fetch(`${api}/editTool?identificator=${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "price": price,
                    "discount": discount,
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
                    toast.error("Tento nástroj již existuje!")
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
                    toast.error("Tento nástroj již existuje!")
                } else {
                    toast.error(`Server odpověděl kódem: ${result.status_code}. Kontaktujte administrátora pro více informací.`);
                }
            } else {
                toast.success(`Změny uloženy`);
            }

            fetchData();

        } catch (error) {
            console.error('Error editing tool:', error);
        }
    };

    const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.checked) {
            setSelectedTools(tools.map(tool => tool.id));
        } else {
            setSelectedTools([]);
        }

        const checkboxes: NodeListOf<HTMLInputElement> | null = document.getElementsByName('row-check') as NodeListOf<HTMLInputElement>;
        if(checkboxes) {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = event.target.checked;
            })
        }
    }


    const selectThis = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTools((prevState) => {
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

    function handlePriceInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setPrice(-1);
        } else if (Number(event.target.value) < 0) {
            event.target.value = "0";
        } else {
            setPrice(Number(event.target.value));
        }
    }

    function handleDiscountInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setDiscount(-1);
        } else if (Number(event.target.value) < 0) {
            event.target.value = "0";
        } else {
            setDiscount(Number(event.target.value));
        }
    }

    function handleNoteInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNote(event.target.value);
    }

    const btnBody: ReactNode =
        <form id="edit-tool-form" className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
                <label>Název</label>
                <input defaultValue={selectedTool?.name} onInput={handleNameInput} type="text" className="form-control" placeholder="Název" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Cena</label>
                <input defaultValue={selectedTool?.price} onInput={handlePriceInput} className="form-control" type="number" min={0} placeholder="Cena (volitelné)" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Sleva</label>
                <input defaultValue={selectedTool?.discount} onInput={handleDiscountInput} className="form-control" type="number" min={0} placeholder="Sleva (volitelné)" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label>Poznámka</label>
                <input defaultValue={selectedTool?.note} onInput={handleNoteInput} type="text" className="form-control" placeholder="Poznámka (volitelné)" />
            </div>
        </form>

    return (
        <div>
            <Modal isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title="Smazat" body={<p>{`Opravdu si přejete smazat nástroj: ${selectedToolName}?`}</p>} confirmButtonText="Smazat" buttonColor="btn-danger" />
            <Modal isOpen={showEditModal} handleClose={closeEditModal} handleConfirm={confirmEditModal} title="Upravit" body={btnBody} confirmButtonText="Uložit" buttonColor="btn-primary" />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th><input type="checkbox" className="form-check-input" onChange={(event => {selectAll(event)})} /></th>
                    <th>Název</th>
                    <th>Cena (bez slevy)</th>
                    <th>Sleva</th>
                    <th>Poznámka</th>
                    <th className="d-flex flex-row justify-content-end">
                        <button disabled={tools.length < 1} className="btn btn-light" onClick={deleteSelected}>
                            <img src={x} alt="Delete" width="24" height="24" />
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {tools?.map((tool: TTool) => (
                    <tr className="cursor-pointer" key={tool.id}>
                        <td><input value={tool.id} id="row-check" name="row-check" type="checkbox" className="form-check-input" onChange={(event) => {selectThis(event)}} /></td>
                        <td>{tool.name}</td>
                        <td>{tool.price !== null ? tool.price + " Kč" : null}</td>
                        <td>{tool.discount ? tool.discount + " %" : null}</td>
                        <td>{tool.note}</td>
                        <td className="d-flex flex-row gap-3 justify-content-end">
                            <button className="btn btn-light" onClick={() => {openEdit(tool)}}>
                                <img src={pencil} alt="Edit" width="24" height="24" />
                            </button>
                            <button className="btn btn-light" onClick={() => {openModal(tool.name, tool.id)}}>
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