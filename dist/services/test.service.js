"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTests = exports.createTest = void 0;
const test_model_1 = require("../models/test.model");
/**
 * Creates a new Test document with the specified title and saves it to the database.
 *
 * @param title - The title of the test to be created.
 * @returns A promise that resolves to the created ITest instance.
 */
const createTest = async (title) => {
    const user = new test_model_1.Test({ title });
    return await user.save();
};
exports.createTest = createTest;
/**
 * Retrieves a list of test from the database.
 *
 * @returns A promise that resolves to an array of `ITest` objects.
 */
const getTests = async () => {
    return await test_model_1.Test.find();
};
exports.getTests = getTests;
