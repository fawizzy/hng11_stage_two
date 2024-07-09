"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var typeorm_1 = require("typeorm");
var Organisation_1 = require("./Organisation");
var user = /** @class */ (function () {
    function user() {
    }
    __decorate([
        (0, typeorm_1.Column)("uuid", { primary: true }),
        __metadata("design:type", String)
    ], user.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: false }),
        __metadata("design:type", String)
    ], user.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: false }),
        __metadata("design:type", String)
    ], user.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { unique: true, nullable: false }),
        __metadata("design:type", String)
    ], user.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: false }),
        __metadata("design:type", String)
    ], user.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], user.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Organisation_1.organisation; }, function (organisation) { return organisation.users; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], user.prototype, "organisation", void 0);
    user = __decorate([
        (0, typeorm_1.Entity)("user")
    ], user);
    return user;
}());
exports.user = user;
//# sourceMappingURL=User.js.map