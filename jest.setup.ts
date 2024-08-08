import { createConnection, getConnection } from "typeorm";
import { ConnectionOptions } from "typeorm";
import ormconfig from "./ormconfig.test.json";

beforeAll(async () => {
  await createConnection(ormconfig as ConnectionOptions);
});

afterAll(async () => {
  await getConnection().close();
});
