import { Document } from "mongoose"

interface TeamModelInterface extends Document {
    teamName?: string;
    userIds?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default TeamModelInterface;