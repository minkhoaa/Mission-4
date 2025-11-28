import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Express middleware that validates the incoming request using a Zod schema.
 *
 * @param schema - A ZodObject schema that defines the structure of `req.body`, `req.query`, and `req.params`.
 * The schema must be of the form (not necessarily sufficient): `{ body: ZodObject, query: ZodObject, params: ZodObject }`
 *
 * @returns An Express middleware function that validates the request and either:
 * - calls `next()` if the request is valid
 * - returns a 400 response with validation error details if the request is invalid
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   body: z.object({ name: z.string() }),
 *   query: z.object({}),
 *   params: z.object({}),
 * });
 *
 * app.post("/user", validateRequest(schema), handler);
 * ```
 *
 * @remarks
 * - If validation fails, the response will be a JSON object with `message` and `errors` fields.
 * - The `errors` field contains the full `ZodError` object (can be customized for cleaner output).
 * - All three keys (`body`, `query`, `params`) must exist in the schema, even if empty.
 */
export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema) {
        schema.parse({
          params: req.params,
          body: req.body,
          query: req.query
        })
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError;
        return res.status(400).json({
          message: "Validation failed",
          errors: zodErr,
        });
      }
      next(err);
    }
  };
};
