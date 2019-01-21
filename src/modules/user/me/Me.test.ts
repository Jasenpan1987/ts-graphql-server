import { testConn } from "../../../testUtils/testConn";
import { Connection } from "typeorm";
import faker from "faker";
import { gCall } from "../../../testUtils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Me", () => {
  const meQuery = `
      query {
        me {
          id
          firstName
          lastName
          email
        }
      }
    `;
  it("get current user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    console.log("user: ", user);

    const response = await gCall({
      source: meQuery,
      userId: `${user.id}`
    });

    console.log("response: ", response);

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  }, 30000);

  it("returns null", async () => {
    const response = await gCall({
      source: meQuery
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  }, 30000);
});
