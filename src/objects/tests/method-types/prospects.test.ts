import { expectType, TypeEqual } from 'ts-expect';
import { onGetSpy, onPostSpy, pardot } from '../lib/setup';
import { OutputParamsFull, OutputParamsMobile, OutputParamsSimple } from '../../types';
import Prospects, {
  ProspectQueryResponseMobile,
  ProspectQueryResponseSimple,
  ProspectResponseFull,
  ProspectResponseMobile,
  ProspectResponseSimple,
} from '../../prospects';

describe('Prospects', () => {
  beforeAll(() => {
    onGetSpy.mockResolvedValue({});
    onPostSpy.mockResolvedValue({});
  });

  const prospects = new Prospects(pardot);

  const outputMobile: OutputParamsMobile = { output: 'mobile' };
  const outputSimple: OutputParamsSimple = { output: 'simple' };
  const outputFull: OutputParamsFull = { output: 'full' };

  describe('query', () => {
    it('should return mobile format for output=mobile', () => {
      const response = prospects.query(outputMobile);

      expectType<TypeEqual<Promise<ProspectQueryResponseMobile>, typeof response>>(true);
    });

    it('should return simple format for output=simple', () => {
      const response = prospects.query(outputSimple);

      expectType<TypeEqual<Promise<ProspectQueryResponseSimple>, typeof response>>(true);
    });

    it('should return simple format for output=full', () => {
      const response = prospects.query(outputFull);

      expectType<TypeEqual<Promise<ProspectQueryResponseSimple>, typeof response>>(true);
    });
  });

  describe('create', () => {
    const email = 'prospect1@example.com';
    const create = {
      first_name: 'First',
      last_name: 'Last',
    };

    it('should return mobile format for output=mobile', () => {
      const response = prospects.create(email, create, outputMobile);

      expectType<TypeEqual<Promise<ProspectResponseMobile>, typeof response>>(true);
    });

    it('should return simple format for output=simple', () => {
      const response = prospects.create(email, create, outputSimple);

      expectType<TypeEqual<Promise<ProspectResponseSimple>, typeof response>>(true);
    });

    it('should return full format for output=full', () => {
      const response = prospects.create(email, create, outputFull);

      expectType<TypeEqual<Promise<ProspectResponseFull>, typeof response>>(true);
    });
  });

  describe('readByEmail', () => {
    const email = 'prospect@email.com';

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.readByEmail(email, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.readByEmail(email, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.readByEmail(email, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('readById', () => {
    const id = 1;

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.readById(id, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.readById(id, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.readById(id, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('readByFid', () => {
    const fid = 11;

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.readByFid(fid, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.readByFid(fid, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.readByFid(fid, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('updateById', () => {
    const id = 1;
    const update = {
      company: 'Company',
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.updateById(id, update, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.updateById(id, update, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.updateById(id, update, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('updateByFid', () => {
    const fid = 11;
    const update = {
      company: 'Company',
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.updateByFid(fid, update, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.updateByFid(fid, update, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.updateByFid(fid, update, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('upsertById', () => {
    const id = 1;
    const data = {
      company: 'Company',
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.upsertById(id, data, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.upsertById(id, data, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.upsertById(id, data, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('upsertByFid', () => {
    const fid = 11;
    const data = {
      company: 'Company',
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.upsertByFid(fid, data, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.upsertByFid(fid, data, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.upsertByFid(fid, data, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('upsertByEmail', () => {
    const email = 'prospect@email.com';
    const data = {
      company: 'Company',
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.upsertByEmail(email, data, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.upsertByEmail(email, data, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.upsertByEmail(email, data, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('assignById', () => {
    const id = 1;
    const params = {
      user_id: 101,
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.assignById(id, { ...outputMobile, ...params });

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.assignById(id, { ...outputSimple, ...params });

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.assignById(id, { ...outputFull, ...params });

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('assignByFid', () => {
    const fid = 11;
    const params = {
      user_email: 'user@example.com',
    };

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.assignByFid(fid, { ...outputMobile, ...params });

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.assignByFid(fid, { ...outputSimple, ...params });

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.assignByFid(fid, { ...outputFull, ...params });

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('unassignById', () => {
    const id = 1;

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.unassignById(id, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.unassignById(id, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.unassignById(id, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });

  describe('unassignByFid', () => {
    const fid = 11;

    it('should return mobile format for output=mobile', async () => {
      const response = await prospects.unassignByFid(fid, outputMobile);

      expectType<TypeEqual<ProspectResponseMobile, typeof response>>(true);
    });

    it('should return simple format for output=simple', async () => {
      const response = await prospects.unassignByFid(fid, outputSimple);

      expectType<TypeEqual<ProspectResponseSimple, typeof response>>(true);
    });

    it('should return full format for output=full', async () => {
      const response = await prospects.unassignByFid(fid, outputFull);

      expectType<TypeEqual<ProspectResponseFull, typeof response>>(true);
    });
  });
});
