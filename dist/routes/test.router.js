"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController = __importStar(require("../controllers/test.controller"));
const middlewares_1 = require("../middlewares");
const test_schema_1 = require("../schemas/test.schema");
const testRouter = (0, express_1.Router)();
/**
 * @openapi
 * /tests:
 *  post:
 *    summary: Create a new test
 *    description: Creates a new test entry with the provided name.
 *    tags:
 *      - Test
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *               description: The name of the test to create.
 *    responses:
 *      201:
 *        description: Test created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Test'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
testRouter.post('/', (0, middlewares_1.validateRequest)(test_schema_1.createTestInputSchema), testController.createTestHandler);
/**
 * @openapi
 * /tests:
 *   get:
 *     summary: Get all tests
 *     description: Retrieve a list of all tests.
 *     tags:
 *       - Test
 *     responses:
 *       200:
 *         description: A list of tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *       500:
 *         description: Internal server error
 */
testRouter.get('/', testController.getTestsHandler);
exports.default = testRouter;
