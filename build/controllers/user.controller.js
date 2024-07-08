"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../data-source");
var Organisation_1 = require("../entity/Organisation");
var User_1 = require("../entity/User");
var sha1_1 = __importDefault(require("sha1"));
var jwt = __importStar(require("jsonwebtoken"));
var uuid_1 = require("uuid");
var zod_1 = require("zod");
var secretKey = process.env["secretKey"];
exports.registerUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, phone, userSchema, validationErrors, existingUser, newUser, newOrganisation, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, phone = _a.phone;
                console.log(req.body);
                userSchema = zod_1.z.object({
                    firstName: zod_1.z.string({
                        required_error: "firstName is required",
                        invalid_type_error: "firstName must be a string",
                    }),
                    lastName: zod_1.z.string({
                        required_error: "lastName is required",
                        invalid_type_error: "lastName must be a string",
                    }),
                    email: zod_1.z.string({
                        required_error: "email is required",
                        invalid_type_error: "email must be a string",
                    }),
                    password: zod_1.z.string({
                        required_error: "email is required",
                        invalid_type_error: "email must be a string",
                    }),
                    phone: zod_1.z.optional(zod_1.z.string({ invalid_type_error: "phone must be a number" })),
                });
                try {
                    userSchema.parse(req.body);
                }
                catch (error) {
                    validationErrors = error.issues.map(function (issue) {
                        return { field: issue.path[0], message: issue.message };
                    });
                    console.log(validationErrors);
                    res.statusCode = 422;
                    return [2 /*return*/, res.json({ errors: validationErrors }).status(422)];
                }
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(User_1.User).findOne({
                        where: {
                            email: email,
                        },
                    })];
            case 1:
                existingUser = _b.sent();
                console.log(existingUser);
                if (existingUser) {
                    throw new Error();
                }
                newUser = new User_1.User();
                newUser.userId = uuid_1.v4();
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.phone = phone;
                newUser.email = email;
                newUser.password = sha1_1.default(password);
                newOrganisation = new Organisation_1.Organisation();
                newOrganisation.orgId = uuid_1.v4();
                newOrganisation.name = firstName + "'s organisation";
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(newOrganisation)];
            case 2:
                _b.sent();
                newUser.organisation = [newOrganisation];
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(newUser)];
            case 3:
                newUser = _b.sent();
                if (newUser) {
                    token = jwt.sign({ userId: newUser.userId, email: newUser.email }, secretKey, { expiresIn: "1h" });
                    res.statusCode = 200;
                    return [2 /*return*/, res
                            .json({
                            status: "success",
                            message: "Registration successful",
                            data: {
                                accessToken: token,
                                user: {
                                    userId: newUser.userId,
                                    firstName: newUser.firstName,
                                    lastName: newUser.lastName,
                                    email: newUser.email,
                                    phone: newUser.phone,
                                },
                            },
                        })
                            .status(200)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.statusCode = 400;
                return [2 /*return*/, res
                        .json({
                        status: "Bad request",
                        message: "Registration unsuccessful",
                        statusCode: 400,
                    })
                        .status(400)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, loginSchema, validationErrors, user, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                loginSchema = zod_1.z.object({
                    email: zod_1.z.string({
                        required_error: "email is required",
                        invalid_type_error: "email must be a string",
                    }),
                    password: zod_1.z.string({
                        required_error: "email is required",
                        invalid_type_error: "email must be a string",
                    }),
                });
                try {
                    loginSchema.parse(req.body);
                }
                catch (error) {
                    console.log(error.issues);
                    console.log(error.issues.map(function (issue) {
                        return { field: issue.path[0], message: issue.message };
                    }));
                    validationErrors = error.issues.map(function (issue) {
                        return { field: issue.path[0], message: issue.message };
                    });
                    res.statusCode = 422;
                    return [2 /*return*/, res.json({ errors: validationErrors }).status(422)];
                }
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(User_1.User).findOne({
                        where: {
                            email: email,
                            password: sha1_1.default(password),
                        },
                    })];
            case 1:
                user = _b.sent();
                if (user) {
                    token = jwt.sign({ userId: user.userId, email: user.email }, secretKey, { expiresIn: "1h" });
                    return [2 /*return*/, res
                            .json({
                            status: "success",
                            message: "Login successful",
                            data: {
                                accessToken: token,
                                user: {
                                    userId: user.userId,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    phone: user.phone,
                                },
                            },
                        })
                            .status(200)];
                }
                else {
                    throw new Error();
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.json({
                        status: "Bad request",
                        message: "Authentication Failed",
                        statusCode: 401,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = (req.params || req["userid"]).id;
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(User_1.User).findOne({
                        where: {
                            userId: id,
                        },
                    })];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res
                            .json({
                            status: "success",
                            message: "user info gotten successfullly",
                            user: {
                                userId: user.userId,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phone: user.phone,
                            },
                        })
                            .status(200)];
                }
                else {
                    throw new Error();
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.statusCode = 404;
                return [2 /*return*/, res
                        .json({
                        status: "failed",
                        message: "Error getting user info",
                        statusCode: 404,
                    })
                        .status(404)];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=user.controller.js.map