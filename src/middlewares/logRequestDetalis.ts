import { NextFunction, Request, Response } from "express";

export const logRequestDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `Method: ${req.method}, 
    URL: ${req.url}, 
    IP: ${req.ip}, 
    Time: ${new Date().toISOString()}`
  );
  next();
};
