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
exports.organisation = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var organisation = /** @class */ (function () {
    function organisation() {
    }
    __decorate([
        (0, typeorm_1.Column)("uuid", { primary: true }),
        __metadata("design:type", String)
    ], organisation.prototype, "orgId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: false }),
        __metadata("design:type", String)
    ], organisation.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], organisation.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return User_1.user; }, function (user) { return user.organisation; }),
        __metadata("design:type", Array)
    ], organisation.prototype, "users", void 0);
    organisation = __decorate([
        (0, typeorm_1.Entity)("organisation")
    ], organisation);
    return organisation;
}());
exports.organisation = organisation;
//# sourceMappingURL=Organisation.js.map