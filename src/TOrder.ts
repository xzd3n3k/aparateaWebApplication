type TOrder = {
    id: number;
    sharpening_id: number;
    customer_id: number;
    tool_id: number;
    count: number;
    date: string;
    time: string;
    status: string;
    note: string;
    sharpening_name?: string;
    tool_name?: string;
    customer_name?: string;
};

export default TOrder;
