import './OrdersTables.scss';
import React, {ReactElement, useEffect, useRef, useState} from "react";
import api from "../../../../api";
import TOrder from "../../../../TOrder";
import {Modal} from "../../../../components";
import {ReactToPrint} from "react-to-print";
import TSharpeningCompany from "../../../../TSharpeningCompany";
import TTool from "../../../../TTool";

export default function OrdersTables(): ReactElement {

    const [randomKey, setRandomKey] = useState(0);
    const [currentOrders, setCurrentOrders] = useState<TOrder[]>([]);

    const [selectedOrders, setSelectedOrders] = useState<TOrder[][]>([]);
    const [showModal, setShowModal] = useState(false);
    // const [datesList, setDatesList] = useState<string[]>([]);
    // const [companiesList, setCompaniesList] = useState<number[]>([]);

    const dateSet: Set<string> = new Set();
    const companySet: Set<number> = new Set();

    const fetchSharpening = async (id: number) => {
        try {
            const response = await fetch(`${api}/sharpeningCompany?identificator=${id}`, {
                method: 'POST',
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

            const result: TSharpeningCompany = await response.json();

            return result;


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchCompany = async (id: number) => {
        try {
            const response = await fetch(`${api}/company?identificator=${id}`, {
                method: 'POST',
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

            const result: TSharpeningCompany = await response.json();

            return result;


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchTool = async (id: number) => {
        try {
            const response = await fetch(`${api}/tool?identificator=${id}`, {
                method: 'POST',
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

            const result: TTool = await response.json();

            return result;


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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

            const result: TOrder[] = await response.json();

            result.forEach((order) => {

                // fetchSharpening(order.sharpening_id).then(result => {
                //     order.sharpening_name = result?.name;
                //     setRandomKey(prevState => {return prevState+1});
                // });
                fetchSharpening(order.sharpening_id).then(result => {
                    order.sharpening_name = result?.name;

                    fetchTool(order.tool_id).then(result => {
                        order.tool_name = result?.name;

                        fetchCompany(order.customer_id).then(result => {
                            order.customer_name = result?.name;
                            setRandomKey(prevState => {return prevState+1});
                        })
                    })
                });

                // fetchTool(order.tool_id).then(result => {
                //     order.tool_name = result?.name;
                //     setRandomKey(prevState => {return prevState+1});
                // })

                dateSet.add(order.date);
                companySet.add(order.sharpening_id);
            })

            let datesList = Array.from(dateSet);
            let companiesList = Array.from(companySet);
            let sorted: TOrder[][] = [];

            datesList.forEach(datum => {
                companiesList.forEach(brusirna => {
                    let formVec = result.filter(objednavka => objednavka.date === datum && objednavka.sharpening_id === brusirna);
                    if (formVec.length > 0) {
                        sorted.push(formVec);
                    }
                })
            })

            setSelectedOrders(sorted)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [])

    const openModal = (orders: TOrder[]) => {
        setCurrentOrders(orders);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmModal = () => {
        console.log('Confirm modal');
    }

    const ref: any = useRef<HTMLDivElement>();
    const btnBody: React.ReactNode = <div ref={ref}>
        <table key={randomKey} className="table">
            <thead>
            <tr>
                <th>Objednavatel: Aparatea, s.r.o.</th>
                <th>Dodavatel: {currentOrders[0]?.sharpening_name ?? ''}</th>
                <th></th>
                <th></th>
                <th>Datum: {currentOrders[0]?.date}</th>
            </tr>
                <tr>
                    <th>Produkt</th>
                    <th>Počet</th>
                    <th>Datum</th>
                    <th>Čas</th>
                    <th>Poznámka</th>
                </tr>
            </thead>
            <tbody>
                {currentOrders?.map(orderos =>
                        <tr>
                            <td>({orderos.customer_name ?? ''}) {orderos.tool_name ?? ''}</td>
                            <td>{orderos.count}</td>
                            <td>{orderos.date}</td>
                            <td>{orderos.time}</td>
                            <td>{orderos.note}</td>
                        </tr>
                )}
            </tbody>
            </table>

        <div className="print-button">
        <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (
                <button type="button" className="btn btn-primary">Tisk</button>
            )}
        />
        </div>
    </div>

    return (
    <div key={randomKey} className="orders-tables">
        <Modal fullscreen={true} isOpen={showModal} handleClose={closeModal} handleConfirm={confirmModal} title={`${currentOrders[0]?.date} ${currentOrders[0]?.sharpening_name}`} body={btnBody} confirmButtonText="" buttonColor="visually-hidden"  />

            {selectedOrders.map(orders =>
                <div onClick={() => {openModal(orders)}} className="order-link">{orders[0].date} {orders[0].sharpening_name}</div>
            )}
    </div>
    )
}
