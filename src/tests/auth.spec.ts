import request from "supertest";
import { expect } from "chai";
import app from "../index";
import { User } from "../entity/User";
import { Organisation } from "../entity/Organisation";
import fetch from "node-fetch";

const url = "http://localhost:3000";
describe("POST /auth/register", () => {
  it("should register user successfully", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "securepassword",
      phone: "123-456-7890",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url + "/auth/register", options).then((res: { status; body }) => {
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal("success");
      expect(res.body.message).to.equal("User registered successfully");
      expect(res.body.data.user.firstName).to.equal("John");
      expect(res.body.data.user.lastName).to.equal("Doe");
      expect(res.body.data.user.email).to.equal("fawaz.doe@example.com");
      expect(res.body.data.accessToken).to.be.a("string");
    });
  });

  it("should log the user in successfully", async () => {
    const data = {
      email: "john.doe@example.com",
      password: "securepassword",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url + "/auth/register", options).then(
      (res: { status: any; body: any }) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal("Login successful");
        expect(res.body.data.user.firstName).to.equal("John");
        expect(res.body.data.user.lastName).to.equal("Doe");
        expect(res.body.data.user.email).to.equal("john.doe@example.com");
        expect(res.body.data.accessToken).to.be.a("string");
      }
    );
  });

  it("should fail if required fields are missing", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "mayowa.doe@example.com",
      password: "securepassword",
      phone: "123-456-7890",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url + "/auth/register", options).then((res: { status; body }) => {
      expect(res.status).to.equal(422);
      expect(res.body.status).to.equal("error");
      expect(res.body.message).to.include("firstName is required");
    });
  });

  it("should fail if there’s a duplicate email or userId", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "securepassword",
      phone: "123-456-7890",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url + "/auth/register", options).then((res: { status; body }) => {
      expect(res.status).to.equal(422);
      expect(res.body.status).to.equal("error");
      expect(res.body.message).to.include("Email already in use");
    });
  });
});
