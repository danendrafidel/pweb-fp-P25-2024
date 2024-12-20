import { Request, Response, Router } from "express";

const router = Router();

// Corrected handler
router.post("/login", (req: Request, res: Response): void => {
  res.send("Login successful"); // Do not return `res.send()`
});

export default router;
