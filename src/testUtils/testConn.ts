import { createConnection } from "typeorm";

export const testConn = (dropped: boolean = false) => {
  console.log("dropped:: ", dropped);
  return createConnection({
    name: "default",
    type: "postgres",
    host: "ec2-54-225-121-235.compute-1.amazonaws.com",
    port: 5432,
    username: "ukxqtqvkvfhzkp",
    password:
      "e631c7e4fc05743341dd4a2187f200f2b66bf3293b1cd74e9ec800e267144de4",
    database: "d78jf31mr5d2u7",
    synchronize: true,
    dropSchema: true,
    extra: {
      ssl: true
    },
    entities: [__dirname + "/../entity/*.*"]
  });
};
