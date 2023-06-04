export interface ICompanyLocation {
  address1?: string;
  address2?: string;
  address_line_2?: null | string;
  city?: string;
  continent?: string;
  country: string;
  geo?: string | null;
  latitude?: string;
  longitude?: string;
  locality?: string | null;
  metro?: string | null;
  name?: string;
  postal_code?: string | null;
  region?: string;
  street_address?: string | null;
  state?: string;
  zipcode?: string;
}
