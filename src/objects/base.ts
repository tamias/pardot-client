import PardotClient from '..';

export default abstract class ObjectsBase {
  abstract readonly objectName: string;
  protected parent: PardotClient;

  constructor(parent: PardotClient) {
    this.parent = parent;
  }
}
