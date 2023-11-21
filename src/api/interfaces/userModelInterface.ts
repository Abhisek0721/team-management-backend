import { Document } from "mongoose";

interface UserModelInterface extends Document {
    first_name: string;
    last_name: string;
    email: string;
    gender: "Male" | "Female";
    avatar: string;
    domain: string;
    available: boolean|string;
}

export default UserModelInterface;