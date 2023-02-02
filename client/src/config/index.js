'use strict';

const apiServerPort = process.env.VITE_API_SERVER_PORT || import.meta.env.VITE_API_SERVER_PORT;
const apiServerHostname = process.env.VITE_API_SERVER_HOSTNAME || import.meta.env.VITE_API_SERVER_HOSTNAME;
const apiProtocol = process.env.VITE_API_SERVER_PROTOCOL || import.meta.env.VITE_API_SERVER_PROTOCOL;
const apiPrefix = process.env.VITE_API_PREFIX ||  import.meta.env.VITE_API_PREFIX;

export default {
  baseUri: `${apiProtocol}://${apiServerHostname}${apiServerPort && `:${apiServerPort}`}${apiPrefix}`,
  publicKey: '-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgH9VFub0xGg7Br9On4jaIAyjNhxX\nZoP7lLA+QXeFFIaMhRYWRw5bPKRLNTtr3/ERYvcylNnS4EkSHln1ZvU4RLbXnPm7\nETd+c3xpNG4q+t2vlkU3GIIsD5P7ltaOqddeozGwBrph5AaBvE0klb1REfm+EtCC\n6Ymo3XcWKU2ra20NAgMBAAE=\n-----END PUBLIC KEY-----'
};
