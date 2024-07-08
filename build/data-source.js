"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    entities: [User_1.User, Organisation_1.Organisation],
    migrations: [],
    subscribers: [],
    ssl: true,
});
//# sourceMappingURL=data-source.js.map