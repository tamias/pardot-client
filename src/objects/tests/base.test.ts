import { pardot } from './lib/setup';
import ObjectsBase from '../base';
import PardotClient from '../../index';

class Objects extends ObjectsBase {
  objectName = 'object';

  public get parentWrapper(): PardotClient {
    return this.parent;
  }
}

describe('ObjectsBase', () => {
  describe('constructor', () => {
    it('should set parent', () => {
      const objects = new Objects(pardot);

      expect(objects.parentWrapper).toBe(pardot);
    });
  });
});
