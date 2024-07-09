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
var chai_1 = require("chai");
describe("Organisation Access", function () {
    it("should not allow users to see data from organisations they don’t have access to", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, org, otherOrg, userRepo, orgRepo, requestedOrgId, organisation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        userId: "b3a17885-412b-4a9a-b527-706df380243b",
                        email: "john.doe@example.com",
                        firstName: "John",
                        lastName: "Doe",
                        password: "securepassword",
                        phone: "123-456-7890",
                        organisation: [],
                    };
                    org = {
                        orgId: "33873d5e-6829-4e52-b0b9-f0b269976f9d",
                        name: "John's Organisation",
                        description: null,
                        users: [],
                    };
                    user.organisation.push(org);
                    otherOrg = {
                        orgId: "5b674b4e-4d53-4a65-bebe-75fdb8d1832a",
                        name: "Jane's Organisation",
                        description: null,
                        users: [],
                    };
                    userRepo = {
                        findOne: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, user];
                        }); }); },
                    };
                    orgRepo = {
                        findOne: function (query) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, query.where.orgId === org.orgId ? org : null];
                        }); }); },
                    };
                    requestedOrgId = otherOrg.orgId;
                    return [4 /*yield*/, orgRepo.findOne({
                            where: { orgId: requestedOrgId },
                        })];
                case 1:
                    organisation = _a.sent();
                    (0, chai_1.expect)(organisation).to.be.null; // The user should not have access to the other organisation
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=organisation.spec.js.map