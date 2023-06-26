import { AuthTokenApiOptions } from 'cloudinary';

export interface CloudinaryConfigOptions {
  cloud_name?: string;
  api_key?: string;
  api_secret?: string;
  api_proxy?: string;
  private_cdn?: boolean;
  secure_distribution?: string;
  force_version?: boolean;
  ssl_detected?: boolean;
  secure?: boolean;
  cdn_subdomain?: boolean;
  secure_cdn_subdomain?: boolean;
  cname?: string;
  shorten?: boolean;
  sign_url?: boolean;
  long_url_signature?: boolean;
  use_root_path?: boolean;
  auth_token?: AuthTokenApiOptions;
  account_id?: string;
  provisioning_api_key?: string;
  provisioning_api_secret?: string;
  oauth_token?: string;

  [futureKey: string]: any;
}
