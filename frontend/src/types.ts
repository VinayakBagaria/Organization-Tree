export interface IOrganizationUser {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  designation: string;
  country_code?: string;
  phone_number?: string;
  email?: string;
  manager_id?: number;
}
