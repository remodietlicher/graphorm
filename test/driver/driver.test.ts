import { Connection } from "../../src/connection/Connection";
import { Person } from "./subject/Person";
import { start } from "molid";

import {
  Session,
  getSessionFromStorage,
} from "@inrupt/solid-client-authn-node";
import {
  getDefaultSession,
  handleIncomingRedirect,
  login,
} from "@inrupt/solid-client-authn-browser";

import path from "path";

describe("Executing a query should produce the correct SPARQL query string", () => {
  let molid;
  beforeAll(async () => {
    const session = new Session();
    await session.login({
      oidcIssuer: "https://solidcommunity.net",
      clientName: "Jest testing sparql-orm",
      handleRedirect: () => {
        console.log("logged in!");
      },
    });

    molid = await start({
      dataDir: path.join(__dirname, "../data/molid"),
    });
  });
  afterAll(async () => {
    await molid.stop();
  });
  it("should produce correct SPARQL syntax for subject class", async () => {
    // const p = new Person();
    const connection = new Connection();

    connection.buildMetadatas();
    connection.createSubjectManager();

    const remo: Person | undefined = await connection.manager.findAll(
      Person,
      {},
      [molid.uri("/profile/card")]
    );

    if (remo) {
      expect(remo.firstName).toBe("Remo");
      expect(remo.lastName).toBe("Dietlicher");
      expect(remo.age).toBe(31);
      // expect(remo instanceof Person).toBe(true); // False, but IDE thinks this works...
    } else {
      expect("remo is undefined").toBe("never");
    }
  });
  it("should produce a correct SPARQL insert data query for subject class", async () => {
    const p = new Person();
    const connection = new Connection();

    connection.buildMetadatas();
    connection.createSubjectManager();

    p.firstName = "Hans";
    p.lastName = "Muster";
    p.age = 89;

    await connection.manager.save(
      p,
      "https://remo.solid.tschenten.ch/profile/card"
    );
    console.log("done");
  });
});
