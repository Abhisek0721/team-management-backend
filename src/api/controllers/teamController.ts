import { Request, Response } from "express";
import User from "../models/userModel";
import Team from "../models/teamModel";
import TeamModelInterface from "../interfaces/teamModelInterface";

class TeamController {
  //API : /api/team
  //Method : POST
  //Access : Public
  //Description : create new team
  public createTeam = async (req: Request, res: Response) => {
    try {
      const userIds: string[] = req.body.userIds;
      const teamName:string = req.body.teamName;

      if (!userIds || !teamName) {
        return res.status(400).json({
          status: false,
          message: "Some fields are missing in payload!",
        });
      }

      const team = new Team({
        teamName: teamName,
        userIds: userIds
      });
      team.save();

      return res.status(200).json({
        status: true,
        message: "Successfully created a team!",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: "Technical Server Error!",
        error: error?.message,
      });
    }
  };

  //API : /api/team/:id
  //Method : DELETE
  //Access : Public
  //Description : delete a team
  public deleteTeam = async (req: Request, res: Response) => {
    try {
      const teamId = req.params.id;

      await Team.deleteOne({
        _id: teamId,
      });

      return res.status(200).json({
        status: true,
        message: "Successfully deleted a team!",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: "Technical Server Error!",
        error: error?.message,
      });
    }
  };

  //API : /api/team/:id
  //Method : GET
  //Access : Public
  //Description : get a team data
  public getTeam = async (req: Request, res: Response) => {
    try {
      const teamId = req.params.id;

      const fetchTeam = await Team.findOne({
        _id: teamId,
      });

      const fetchUser = await User.find({
        _id: { $in: fetchTeam?.userIds }
      });

      const teamData:{
        teamId: string|undefined;
        teamName: string|undefined;
        userData: any
      } = {
        teamId: fetchTeam?._id,
        teamName: fetchTeam?.teamName,
        userData: fetchUser
      };

      return res.status(200).json({
        status: true,
        data: teamData
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: "Technical Server Error!",
        error: error?.message,
      });
    }
  };

  //API : /api/team?skipFrom={number}
  //Method : GET
  //Access : Public
  //Description : get all team data
  public getAllTeam = async (req: Request, res: Response) => {
    try {
      let skipFrom = Number(req.query.skipFrom);

      if (!skipFrom) {
        skipFrom = 0;
      }
      const teamData = await Team.find(
        {},
        {},
        {
          skip: skipFrom,
          limit: 20,
        }
      );

      return res.status(200).json({
        status: true,
        data: teamData,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: "Technical Server Error!",
        error: error?.message,
      });
    }
  };
}

export default new TeamController();
