export function getMongoURI(
  host: string,
  port: string,
  databaseName: string,
): string {
  return `mongodb://${host}:${port}/${databaseName}`;
}
