import { Connection } from "../connection/Connection";
import { ComunicaQueryRunner } from "../driver/comunica/ComunicaQueryRunner";

export class SubjectManager {
  readonly connection: Connection;

  readonly queryRunner?: ComunicaQueryRunner;

  constructor(connection: Connection) {
    this.connection = connection;
  }
}
