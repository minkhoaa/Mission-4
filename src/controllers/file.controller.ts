import { NextFunction, Request, Response } from "express";
import { FileService } from "../services/file.service";

export const FileController = {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file upload" });
      }
      const saved = await FileService.saveFile(file);
      return res.status(201).json({
        message: "Upload file successfully",
        data: {
          id: saved._id,
          path: saved.path,
          type: saved.type,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
