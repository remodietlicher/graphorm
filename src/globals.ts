import { MetadataArgsStorage } from "./metadata-args/MetadataArgsStorage";
import { PlatformTools } from "./util/PlatformTools";

export function getMetadataArgsStorage(): MetadataArgsStorage {
  const globalScope = PlatformTools.getGlobalVariable();
  if (!globalScope.sparqlormMetadataArgsStorage)
    globalScope.sparqlormMetadataArgsStorage = new MetadataArgsStorage();

  return globalScope.sparqlormMetadataArgsStorage;
}
