export interface IErrLogIoOptions {
  apikey?: string;
  message?: string;
  type?: string;
  applicationname?: string;
  errordate?: Date;
  querystring?: string;
  trace?: string;
  page?: string;
  method?: string;
  lineno?: number;
  colno?: number;
  filename?: string;
  useragent?: string;
  browsername?: string;
  servername?: string;
  browser_capabilities?: string;
  ipaddress?: string;
  custom?: string;
  language?: string;
  session_data?: string;
  assemblyversion?: string;
  application_data?: string;
  request_header?: string;
  request_formdata?: string;
  request_cookies?: string;
  environment?: string;
}
