import BaseUser from "./BaseUser";

interface UserRegistration extends BaseUser {
    first_name: string;
    last_name: string;
    password: string;
}

export default UserRegistration;
