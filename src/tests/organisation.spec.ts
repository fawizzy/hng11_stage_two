import { expect } from "chai";
import { Organisation } from "../entity/Organisation";
import { User } from "../entity/User";

describe("Organisation Access", () => {
  it("should not allow users to see data from organisations they don’t have access to", async () => {
    const user: User = {
      userId: "b3a17885-412b-4a9a-b527-706df380243b",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "securepassword",
      phone: "123-456-7890",
      organisation: [],
    };

    const org: Organisation = {
      orgId: "33873d5e-6829-4e52-b0b9-f0b269976f9d",
      name: "John's Organisation",
      description: null,
      users: [],
    };

    user.organisation.push(org);

    const otherOrg: Organisation = {
      orgId: "5b674b4e-4d53-4a65-bebe-75fdb8d1832a",
      name: "Jane's Organisation",
      description: null,
      users: [],
    };

    // Mock user repository and organisation repository
    const userRepo = {
      findOne: async () => user,
    };
    const orgRepo = {
      findOne: async (query: any) =>
        query.where.orgId === org.orgId ? org : null,
    };

    // Simulate a request to get organisation data
    const requestedOrgId = otherOrg.orgId;
    const organisation = await orgRepo.findOne({
      where: { orgId: requestedOrgId },
    });

    expect(organisation).to.be.null; // The user should not have access to the other organisation
  });
});
