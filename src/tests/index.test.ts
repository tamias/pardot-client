import { AuthorizationCode } from 'simple-oauth2';
import { RawAccessToken } from '../types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Pardot from '..';

const mockAxios = new MockAdapter(axios);
const axiosCreateSpy = jest.spyOn(axios, 'create');

describe('Pardot', () => {
  const clientId = 'clientId';
  const clientSecret = 'clientSecret';
  const redirectUri = 'https://www.example.com/oauth/callback';
  const businessUnitId = 'businessUnitId';

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

      const pardot = new Pardot({
        baseUrl,
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
      });

      expect(pardot.baseUrl).toEqual(baseUrl);
    });

    it('should set baseUrl to default if not provided', () => {
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
      });

      expect(pardot.baseUrl).toEqual('https://pi.pardot.com');
    });

    it('should set apiVersion to default of 4 if not provided', () => {
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
      });

      expect(pardot.apiVersion).toEqual(4);
    });

    it('should set apiVersion to provided value', () => {
      const apiVersion = 3;

      const pardot = new Pardot({
        apiVersion,
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
      });

      expect(pardot.apiVersion).toEqual(apiVersion);
    });

    it('should instantiate an AuthorizationCode client', () => {
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
      });

      expect(pardot.oauthClient).toBeInstanceOf(AuthorizationCode);
      expect(pardot.token).toBeUndefined();
    });

    it('should instantiate an AccessToken if token is present', () => {
      const token = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
        token,
      });

      expect(pardot.oauthClient).toBeInstanceOf(AuthorizationCode);
      expect(pardot.token).toMatchObject({ token });
    });
  });

  describe('authorizeUrl', () => {
    const pardot = new Pardot({
      businessUnitId,
      clientId,
      clientSecret,
      redirectUri,
    });

    it('should return an authorize url', () => {
      const scope = 'scope';
      const state = 'state';
      const url = pardot.authorizeUrl({ scope, state });

      expect(url).toEqual(
        'https://login.salesforce.com/oauth/authorize' +
          `?response_type=code&client_id=${clientId}&scope=${scope}&state=${state}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}`,
      );
    });
  });

  describe('getAccessToken', () => {
    const pardot = new Pardot({
      businessUnitId,
      clientId,
      clientSecret,
      redirectUri,
    });

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
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
        token: rawToken,
      });

      expect(pardot.axiosInstance).toBeUndefined();

      const axiosInstance = pardot.axios;

      expect(axiosCreateSpy).toHaveBeenCalled();
      expect(axiosInstance).toBeDefined();
      expect(pardot.axiosInstance).toBe(axiosInstance);
    });

    it('should return a previously-created axios instance', () => {
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
        token: rawToken,
      });

      expect(pardot.axiosInstance).toBeUndefined();

      const axiosInstance = pardot.axios;
      const axiosInstance2 = pardot.axios;

      expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
      expect(axiosInstance2).toBe(axiosInstance);
    });

    it('should throw an error if token is not present', () => {
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
      });

      expect(() => {
        pardot.axios;
      }).toThrow('Cannot instantiate axios without token');

      expect(axiosCreateSpy).not.toHaveBeenCalled();
    });

    it('should use a request interceptor that sets headers and params', async () => {
      const pardot = new Pardot({
        businessUnitId,
        clientId,
        clientSecret,
        redirectUri,
        token: rawToken,
      });

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
  });
});
