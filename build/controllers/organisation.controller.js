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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserOrganisation = exports.createOrganisation = exports.getOrganisationById = exports.getUserOrganisation = void 0;
var data_source_1 = require("../data-source");
var Organisation_1 = require("../entity/Organisation");
var User_1 = require("../entity/User");
var uuid_1 = require("uuid");
var zod_1 = require("zod");
var getUserOrganisation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userRepository, findUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req["userId"];
                if (!userId) {
                    throw new Error();
                }
                userRepository = data_source_1.AppDataSource.getRepository(User_1.user);
                return [4 /*yield*/, userRepository.findOne({
                        relations: {
                            organisation: true,
                        },
                        where: {
                            userId: userId,
                        },
                    })];
            case 1:
                findUser = _a.sent();
                return [2 /*return*/, res.json({
                        status: "success",
                        message: "<message>",
                        data: {
                            organisations: findUser.organisation,
                        },
                    })];
            case 2:
                error_1 = _a.sent();
                res.json({
                    status: "Bad Request",
                    message: "Client error",
                    statusCode: 400,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserOrganisation = getUserOrganisation;
var getOrganisationById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orgId_1, userId, userRepository, findUser, organisation_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orgId_1 = req.params.orgId;
                userId = req["userId"];
                if (!userId) {
                    throw new Error();
                }
                userRepository = data_source_1.AppDataSource.getRepository(User_1.user);
                return [4 /*yield*/, userRepository.findOne({
                        relations: {
                            organisation: true,
                        },
                        where: {
                            userId: userId,
                        },
                    })];
            case 1:
                findUser = _a.sent();
                if (!User_1.user) {
                    throw new Error();
                }
                organisation_1 = findUser.organisation.find(function (org) { return org.orgId === orgId_1; });
                if (organisation_1) {
                    res.statusCode = 200;
                    return [2 /*return*/, res
                            .json({
                            status: "success",
                            message: "Organisation info gotten successfully",
                            data: organisation_1,
                        })
                            .status(200)];
                }
                else {
                    throw new Error();
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.json({
                    status: "Bad Request",
                    message: "Client error",
                    statusCode: 400,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrganisationById = getOrganisationById;
var createOrganisation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, organisationSchema, validationErrors, userId, userRepository, findUser, newOrganisation, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name = _a.name, description = _a.description;
                organisationSchema = zod_1.z.object({
                    name: zod_1.z.string({
                        required_error: "name is required",
                        invalid_type_error: "name must be a string",
                    }),
                    description: zod_1.z.optional(zod_1.z.string({
                        invalid_type_error: "description must be a string",
                    })),
                });
                try {
                    organisationSchema.parse(req.body);
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
                userId = req["userId"];
                if (!userId) {
                    throw new Error();
                }
                userRepository = data_source_1.AppDataSource.getRepository(User_1.user);
                return [4 /*yield*/, userRepository.findOne({
                        relations: {
                            organisation: true,
                        },
                        where: {
                            userId: userId,
                        },
                    })];
            case 1:
                findUser = _b.sent();
                if (!User_1.user) {
                    throw new Error();
                }
                newOrganisation = new Organisation_1.organisation();
                newOrganisation.orgId = (0, uuid_1.v4)();
                newOrganisation.name = name;
                newOrganisation.description = description;
                findUser.organisation.push(newOrganisation);
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(newOrganisation)];
            case 2:
                _b.sent();
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(findUser)];
            case 3:
                _b.sent();
                if (newOrganisation) {
                    res.statusCode = 201;
                    return [2 /*return*/, res
                            .json({
                            status: "success",
                            message: "Organisation created successfully",
                            data: newOrganisation,
                        })
                            .status(201)];
                }
                else {
                    throw new Error();
                }
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                res.json({
                    status: "Bad Request",
                    message: "Client error",
                    statusCode: 400,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createOrganisation = createOrganisation;
var addUserOrganisation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orgId, userIdSchema, validationErrors, userRepository, findUser, organisationRepository, findOrganisation, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.body.userId;
                orgId = req.params.orgId;
                userIdSchema = zod_1.z.object({
                    userId: zod_1.z.string({
                        required_error: "userId is required",
                        invalid_type_error: "userId must be a string",
                    }),
                });
                try {
                    userIdSchema.parse(req.body);
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
                    return [2 /*return*/, res.json({ errors: validationErrors })];
                }
                userRepository = data_source_1.AppDataSource.getRepository(User_1.user);
                return [4 /*yield*/, userRepository.findOne({
                        relations: { organisation: true },
                        where: {
                            userId: userId,
                        },
                    })];
            case 1:
                findUser = _a.sent();
                if (!User_1.user) {
                    throw new Error();
                }
                organisationRepository = data_source_1.AppDataSource.getRepository(Organisation_1.organisation);
                return [4 /*yield*/, organisationRepository.findOne({
                        where: {
                            orgId: orgId,
                        },
                    })];
            case 2:
                findOrganisation = _a.sent();
                console.log(findUser.organisation);
                if (!Organisation_1.organisation) {
                    throw new Error();
                }
                findUser.organisation.push(findOrganisation);
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(findUser)];
            case 3:
                _a.sent();
                console.log(User_1.user);
                res.statusCode = 201;
                return [2 /*return*/, res
                        .json({
                        status: "success",
                        message: "User added to organisation successfully",
                    })
                        .status(201)];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                res.statusCode = 400;
                return [2 /*return*/, res.json({
                        status: "Bad Request",
                        message: "Client error",
                        statusCode: 400,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addUserOrganisation = addUserOrganisation;
//# sourceMappingURL=organisation.controller.js.map