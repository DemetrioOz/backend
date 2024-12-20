import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

const verifyLogin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ auth: false, message: "Erro de identificação" });
    return;
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.status(500).json({ auth: false, message: "Acesso inválido" });
      return;
    }

    if (!decoded || typeof decoded === "string") {
      res.status(500).json({ auth: false, message: "Token inválido" });
      return;
    }

    (req as any).userId = decoded.id;
    next();
  });
};

export default verifyLogin;
