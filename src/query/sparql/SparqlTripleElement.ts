import {
  PreconditionFailedHttpError,
  SparqlPatchModesExtractor,
} from "@solid/community-server";
import SparqlElement from "./SparqlElement";
import SparqlLeafElement from "./SparqlLeafElement";
import { typeToConverter } from "./SparqlVariableConverter";
import SparqlVisitor from "./SparqlVisitor";

interface SparqlTripleElementOptions {
  subjectType?: string;
  predicateType?: string;
  objectType?: string;
}

export default class SparqlTripleElement
  extends SparqlLeafElement
  implements SparqlElement
{
  private readonly _subject;
  private readonly _predicate;
  private readonly _object;
  private readonly subjectConverter;
  private readonly predicateConverter;
  private readonly objectConverter;

  constructor(
    subject: string,
    predicate: string,
    object: string,
    options?: SparqlTripleElementOptions
  ) {
    super();
    this._subject = subject;
    this._predicate = predicate;
    this._object = object;
    this.subjectConverter = typeToConverter.get(
      options?.subjectType || "Literal"
    );
    this.predicateConverter = typeToConverter.get(
      options?.predicateType || "Literal"
    );
    this.objectConverter = typeToConverter.get(
      options?.objectType || "Literal"
    );
  }

  getTriple(): string[] {
    return [
      this.subjectConverter(this._subject),
      this.predicateConverter(this._predicate),
      this.objectConverter(this._object),
    ];
  }

  acceptToString(visitor: SparqlVisitor): string {
    return visitor.visitTriple(this);
  }
}
