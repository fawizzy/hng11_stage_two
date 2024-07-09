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
var chai_1 = require("chai");
var jwt = __importStar(require("jsonwebtoken"));
var mocha_1 = require("mocha");
var secretKey = "your-secret-key";
describe("Token Generation", function () {
    (0, mocha_1.it)("should generate a token with the correct expiration time and user details", function () {
        var user = {
            userId: "b3a17885-412b-4a9a-b527-706df380243b",
            email: "john.doe@example.com",
            firstName: "John",
            lastName: "Doe",
            password: "securepassword",
            phone: "123-456-7890",
            organisation: [],
        };
        var token = jwt.sign(user, secretKey, { expiresIn: "1h" });
        var decoded = jwt.verify(token, secretKey);
        (0, chai_1.expect)(decoded.userId).to.equal(user.userId);
        (0, chai_1.expect)(decoded.email).to.equal(user.email);
        (0, chai_1.expect)(decoded.firstName).to.equal(user.firstName);
        (0, chai_1.expect)(decoded.lastName).to.equal(user.lastName);
        var expiresIn = 3600; // Example expiration time
        var expectedExp = Math.floor(Date.now() / 1000) + expiresIn;
        (0, chai_1.expect)(decoded.exp).to.be.closeTo(expectedExp, 5); // Allow a 5-second margin of error
    });
});
//# sourceMappingURL=token.spec.js.map