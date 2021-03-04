import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import CustomFields, { CustomFieldQueryResponse, CustomFieldResponse } from '../custom-fields';

describe('CustomFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const customFields = new CustomFields(pardot);

  describe('query', () => {
    it('should make a get request to query custom fields', async () => {
      const mockResponse: CustomFieldQueryResponse = {
        ...responseAttributes,
        result: {
          customField: [
            {
              created_at: '',
              crm_id: null,
              field_id: 'custom_field_50',
              id: 50,
              is_analytics_synced: false,
              is_record_multiple_responses: false,
              is_use_values: false,
              name: 'Custom Field 1',
              type: 'Number',
              type_id: 8,
              updated_at: '',
            },
            {
              created_at: '',
              crm_id: null,
              field_id: 'custom_field_51',
              id: 51,
              is_analytics_synced: false,
              is_record_multiple_responses: false,
              is_use_values: false,
              name: 'Custom Field 1',
              type: 'Number',
              type_id: 8,
              updated_at: '',
            },
          ],
          total_results: 10,
        },
      };

      mockAxios.onGet().reply<CustomFieldQueryResponse>(200, mockResponse);

      const params = {
        id_greater_than: 40,
        limit: 2,
      };

      const response = await customFields.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/customField/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a custom field', async () => {
      const id = 1;

      const mockResponse: CustomFieldResponse = {
        ...responseAttributes,
        customField: {
          created_at: '',
          crm_id: null,
          field_id: 'custom_field_50',
          id: 50,
          is_analytics_synced: false,
          is_record_multiple_responses: false,
          is_use_values: false,
          name: 'Custom Field 1',
          type: 'Number',
          type_id: 8,
          updated_at: '',
        },
      };

      mockAxios.onGet().reply<CustomFieldResponse>(200, mockResponse);

      const response = await customFields.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/customField/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a custom field', async () => {
      const id = 1;

      const params = {
        is_record_multiple_responses: true,
      };

      const mockResponse: CustomFieldResponse = {
        ...responseAttributes,
        customField: {
          created_at: '',
          crm_id: null,
          field_id: 'custom_field_50',
          id: 50,
          is_analytics_synced: false,
          is_record_multiple_responses: true,
          is_use_values: false,
          name: 'Custom Field 1',
          type: 'Number',
          type_id: 8,
          updated_at: '',
        },
      };

      mockAxios.onPost().reply<CustomFieldResponse>(200, mockResponse);

      const response = await customFields.update(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/customField/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
