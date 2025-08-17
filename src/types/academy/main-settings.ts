export interface MainSettings {
  platform_name: string;
  default_currency: string;
  vat_percentage: string;
  platform_fee_percentage: string;
  max_withdrawal_amount: string;
  min_withdrawal_amount: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
  snapchat: string;
  tiktok: string;
  telegram: string;
  discord: string;
  subdomain: string;
  logo: string;
  favicon: string;
  banner: string;
}
export interface MainSettingsResponse {
  status: string;
  status_code: number;
  message: string;
  data: MainSettings;
}

export interface MainSettingsPayload {
  platform_name: string;
  subdomain: string;
  primary_color: string;
  secondary_color: string;
  logo?: File;
  favicon?: File;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}
