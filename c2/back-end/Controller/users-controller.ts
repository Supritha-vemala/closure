import { usersModel } from "../Model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
async function findUserByuserName(username: string, res: any) {
  try {
    let user: any = await usersModel.findOne({ userName:username });
    if (user) return user;
    else return true;
  } catch (err) {
    res.send(err.message);
  }
}
const registerUser = async (req: any, res: any) => {
  try {
    let addedUser: any;
    let { password, username,email,name } = req.body;
    if ((await findUserByuserName(username, res)) === true) {
      let newUser: any = new usersModel();
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          console.log(err.message);
          return false;
        }
        password = hash;
        newUser = { email: email, password: password ,userName:username,name:name};
        console.log(newUser);
        try{
          addedUser = await usersModel.create(newUser);
          res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(addedUser));
        }
        catch(err){
          res.status(404).send("Failure, username already exists. Try sign in or use different email")
        }
        
      });
    } else {
      res.status(409).end("Failure, username already exists. Try sign in or use different username");
    }
  } catch (error) {
    res.status(406).end(error.message);
  }
};
async function loginUser(req: any, res: any) {
    try {
      let { username, password } = req.body;
      let user = await findUserByuserName(username, res);
      console.log(user)
      if (user) {
        let match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            { userId: user._id },
            `${process.env.JWT_SECRET}`,
            { expiresIn: "1d" }
          );
          res.status(200).json({ token: token,user:user});
        } else {
          res.end("password incorrect");
        }
      } else {
        res.status(404).end("User not not found.Sign up");
      }
    } catch (error) {
      res.status(404).end(error.message);
    }
  }
  

  async function checkAuthoraiztion(req: any, res: any, next: Function) {
    try {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization;
        const decode: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
        const user = await usersModel.findById(decode.userId);
        try {
          if (!user) {
            return res.json({
              success: false,
              message: "Unauthorized Access",
            });
          }
          req.user = user;
          next();
        } catch (error) {
          if (error.name === "JsonWebTokenError") {
            return res.json({
              success: false,
              message: "Unauthorized Access",
            });
          }
          if (error.name === "TokenExpiredError") {
            return res.json({
              success: false,
              message: "Session Expired Please Try Sign in Again",
            });
          }
          return res.json({
            success: false,
            message: "Couldnt Sign In Try Again",
          });
        }
      }
    } catch (err) {
      console.log("Error in Authorization ", err.message);
      return res.json({ success: false, message: "Invalid token" });
    }
  }
  

export { loginUser, registerUser ,checkAuthoraiztion};
