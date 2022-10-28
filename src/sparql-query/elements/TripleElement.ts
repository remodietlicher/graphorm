import QueryElement from "./QueryElement";
import LeafElement from "./LeafElement";
import { typeToConverter } from "../util/VariableConverter";
import QueryVisitor from "../visitors/QueryVisitor";

interface TripleElementOptions {
  subjectType?: string;
  predicateType?: string;
  objectType?: string;
}

export default class TripleElement extends LeafElement implements QueryElement {
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
    options?: TripleElementOptions
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

  acceptToString(visitor: QueryVisitor): string {
    return visitor.visitTriple(this);
  }
}
