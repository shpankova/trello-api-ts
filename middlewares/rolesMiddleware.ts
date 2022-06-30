import { Request, Response, NextFunction } from "express";

const authPage = (permission: string[]) => {
  return (req: Request,
    res: Response,
    next: NextFunction) => {
    const userRole = req.body.role;
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

export default authPage;
