import { Request, Response } from "express";

export function healthCheckHandler(req: Request, res: Response) {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
  return;
}
