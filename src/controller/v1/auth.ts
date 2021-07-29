import { Request, Response, NextFunction } from "express";
import { IOtp, IUser } from "../../interfaces/auth";
import { User } from "../../models/user";
import { AuthToken } from "../../models/auth-token";
import jwt from "jsonwebtoken";
import { MobileNoCheckUtils } from '../../utils'

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobileNo } = req.body
      const checkMobileNo = await MobileNoCheckUtils.verify(mobileNo)
      console.log(`checkMobileNo`, checkMobileNo)
      if (!checkMobileNo) throw new Error("mobile number is not valid")
      const payload: IUser = {
        ...req.body,
      };


      const user = new User(payload);
      await user.save();
      req.body.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await User.findOne({ mobileNo: req.body.mobileNo });
      req.body.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async generateOtp(req: Request, res: Response) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const requestedUser = req.body.user;
      const user = await User.findOne({ mobileNo: requestedUser._id });
      let payload: IOtp = {
        otp: otp,
        user: user ? user._id : requestedUser._id,
      };


      const token = new AuthToken(payload);
      await token.save();
      return res.status(200).json({ success: true, data: token });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      let auth_token: any = await AuthToken.findOne({
        otp: req.body.otp,
      });

      if (auth_token) {
        let user: any = await User.findOne({ _id: auth_token.user });
        let token = jwt.sign(
          { _id: user.id, mobileNo: user.mobileNo },
          "secret",
          { expiresIn: "1d" }
        );
        await auth_token.remove();
        return res.status(200).json({ success: true, data: { token, user } });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Token expired!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

const controller = new AuthController();

export default AuthController;
