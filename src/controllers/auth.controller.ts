import { Request, Response } from "express";
import { SignupService } from "@/services/auth/signup.service";
import { LoginService } from "@/services/auth/login.service";
import { VerifyEmailService } from "@/services/user/verify-email.service";


export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await SignupService(email, password);

    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message,
    });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await LoginService(email, password);

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(401).json({
      message: err.message,
    });
  }
};



export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const result = await VerifyEmailService(email);

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message,
    });
  }
};