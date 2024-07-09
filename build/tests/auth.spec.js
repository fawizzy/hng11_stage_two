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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var node_fetch_1 = __importDefault(require("node-fetch"));
var url = "http://localhost:3000";
describe("POST /auth/register", function () {
    it("should register user successfully", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, options;
        return __generator(this, function (_a) {
            data = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "securepassword",
                phone: "123-456-7890",
            };
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            (0, node_fetch_1.default)(url + "/auth/register", options).then(function (res) {
                (0, chai_1.expect)(res.status).to.equal(201);
                (0, chai_1.expect)(res.body.status).to.equal("success");
                (0, chai_1.expect)(res.body.message).to.equal("User registered successfully");
                (0, chai_1.expect)(res.body.data.user.firstName).to.equal("John");
                (0, chai_1.expect)(res.body.data.user.lastName).to.equal("Doe");
                (0, chai_1.expect)(res.body.data.user.email).to.equal("fawaz.doe@example.com");
                (0, chai_1.expect)(res.body.data.accessToken).to.be.a("string");
            });
            return [2 /*return*/];
        });
    }); });
    it("should log the user in successfully", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, options;
        return __generator(this, function (_a) {
            data = {
                email: "john.doe@example.com",
                password: "securepassword",
            };
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            (0, node_fetch_1.default)(url + "/auth/register", options).then(function (res) {
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body.status).to.equal("success");
                (0, chai_1.expect)(res.body.message).to.equal("Login successful");
                (0, chai_1.expect)(res.body.data.user.firstName).to.equal("John");
                (0, chai_1.expect)(res.body.data.user.lastName).to.equal("Doe");
                (0, chai_1.expect)(res.body.data.user.email).to.equal("john.doe@example.com");
                (0, chai_1.expect)(res.body.data.accessToken).to.be.a("string");
            });
            return [2 /*return*/];
        });
    }); });
    it("should fail if required fields are missing", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, options;
        return __generator(this, function (_a) {
            data = {
                firstName: "John",
                lastName: "Doe",
                email: "mayowa.doe@example.com",
                password: "securepassword",
                phone: "123-456-7890",
            };
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            (0, node_fetch_1.default)(url + "/auth/register", options).then(function (res) {
                (0, chai_1.expect)(res.status).to.equal(422);
                (0, chai_1.expect)(res.body.status).to.equal("error");
                (0, chai_1.expect)(res.body.message).to.include("firstName is required");
            });
            return [2 /*return*/];
        });
    }); });
    it("should fail if there’s a duplicate email or userId", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, options;
        return __generator(this, function (_a) {
            data = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "securepassword",
                phone: "123-456-7890",
            };
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            (0, node_fetch_1.default)(url + "/auth/register", options).then(function (res) {
                (0, chai_1.expect)(res.status).to.equal(422);
                (0, chai_1.expect)(res.body.status).to.equal("error");
                (0, chai_1.expect)(res.body.message).to.include("Email already in use");
            });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=auth.spec.js.map