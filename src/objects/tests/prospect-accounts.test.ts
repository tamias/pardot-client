import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import ProspectAccounts, {
  ProspectAccount,
  ProspectAccountDescribeResponse,
  ProspectAccountQueryParams,
  ProspectAccountQueryResponse,
  ProspectAccountResponse,
} from '../prospect-accounts';

describe('ProspectAccounts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const prospectAccounts = new ProspectAccounts(pardot);

  const mockProspectAccounts: ProspectAccount[] = [
    {
      created_at: '',
      id: 1,
      name: 'Prospect Account 1',
      updated_at: '',
    },
    {
      created_at: '',
      id: 2,
      name: 'Prospect Account 2',
      updated_at: '',
    },
  ];

  const mockProspectAccountsResponse: ProspectAccountQueryResponse = {
    ...responseAttributes,
    result: {
      prospectAccount: mockProspectAccounts,
      total_results: 5,
    },
  };

  const mockProspectAccountDescribeResponse: ProspectAccountDescribeResponse = {
    ...responseAttributes,
    result: {
      field: [
        {
          '@attributes': {
            custom: true,
            has_options: false,
            id: 'field',
            label: 'Field',
            required: false,
            type: 'text',
          },
        },
      ],
    },
  };

  const mockProspectAccountResponse: ProspectAccountResponse = {
    ...responseAttributes,
    prospectAccount: mockProspectAccounts[0],
  };

  describe('query', () => {
    it('should make a get request to query prospect accounts', async () => {
      mockAxios.onGet().reply<ProspectAccountQueryResponse>(200, mockProspectAccountsResponse);

      const params: ProspectAccountQueryParams = {
        limit: 2,
      };

      const response = await prospectAccounts.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/prospectAccount/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockProspectAccountsResponse);
    });
  });

  /* eslint-disable-next-line jest/valid-title */
  describe('describe', () => {
    it('should make a get request to describe prospect accounts', async () => {
      mockAxios
        .onGet()
        .reply<ProspectAccountDescribeResponse>(200, mockProspectAccountDescribeResponse);

      const response = await prospectAccounts.describe();

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/prospectAccount/version/4/do/describe',
      );

      expect(response).toEqual(mockProspectAccountDescribeResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a prospect account', async () => {
      const id = 1;

      mockAxios.onGet().reply<ProspectAccountResponse>(200, mockProspectAccountResponse);

      const response = await prospectAccounts.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospectAccount/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockProspectAccountResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a prospect account', async () => {
      const params = {
        name: 'Prospect Account',
      };

      mockAxios.onPost().reply<ProspectAccountResponse>(200, mockProspectAccountResponse);

      const response = await prospectAccounts.create(params);

      expect(onPostSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/prospectAccount/version/4/do/create',
        params,
      );

      expect(response).toEqual(mockProspectAccountResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a prospect account', async () => {
      const id = 1;

      const params = {
        name: 'Prospect Account',
      };

      mockAxios.onPost().reply<ProspectAccountResponse>(200, mockProspectAccountResponse);

      const response = await prospectAccounts.update(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospectAccount/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockProspectAccountResponse);
    });
  });

  describe('assign', () => {
    it('should make a post request to assign a prospect account', async () => {
      const id = 1;
      const userId = 11;

      mockAxios.onPost().reply<ProspectAccountResponse>(200, mockProspectAccountResponse);

      const response = await prospectAccounts.assign(id, userId);

      expect(
        onPostSpy,
      ).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/prospectAccount/version/4/do/assign/id/${id}`,
        { user_id: userId },
      );

      expect(response).toEqual(mockProspectAccountResponse);
    });
  });
});
