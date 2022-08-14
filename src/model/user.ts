import UserType from "../enum/userType";

class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: UserType;
    userProfile: string;
    phone: number;
}

export default User;