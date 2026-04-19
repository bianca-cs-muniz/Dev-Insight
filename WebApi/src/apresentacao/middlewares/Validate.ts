import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: err.issues[0].message || "Erro de validação",
        });
      }
      return res.status(500).json({ error: "Erro interno do servidor durante validação" });
    }
  };
};