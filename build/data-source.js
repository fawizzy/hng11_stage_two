"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Organisation_1 = require("./entity/Organisation");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env["host"],
    port: 5432,
    username: process.env["username"],
    password: process.env["password"],
    database: process.env["database"],
    synchronize: true,
    logging: false,
    entities: [User_1.user, Organisation_1.organisation],
    migrations: [],
    subscribers: [],
    ssl: true,
});
//# sourceMappingURL=data-source.js.map