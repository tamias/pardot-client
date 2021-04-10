import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import Users, { User, UserQueryParams, UserQueryResponse, UserResponse } from '../users';

describe('Users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const users = new Users(pardot);

  const mockUsers: User[] = [
    {
      account: 11,
      created_at: '',
      email: 'user1@example.com',
      first_name: 'User',
      id: 1,
      job_title: 'Tester',
      last_name: 'One',
      role: 'Example',
      timezone: 'America/New_York',
      updated_at: '',
    },
    {
      account: 11,
      created_at: '',
      email: 'user2@example.com',
      first_name: 'User',
      id: 2,
      job_title: null,
      last_name: 'Two',
      role: 'Example',
      timezone: 'America/New_York',
      updated_at: '',
    },
  ];

  const mockUsersResponse: UserQueryResponse = {
    ...responseAttributes,
    result: {
      total_results: 5,
      user: mockUsers,
    },
  };

  const mockUserResponse: UserResponse = {
    ...responseAttributes,
    user: mockUsers[0],
  };

  describe('query', () => {
    it('should make a get request to query users', async () => {
      mockAxios.onGet().reply<UserQueryResponse>(200, mockUsersResponse);

      const params: UserQueryParams = {
        limit: 2,
      };

      const response = await users.query(params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/user/version/4/do/query', {
        params,
      });

      expect(response).toEqual(mockUsersResponse);
    });
  });

  describe('readById', () => {
    it('should make a get request to read a user by id', async () => {
      const id = 1;

      mockAxios.onGet().reply<UserResponse>(200, mockUserResponse);

      const response = await users.readById(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/user/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockUserResponse);
    });
  });

  describe('readByEmail', () => {
    it('should make a get request to read a user by email', async () => {
      const email = 'user1@example.com';

      mockAxios.onGet().reply<UserResponse>(200, mockUserResponse);

      const response = await users.readByEmail(email);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/user/version/4/do/read/email/${encodeURIComponent(email)}`,
      );

      expect(response).toEqual(mockUserResponse);
    });
  });
});
