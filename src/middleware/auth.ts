import { Request, Response, Router, NextFunction } from "express";
import jwt from "jsonwebtoken";

export = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("NO autenticado, no hay JWT");
    res.status(401);
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let checkToken;

  try {
    checkToken = jwt.verify(token, "LLAVE");
  } catch (error) {
    res.status(401);
    throw error;
  }
  if (!checkToken) {
    const error = new Error("No autenticado");
    throw error;
    res.status(401);
  }
  next();
};
