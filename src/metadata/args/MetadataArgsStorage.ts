import { PredicateMetaDataArgs } from "./PredicateMetadataArgs";
import { SubjectMetaDataArgs } from "./SubjectMetadataArgs";

export class MetadataArgsStorage {
  predicates: PredicateMetaDataArgs[] = [];
  subjects: SubjectMetaDataArgs[] = [];
}
