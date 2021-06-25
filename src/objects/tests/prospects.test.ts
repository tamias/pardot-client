import {
  mockAxios,
  onGetSpy,
  onPostSpy,
  onPostSpyV3,
  pardot,
  pardotV3,
  responseAttributes,
} from './lib/setup';
import { OutputParams } from '../types';
import Prospects, {
  BatchResponse,
  CreateProspects,
  CreateProspectsV3,
  ProspectAssignParams,
  ProspectMobile,
  ProspectQueryParams,
  ProspectQueryResponseMobile,
  ProspectResponseMobile,
  UpdateProspects,
  UpdateProspectsV3,
  UpsertProspects,
  UpsertProspectsV3,
} from '../prospects';

describe('Prospects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const prospects = new Prospects(pardot);

  const prospectsV3 = new Prospects(pardotV3);

  const mockProspects: ProspectMobile[] = [
    {
      company: null,
      email: 'prospect1@example.com',
      first_name: 'First',
      id: 1,
      last_name: 'Last',
    },
    {
      company: 'Company',
      email: 'prospect2@example.com',
      first_name: null,
      id: 2,
      last_name: null,
    },
  ];

  const mockProspectsResponse: ProspectQueryResponseMobile = {
    ...responseAttributes,
    result: {
      prospect: mockProspects,
      total_results: 5,
    },
  };

  const mockProspectResponse: ProspectResponseMobile = {
    ...responseAttributes,
    prospect: mockProspects[0],
  };

  const mockBatchResponse: BatchResponse = {
    ...responseAttributes,
    errors: {},
  };

  describe('query', () => {
    it('should make a get request to query prospects', async () => {
      mockAxios.onGet().reply<ProspectQueryResponseMobile>(200, mockProspectsResponse);

      const params: ProspectQueryParams = {
        limit: 2,
        output: 'mobile',
      };

      const response = await prospects.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/prospect/version/4/do/query',
        { params },
      );

      expect(response).toEqual(mockProspectsResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a prospect', async () => {
      const email = 'prospect1@example.com';

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const create = {
        first_name: 'First',
        last_name: 'Last',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.create(email, create, params);

      expect(
        onPostSpy,
      ).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/create/email/${encodeURIComponent(email)}`,
        { ...create, ...params },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('readByEmail', () => {
    it('should make a get request to read a prospect by email', async () => {
      const email = 'prospect@email.com';

      mockAxios.onGet().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.readByEmail(email, params);

      expect(
        onGetSpy,
      ).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/read/email/${encodeURIComponent(email)}`,
        { params },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('readById', () => {
    it('should make a get request to read a prospect by id', async () => {
      const id = 1;

      mockAxios.onGet().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.readById(id, params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/read/id/${id}`,
        {
          params,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('readByFid', () => {
    it('should make a get request to read a prospect by fid', async () => {
      const fid = 11;

      const mockResponse: ProspectResponseMobile = {
        ...responseAttributes,
        prospect: {
          company: null,
          email: 'prospect@email.com',
          first_name: 'First',
          id: 1,
          last_name: 'Last',
        },
      };

      mockAxios.onGet().reply<ProspectResponseMobile>(200, mockResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.readByFid(fid, params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/read/fid/${fid}`,
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('updateByEmail', () => {
    it('should make a post request to update a prospect by email', async () => {
      const email = 'prospect@email.com';

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const update = {
        company: 'Company',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.updateByEmail(email, update, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/update/email/${encodeURIComponent(email)}`,
        {
          ...params,
          ...update,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('updateById', () => {
    it('should make a post request to update a prospect by id', async () => {
      const id = 1;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const update = {
        company: 'Company',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.updateById(id, update, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/update/id/${id}`,
        {
          ...params,
          ...update,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('updateByFid', () => {
    it('should make a post request to update a prospect by fid', async () => {
      const fid = 11;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const update = {
        company: 'Company',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.updateByFid(fid, update, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/update/fid/${fid}`,
        {
          ...params,
          ...update,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('upsertById', () => {
    it('should make a post request to upsert a prospect by id', async () => {
      const id = 1;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const data = {
        company: 'Company',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.upsertById(id, data, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/upsert/id/${id}`,
        {
          ...params,
          ...data,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('upsertByFid', () => {
    it('should make a post request to upsert a prospect by fid', async () => {
      const fid = 11;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const data = {
        company: 'Company',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.upsertByFid(fid, data, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/upsert/fid/${fid}`,
        {
          ...params,
          ...data,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('upsertByEmail', () => {
    it('should make a post request to upsert a prospect by email', async () => {
      const email = 'prospect@email.com';

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const data = {
        company: 'Company',
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.upsertByEmail(email, data, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/upsert/email/${encodeURIComponent(email)}`,
        {
          ...params,
          ...data,
        },
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('assignByEmail', () => {
    it('should make a post request to assign a prospect by email', async () => {
      const email = 'prospect@email.com';

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: ProspectAssignParams = {
        output: 'mobile',
        user_id: 101,
      };

      const response = await prospects.assignByEmail(email, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/assign/email/${encodeURIComponent(email)}`,
        params,
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('assignById', () => {
    it('should make a post request to assign a prospect by id', async () => {
      const id = 1;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: ProspectAssignParams = {
        output: 'mobile',
        user_id: 101,
      };

      const response = await prospects.assignById(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/assign/id/${id}`,
        params,
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('assignByFid', () => {
    it('should make a post request to assign a prospect by fid', async () => {
      const fid = 11;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: ProspectAssignParams = {
        output: 'mobile',
        user_email: 'user@example.com',
      };

      const response = await prospects.assignByFid(fid, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/assign/fid/${fid}`,
        params,
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('unassignByEmail', () => {
    it('should make a post request to unassign a prospect by email', async () => {
      const email = 'prospect@email.com';

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.unassignByEmail(email, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/unassign/email/${encodeURIComponent(
          email,
        )}`,
        params,
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('unassignById', () => {
    it('should make a post request to unassign a prospect by id', async () => {
      const id = 1;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.unassignById(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/unassign/id/${id}`,
        params,
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('unassignByFid', () => {
    it('should make a post request to unassign a prospect by fid', async () => {
      const fid = 11;

      mockAxios.onPost().reply<ProspectResponseMobile>(200, mockProspectResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await prospects.unassignByFid(fid, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/unassign/fid/${fid}`,
        params,
      );

      expect(response).toEqual(mockProspectResponse);
    });
  });

  describe('batchCreate', () => {
    describe('api v4', () => {
      it('should make a post request to create a batch of prospects', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const createProspects: CreateProspects = [
          {
            email: 'prospect1@example.com',
            first_name: 'First',
            last_name: 'Last',
          },
          {
            email: 'prospect2@example.com',
            first_name: 'First',
            last_name: 'Last',
          },
        ];

        const response = await prospects.batchCreate(createProspects);

        expect(onPostSpy).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/4/do/batchCreate`,
          {
            prospects: JSON.stringify({ prospects: createProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });
    });

    describe('api v3', () => {
      it('should make a post request to create a batch of prospects', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const createProspects: CreateProspectsV3 = {
          'prospect1@example.com': {
            first_name: 'First1',
            last_name: 'Last1',
          },
          'prospect2@example.com': {
            first_name: 'First2',
            last_name: 'Last2',
          },
        };

        const response = await prospectsV3.batchCreate(createProspects);

        expect(onPostSpyV3).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/3/do/batchCreate`,
          {
            prospects: JSON.stringify({ prospects: createProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });

      it('should make a post request to create a batch of prospects and convert array input', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const createProspects: CreateProspects = [
          {
            email: 'prospect1@example.com',
            first_name: 'First1',
            last_name: 'Last1',
          },
          {
            email: 'prospect2@example.com',
            first_name: 'First2',
            last_name: 'Last2',
          },
        ];

        const convertedProspects: CreateProspectsV3 = {
          'prospect1@example.com': {
            first_name: 'First1',
            last_name: 'Last1',
          },
          'prospect2@example.com': {
            first_name: 'First2',
            last_name: 'Last2',
          },
        };

        const response = await prospectsV3.batchCreate(createProspects);

        expect(onPostSpyV3).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/3/do/batchCreate`,
          {
            prospects: JSON.stringify({ prospects: convertedProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });

      it('should reject with an error for array input containing a prospect without email', async () => {
        await expect(prospectsV3.batchCreate([{ email: '' }])).rejects.toEqual(
          'Must specify email in each prospect for create',
        );
      });
    });
  });

  describe('batchUpdate', () => {
    describe('api v4', () => {
      it('should make a post request to update a batch of prospects', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const updateProspects: UpdateProspects = [
          {
            email: 'prospect1@example.com',
            first_name: 'First',
            last_name: 'Last',
          },
          {
            email: 'prospect2@example.com',
            first_name: 'First',
            last_name: 'Last',
          },
        ];

        const response = await prospects.batchUpdate(updateProspects);

        expect(onPostSpy).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/4/do/batchUpdate`,
          {
            prospects: JSON.stringify({ prospects: updateProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });
    });

    describe('api v3', () => {
      it('should make a post request to update a batch of prospects', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const updateProspects: UpdateProspectsV3 = {
          '1': {
            email: 'prospect1@example.com',
            first_name: 'First1',
            last_name: 'Last1',
          },
          'prospect2@example.com': {
            first_name: 'First2',
            last_name: 'Last2',
          },
        };

        const response = await prospectsV3.batchUpdate(updateProspects);

        expect(onPostSpyV3).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/3/do/batchUpdate`,
          {
            prospects: JSON.stringify({ prospects: updateProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });

      it('should make a post request to update a batch of prospects and convert array input', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const updateProspects: UpdateProspects = [
          {
            email: 'prospect1@example.com',
            first_name: 'First1',
            id: 1,
            last_name: 'Last1',
          },
          {
            email: 'prospect2@example.com',
            first_name: 'First2',
            last_name: 'Last2',
          },
        ];

        const convertedProspects: UpdateProspectsV3 = {
          '1': {
            email: 'prospect1@example.com',
            first_name: 'First1',
            last_name: 'Last1',
          },
          'prospect2@example.com': {
            first_name: 'First2',
            last_name: 'Last2',
          },
        };

        const response = await prospectsV3.batchUpdate(updateProspects);

        expect(onPostSpyV3).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/3/do/batchUpdate`,
          {
            prospects: JSON.stringify({ prospects: convertedProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });

      it('should reject with an error for array input containing a prospect without id or email', async () => {
        await expect(prospectsV3.batchUpdate([{}])).rejects.toEqual(
          'Must specify id or email in each prospect for update',
        );
      });
    });
  });

  describe('batchUpsert', () => {
    describe('api v4', () => {
      it('should make a post request to upsert a batch of prospects', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const upsertProspects: UpsertProspects = [
          {
            email: 'prospect1@example.com',
            first_name: 'First',
            last_name: 'Last',
          },
          {
            email: 'prospect2@example.com',
            first_name: 'First',
            last_name: 'Last',
          },
        ];

        const response = await prospects.batchUpsert(upsertProspects);

        expect(onPostSpy).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/4/do/batchUpsert`,
          {
            prospects: JSON.stringify({ prospects: upsertProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });
    });

    describe('api v3', () => {
      it('should make a post request to upsert a batch of prospects', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const upsertProspects: UpsertProspectsV3 = {
          '1': {
            email: 'prospect1@example.com',
            first_name: 'First1',
            last_name: 'Last1',
          },
          'prospect2@example.com': {
            first_name: 'First2',
            last_name: 'Last2',
          },
        };

        const response = await prospectsV3.batchUpsert(upsertProspects);

        expect(onPostSpyV3).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/3/do/batchUpsert`,
          {
            prospects: JSON.stringify({ prospects: upsertProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });

      it('should make a post request to upsert a batch of prospects and convert array input', async () => {
        mockAxios.onPost().reply<BatchResponse>(200, mockBatchResponse);

        const upsertProspects: UpsertProspects = [
          {
            email: 'prospect1@example.com',
            first_name: 'First1',
            id: 1,
            last_name: 'Last1',
          },
          {
            email: 'prospect2@example.com',
            first_name: 'First2',
            last_name: 'Last2',
          },
        ];

        const convertedProspects: UpsertProspectsV3 = {
          '1': {
            email: 'prospect1@example.com',
            first_name: 'First1',
            last_name: 'Last1',
          },
          'prospect2@example.com': {
            first_name: 'First2',
            last_name: 'Last2',
          },
        };

        const response = await prospectsV3.batchUpsert(upsertProspects);

        expect(onPostSpyV3).toHaveBeenCalledWith(
          `https://pi.pardot.com/api/prospect/version/3/do/batchUpsert`,
          {
            prospects: JSON.stringify({ prospects: convertedProspects }),
          },
        );

        expect(response).toEqual(mockBatchResponse);
      });

      it('should reject with an error for array input containing a prospect without id or email', async () => {
        await expect(prospectsV3.batchUpsert([{}])).rejects.toEqual(
          'Must specify id or email in each prospect for upsert',
        );
      });
    });
  });

  describe('deleteById', () => {
    it('should make a post request to delete a prospect by id', async () => {
      const id = 1;

      mockAxios.onPost().reply(204);

      const response = await prospects.deleteById(id);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/delete/id/${id}`,
      );

      expect(response).toBeUndefined();
    });
  });

  describe('deleteByFid', () => {
    it('should make a post request to delete a prospect by fid', async () => {
      const fid = 11;

      mockAxios.onPost().reply(204);

      const response = await prospects.deleteByFid(fid);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/delete/fid/${fid}`,
      );

      expect(response).toBeUndefined();
    });
  });

  describe('deleteByEmail', () => {
    it('should make a post request to delete a prospect by email', async () => {
      const email = 'prospect@example.com';

      mockAxios.onPost().reply(204);

      const response = await prospects.deleteByEmail(email);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospect/version/4/do/delete/email/${encodeURIComponent(email)}`,
      );

      expect(response).toBeUndefined();
    });
  });
});
