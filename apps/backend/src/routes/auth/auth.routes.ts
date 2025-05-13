import { Router } from "express";
import { signupRouter } from "./signup.routes";
import { signinRouter } from "./signin.routes";
import { logoutRouter } from "./logout.routes";

export const authRouter: Router = Router();

authRouter.use("/signup", signupRouter);
authRouter.use("/signin", signinRouter);
authRouter.use("/logout", logoutRouter);
