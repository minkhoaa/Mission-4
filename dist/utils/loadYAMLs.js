"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllYAMLFromDir = loadAllYAMLFromDir;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
/**
 * Loads and merges all YAML files from a specified directory into a single object.
 *
 * @param dirPath - The relative path to the directory containing YAML files.
 * @returns An object containing the merged contents of all YAML files in the directory.
 *
 * @remarks
 * - Only files with `.yaml` or `.yml` extensions are processed.
 * - If multiple files contain the same keys, later files will overwrite earlier ones.
 * - The function expects the YAML files to be valid and parseable.
 */
function loadAllYAMLFromDir(dirPath) {
    const absolutePath = path_1.default.resolve(process.cwd(), dirPath);
    const yamlFiles = fs_1.default.readdirSync(absolutePath).filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    const merged = {};
    for (const file of yamlFiles) {
        const filePath = path_1.default.join(absolutePath, file);
        const yamlContent = yamljs_1.default.load(filePath);
        Object.assign(merged, yamlContent);
    }
    return merged;
}
