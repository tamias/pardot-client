import { RawAccessToken } from '../../../types';
import { ResponseBase } from '../../types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PardotClient from '../../..';

export const mockAxios = new MockAdapter(axios);

const clientId = 'clientId';
const clientSecret = 'clientSecret';
const redirectUri = 'https://www.example.com/oauth/callback';
const businessUnitId = 'businessUnitId';
const rawToken: RawAccessToken = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
};

export const pardot = new PardotClient({
  businessUnitId,
  clientId,
  clientSecret,
  redirectUri,
  token: rawToken,
});

export const onGetSpy = jest.spyOn(pardot.axios, 'get');
export const onPostSpy = jest.spyOn(pardot.axios, 'post');

export const responseAttributes: ResponseBase = {
  '@attributes': {
    status: 'ok',
    version: 1,
  },
};
