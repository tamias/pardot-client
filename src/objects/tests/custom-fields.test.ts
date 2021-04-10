import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import CustomFields, {
  CustomField,
  CustomFieldQueryResponse,
  CustomFieldResponse,
} from '../custom-fields';

describe('CustomFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const customFields = new CustomFields(pardot);

  const mockCustomFields: CustomField[] = [
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
  ];

  const mockCustomFieldQueryResponse: CustomFieldQueryResponse = {
    ...responseAttributes,
    result: {
      customField: mockCustomFields,
      total_results: 5,
    },
  };

  const mockCustomFieldResponse: CustomFieldResponse = {
    ...responseAttributes,
    customField: mockCustomFields[0],
  };

  describe('query', () => {
    it('should make a get request to query custom fields', async () => {
      mockAxios.onGet().reply<CustomFieldQueryResponse>(200, mockCustomFieldQueryResponse);

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

      expect(response).toEqual(mockCustomFieldQueryResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a custom field', async () => {
      const id = 1;

      mockAxios.onGet().reply<CustomFieldResponse>(200, mockCustomFieldResponse);

      const response = await customFields.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/customField/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockCustomFieldResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a custom field', async () => {
      const id = 1;

      const params = {
        is_record_multiple_responses: true,
      };

      mockAxios.onPost().reply<CustomFieldResponse>(200, mockCustomFieldResponse);

      const response = await customFields.update(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/customField/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockCustomFieldResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a custom field', async () => {
      const params = {
        field_id: 'custom_field',
        name: 'Custom Field',
      };

      mockAxios.onPost().reply(200, mockCustomFieldResponse);

      const response = await customFields.create(params);

      expect(onPostSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/customField/version/4/do/create',
        params,
      );

      expect(response).toEqual(mockCustomFieldResponse);
    });
  });

  describe('delete', () => {
    it('should make a post request to delete a custom field', async () => {
      const id = 1;

      mockAxios.onPost().reply(204);

      const response = await customFields.delete(id);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/customField/version/4/do/delete/id/${id}`,
      );

      expect(response).toBeUndefined();
    });
  });
});
