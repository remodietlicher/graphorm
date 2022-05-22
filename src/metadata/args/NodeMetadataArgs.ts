import { NodeOptions } from "../../decorator/options/NodeOptions";

export class NodeMetadataArgs {
  readonly rdfObject: string;
  readonly target: Function;
  readonly options: NodeOptions | undefined;
}
