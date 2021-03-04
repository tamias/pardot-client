import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import Accounts, { Account, AccountResponse } from '../accounts';

describe('Accounts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const accounts = new Accounts(pardot);

  describe('read', () => {
    it('should make a get request to read account', async () => {
      const mockResponse: AccountResponse = {
        ...responseAttributes,
        account: {
          company: 'Example',
          id: 1,
        } as Account,
      };

      mockAxios.onGet().reply<AccountResponse>(200, mockResponse);

      const response = await accounts.read();

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/account/version/4/do/read');

      expect(response).toEqual(mockResponse);
    });
  });
});
