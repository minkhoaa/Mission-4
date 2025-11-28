import { FileModel } from "../schemas/file";

export const FileService = {
  async saveFile(file: Express.Multer.File) {
    const doc = await FileModel.create({
      path: file.path,
      type: file.mimetype,
    });
    return doc;
  },

  async findById(id: string) {
    return await FileModel.findById({ id: id }).exec();
  },
};
