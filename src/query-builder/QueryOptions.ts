import { Session } from "@inrupt/solid-client-authn-browser";

export class QueryOptions {
  baseIRI?: string;
  session?: Session;
  condition?: any;
}
