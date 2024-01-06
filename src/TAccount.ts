import TCompany from "./TCompany";

type TAccount = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    linked_company: TCompany | null;
};

export default TAccount;
