import { testConn } from "../../../testUtils/testConn";
import { Connection } from "typeorm";
import faker from "faker";
// import { graphql } from "graphql";
import { gCall } from "../../../testUtils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Register", () => {
  it("create user", async () => {
    const registerMutation = `
    mutation Register($data: RegisterInput!){
      register(data: $data) {
        email
        lastName
        firstName
        fullName
        id
      }
    }
`;

    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    // console.log("user:: ", user);
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });
    // console.log("result:: ", JSON.stringify(response, undefined, 2));

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    const userInDb = await User.findOne({ where: { email: user.email } });
    expect(userInDb).toBeDefined();
    expect(userInDb!.confirmed).toBeFalsy();
    expect(userInDb!.firstName).toBe(user.firstName);
    expect(userInDb!.lastName).toBe(user.lastName);
  }, 30000);
});
