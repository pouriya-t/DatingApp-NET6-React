export class PaginatedResponse {
  items = null;
  metaData = null;

  constructor(items, metaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
