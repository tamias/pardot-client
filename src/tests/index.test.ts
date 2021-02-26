import { AuthorizationCode } from 'simple-oauth2';
import Pardot from '..';

describe('Pardot', () => {
  const clientId = 'clientId';
  const clientSecret = 'clientSecret';
  const redirectUri = 'https://www.example.com/oauth/callback';
  const businessUnitId = 'businessUnitId';

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
      expect(pardot.token).not.toBeDefined();
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

    const mockTokenResponse = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    };

    const getTokenSpy = jest
      .spyOn(pardot.oauthClient, 'getToken')
      .mockResolvedValue(pardot.oauthClient.createToken(mockTokenResponse));

    it('should get an access token', async () => {
      const code = 'code';

      const rawToken = await pardot.getAccessToken(code);

      expect(getTokenSpy).toHaveBeenCalledWith({
        code,
        redirect_uri: redirectUri,
      });

      expect(rawToken).toEqual(mockTokenResponse);

      expect(pardot.token).toMatchObject({ token: mockTokenResponse });
    });
  });
});
