import { AuthorizationCode } from 'simple-oauth2';
import { RawAccessToken } from '../types';
import Accounts from '../objects/accounts';
import axios from 'axios';
import Campaigns from '../objects/campaigns';
import CustomFields from '../objects/custom-fields';
import CustomRedirects from '../objects/custom-redirects';
import DynamicContent from '../objects/dynamic-content';
import MockAdapter from 'axios-mock-adapter';
import Pardot from '..';

const mockAxios = new MockAdapter(axios);
const axiosCreateSpy = jest.spyOn(axios, 'create');

describe('Pardot', () => {
  const clientId = 'clientId';
  const clientSecret = 'clientSecret';
  const redirectUri = 'https://www.example.com/oauth/callback';
  const businessUnitId = 'businessUnitId';

  const basePardotProps = {
    businessUnitId,
    clientId,
    clientSecret,
    redirectUri,
  };

  const rawToken: RawAccessToken = {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  describe('constructor', () => {
    it('should set baseUrl to provided value', () => {
      const baseUrl = 'https://pi.demo.pardot.com';

      const pardot = new Pardot({ ...basePardotProps, baseUrl });

      expect(pardot.baseUrl).toEqual(baseUrl);
    });

    it('should set baseUrl to default if not provided', () => {
      const pardot = new Pardot(basePardotProps);

      expect(pardot.baseUrl).toEqual('https://pi.pardot.com');
    });

    it('should set apiVersion to default of 4 if not provided', () => {
      const pardot = new Pardot(basePardotProps);

      expect(pardot.apiVersion).toEqual(4);
    });

    it('should set apiVersion to provided value', () => {
      const apiVersion = 3;

      const pardot = new Pardot({ ...basePardotProps, apiVersion });

      expect(pardot.apiVersion).toEqual(apiVersion);
    });

    it('should instantiate an AuthorizationCode client', () => {
      const pardot = new Pardot(basePardotProps);

      expect(pardot.oauthClient).toBeInstanceOf(AuthorizationCode);
      expect(pardot.token).toBeUndefined();
    });

    it('should instantiate an AccessToken if token is present', () => {
      const token = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      const pardot = new Pardot({ ...basePardotProps, token });

      expect(pardot.oauthClient).toBeInstanceOf(AuthorizationCode);
      expect(pardot.token).toMatchObject({ token });
    });

    it('should instantiate child object classes', () => {
      const pardot = new Pardot(basePardotProps);

      expect(pardot).toMatchObject<Partial<Pardot>>({
        accounts: expect.any(Accounts),
        campaigns: expect.any(Campaigns),
        customFields: expect.any(CustomFields),
        customRedirects: expect.any(CustomRedirects),
        dynamicContent: expect.any(DynamicContent),
      });
    });
  });

  describe('authorizeUrl', () => {
    const pardot = new Pardot(basePardotProps);

    it('should return an authorize url', () => {
      const scope = 'scope';
      const state = 'state';
      const url = pardot.authorizeUrl({ scope, state });

      expect(url).toEqual(
        'https://login.salesforce.com/services/oauth2/authorize' +
          `?response_type=code&client_id=${clientId}&scope=${scope}&state=${state}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}`,
      );
    });
  });

  describe('getAccessToken', () => {
    const pardot = new Pardot(basePardotProps);

    const getTokenSpy = jest
      .spyOn(pardot.oauthClient, 'getToken')
      .mockResolvedValue(pardot.oauthClient.createToken(rawToken));

    it('should get an access token', async () => {
      const code = 'code';

      const returnedToken = await pardot.getAccessToken(code);

      expect(getTokenSpy).toHaveBeenCalledWith({
        code,
        redirect_uri: redirectUri,
      });

      expect(returnedToken).toEqual(rawToken);

      expect(pardot.token).toMatchObject({ token: rawToken });
    });
  });

  describe('axios getter', () => {
    it('should create an axios instance', () => {
      const pardot = new Pardot({ ...basePardotProps, token: rawToken });

      expect(pardot.axiosInstance).toBeUndefined();

      const axiosInstance = pardot.axios;

      expect(axiosCreateSpy).toHaveBeenCalled();
      expect(axiosInstance).toBeDefined();
      expect(pardot.axiosInstance).toBe(axiosInstance);
    });

    it('should return a previously-created axios instance', () => {
      const pardot = new Pardot({ ...basePardotProps, token: rawToken });

      expect(pardot.axiosInstance).toBeUndefined();

      const axiosInstance = pardot.axios;
      const axiosInstance2 = pardot.axios;

      expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
      expect(axiosInstance2).toBe(axiosInstance);
    });

    it('should throw an error if token is not present', () => {
      const pardot = new Pardot(basePardotProps);

      expect(() => {
        pardot.axios;
      }).toThrow('Cannot instantiate axios without token');

      expect(axiosCreateSpy).not.toHaveBeenCalled();
    });

    describe('request interceptor', () => {
      const pardot = new Pardot({ ...basePardotProps, token: rawToken });

      it('should set headers and params', async () => {
        mockAxios.onGet().reply(200);

        const headers = { 'X-Test-Header': 1 };
        const params = { test: 'value' };

        const response = await pardot.axios.get('http://example.com', {
          headers,
          params,
        });

        expect(response.config).toMatchObject({
          headers: {
            ...headers,
            Authorization: `Bearer ${rawToken.access_token}`,
            'Pardot-Business-Unit-Id': businessUnitId,
          },
          params: {
            ...params,
            format: 'json',
          },
        });
      });

      it('should stringify data', async () => {
        mockAxios.onPost().reply(200);

        const response = await pardot.axios.post('http://example.com', {
          test1: 'value1',
          test2: 'value2',
        });

        expect(response.config).toMatchObject({
          data: 'test1=value1&test2=value2',
        });
      });

      it('should convert booleans in data to numbers', async () => {
        mockAxios.onPost().reply(200);

        const response = await pardot.axios.post('http://example.com', {
          testFalse: false,
          testTrue: true,
        });

        expect(response.config).toMatchObject({
          data: 'testFalse=0&testTrue=1',
        });
      });
    });

    describe('refresh interceptor', () => {
      it('should refresh the access token and retry the request with the new token', async () => {
        const pardot = new Pardot({ ...basePardotProps, token: rawToken });

        const newToken = pardot.oauthClient.createToken({
          ...rawToken,
          access_token: 'new_access_token',
        });

        const refreshSpy = jest.spyOn(pardot.token, 'refresh').mockResolvedValue(newToken);

        const mockResponseData = { test: 1 };

        mockAxios.onGet().replyOnce(401);
        mockAxios.onGet().replyOnce(200, mockResponseData);

        const response = await pardot.axios.get('http://example.com');

        expect(refreshSpy).toHaveBeenCalledWith();

        expect(response.data).toEqual(mockResponseData);

        expect(mockAxios.history.get).toHaveLength(2);
        expect(mockAxios.history.get[1].headers.Authorization).toEqual(
          `Bearer ${newToken.token.access_token}`,
        );
      });

      it('should call refreshCallback if present', async () => {
        const refreshCallback = jest.fn();

        const pardot = new Pardot({ ...basePardotProps, refreshCallback, token: rawToken });

        const newToken = pardot.oauthClient.createToken({
          ...rawToken,
          access_token: 'new_access_token',
        });

        const refreshSpy = jest.spyOn(pardot.token, 'refresh').mockResolvedValue(newToken);

        const mockResponseData = { test: 1 };

        mockAxios.onGet().replyOnce(401);
        mockAxios.onGet().replyOnce(200, mockResponseData);

        await pardot.axios.get('http://example.com');

        expect(refreshSpy).toHaveBeenCalledWith();

        expect(refreshCallback).toHaveBeenCalledWith(newToken.token);
      });
    });
  });

  describe('getApiUrl', () => {
    it('should return an API url', () => {
      const pardot = new Pardot(basePardotProps);

      const object = 'campaign';
      const path = 'query';

      const url = pardot.getApiUrl(object, path);

      expect(url).toEqual(
        `${pardot.baseUrl}/api/${object}/version/${pardot.apiVersion}/do/${path}`,
      );
    });
  });
});
