import { Request, Response } from "express";
import User from "../models/userModel";
import UserModelInterface from "../interfaces/userModelInterface";
import { getUserFilterQuery } from "../../utils/getFilterQueries";

class UserController {
  //API : /api/users
  //Method : POST
  //Access : Public
  //Description : create new user
  public createUser = async (req: Request, res: Response) => {
    try {
      let {
        first_name,
        last_name,
        email,
        available,
        avatar,
        domain,
        gender,
      }: UserModelInterface = req.body;

      if (
        !first_name ||
        !last_name ||
        !email ||
        !available ||
        !domain ||
        !gender
      ) {
        return res
          .status(400)
          .json({
            status: false,
            message: "Some fields are missing in payload!",
          });
      }

      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res
          .status(400)
          .json({ status: false, message: "Email already exist!" });
      }

      let user = new User({
        first_name: first_name,
        last_name: last_name,
        available: available,
        avatar: avatar,
        domain: domain,
        gender: gender,
        email: email.toLowerCase(),
      });
      user.save();

      return res.status(200).json({
        status: true,
        message: "Successfully created account!",
      });
    } catch (error:any) {
      return res.status(500).json({
        status: false,
        message: "Technical Server Error!",
        error: error?.message
      });
    }
  };

    //API : /api/users/:id
    //Method : GET
    //Access : Public
    //Description : get specific user
    getUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const userData = await User.findById(userId);
            return res.status(200).json({
                status: true,
                data: userData
            });
        } catch (error:any) {
            return res.status(500).json({
                status: false,
                message: "Technical Server Error!",
                error: error?.message
              });
        }
    }

    //API : /api/users?skipFrom={number}
    //Method : GET
    //Access : Public
    //Description : get all users with pagination
    getAllUsers = async (req: Request, res: Response) => {
        try {
            let skipFrom = Number(req.query.skipFrom);
            if(!skipFrom){
                skipFrom = 0;
            }

            const userData = await User.find(
                {},
                {},
                {
                    skip: skipFrom,
                    limit: 20
                }
            );

            const totalUsers = await User.countDocuments({});

            return res.status(200).json({
                status: true,
                totalUsers: totalUsers,
                data: userData
            });
        } catch (error:any) {
            return res.status(500).json({
                status: false,
                message: "Technical Server Error!",
                error: error?.message
              });
        }
    }

    //API : /api/users/search-user/:username
    //Method : GET
    //Access : Public
    //Description : get user by its name
    searchUser = async (req:Request, res:Response) => {
      try {
        const username = req.params?.username;
        let userData;

        if(!username) {
          return res.status(400).json({
            status: false,
            message: "username query parameter is missing!"
          });
        }

        const regex = new RegExp(username.toString(), "i");
        userData = await User.find(
            {
              $or: [{ first_name: regex }, { last_name: regex }]
            },
            {},
            {
                limit: 20
            }
        );


        return res.status(200).json({
            status: true,
            data: userData
        });
      } catch (error:any) {
        console.log("Hello")
          return res.status(500).json({
              status: false,
              message: "Technical Server Error!",
              error: error?.message
            });
      }
    }


    //API : /api/users/filter-users/:pageNumber?domain={domainName}&gender={male/female}&available={yes/no}
    //Method : GET
    //Access : Public
    //Description : get users data by filters like domain, gender and available
    filterUsers = async (req:Request, res:Response) => {
      try {
        let {domain, gender, available} = req.query;
        const pageNumber = Number(req.params?.pageNumber);

        if(!(domain || gender || available)) {
          return res.status(400).json({
            status: false,
            message: "Query parameters are missing!"
          });
        }

        const queryInput = getUserFilterQuery(gender, domain, available);

        const userData = await User.find(
          queryInput,
          {},
          {
            skip: pageNumber*20,
            limit: 20
          }
        );
        const totalUsers = await User.countDocuments(queryInput);

        return res.status(200).json({
            status: true,
            totalUsers: totalUsers,
            data: userData
        });
      } catch (error:any) {
        console.log("Hello")
          return res.status(500).json({
              status: false,
              message: "Technical Server Error!",
              error: error?.message
            });
      }
    }

    //API : /api/users/:id
    //Method : PUT
    //Access : Public
    //Description : update specific user
    updateUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const {
                first_name,
                last_name,
                email,
                gender,
                avatar,
                domain,
                available
            }:UserModelInterface = req.body;

            await User.updateOne(
                {
                    _id: userId
                },
                {
                    $set: {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        gender: gender,
                        avatar: avatar,
                        domain: domain,
                        available: available
                    }
                }
            );

            return res.status(200).json({
                status: true,
                message: "User data has been updated!"
            });
        } catch (error:any) {
            return res.status(500).json({
                status: false,
                message: "Technical Server Error!",
                error: error?.message
              });
        }
    }


    //API : /api/users/:id
    //Method : DELETE
    //Access : Public
    //Description : delete specific user
    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;

            await User.deleteOne(
                {
                    _id: userId
                }
            );

            return res.status(200).json({
                status: true,
                message: "User data has been deleted!"
            });
        } catch (error:any) {
            return res.status(500).json({
                status: false,
                message: "Technical Server Error!",
                error: error?.message
              });
        }
    }
}

export default new UserController();
