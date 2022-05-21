import { SubjectMetadata } from "../metadata/SubjectMetadata";
import { ObjectType } from "../util/ObjectType";
import { ComunicaSourceType } from "./comunica/ComunicaSourceType";

export type QueryDriverType = "comunica" | "comunica-solid";

abstract class QueryDriver {
  abstract selectQuery<Subject>(
    subjectClass: ObjectType<Subject>,
    metadata: SubjectMetadata,
    sources: string[] | ComunicaSourceType[]
  );
  abstract insertQuery<Subject>(
    subject: Subject,
    metadata: SubjectMetadata,
    source: string | ComunicaSourceType
  );
}

export default QueryDriver;
