import mongoose, { Schema } from "mongoose";
import TeamModelInterface from "../interfaces/teamModelInterface";

const teamSchema: Schema = new Schema<TeamModelInterface>({
  teamName: {
    type: String
  },
  userIds: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Team = mongoose.model<TeamModelInterface>("teams", teamSchema);

export default Team;
