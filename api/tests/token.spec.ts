import { expect } from "chai";
import * as jwt from "jsonwebtoken";
import { user } from "../entity/User"; // Adjust the import path according to your project structure
import { it } from "mocha";

const secretKey = "your-secret-key";

describe("Token Generation", () => {
  it("should generate a token with the correct expiration time and user details", () => {
    const user: user = {
      userId: "b3a17885-412b-4a9a-b527-706df380243b",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "securepassword",
      phone: "123-456-7890",
      organisation: [],
    };

    const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
    const decoded = jwt.verify(token, secretKey) as user & { exp: number };

    expect(decoded.userId).to.equal(user.userId);
    expect(decoded.email).to.equal(user.email);
    expect(decoded.firstName).to.equal(user.firstName);
    expect(decoded.lastName).to.equal(user.lastName);
    const expiresIn = 3600; // Example expiration time
    const expectedExp = Math.floor(Date.now() / 1000) + expiresIn;
    expect(decoded.exp).to.be.closeTo(expectedExp, 5); // Allow a 5-second margin of error
  });
});
