# TODO

- Test opportunities and prospect accounts with a Pardot account that does not have the Salesforce connector.
  - When retrieving opportunities, determine what fields are present in `prospect` sub-documents.
  - Find out what the prospect account assign endpoint returns.
- Test emails.
- When retrieving prospects, determine what user fields are present in `assigned_to` sub-document.
- Determine how to specify `type` when creating a custom field.
- Fix `CreateProspect`, `UpdateProspect`, and `UpsertProspect` types.
- Determine exactly which account fields can be null.
- Find out whether `id_less_than` really is not a search option for email clicks; `id_greater_than` is listed in the
  documentation but `id_less_than` is not.
