import { testConn } from "../../../testUtils/testConn";
import { Connection } from "typeorm";
// import { graphql } from "graphql";
import { gCall } from "../../../testUtils/gCall";

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
    // graphql({

    // })
    const result = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstName: "ddddd",
          lastName: "sss",
          email: "johnaaa@ffffff.com",
          password: "111111"
        }
      }
    });
    console.log("result:: ", JSON.stringify(result, undefined, 2));
  }, 30000);
});
