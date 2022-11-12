export abstract class AbstractBuilder {
  public data;
  constructor() {
    this.reset();
  }
  abstract reset();
  getResult() {
    return this.data;
  }
}
