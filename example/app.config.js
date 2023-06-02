import 'dotenv/config';
import clientList from './clients.json';

const getBaseUrl = ({ scheme = 'http', host, port = '80' }) => {
  let baseUrl;
  if (host) {
    const finalPort = `${port}` === '80' ? '' : `:${port}`;
    baseUrl = `${scheme}://${host}${finalPort}`;
  }
  return baseUrl;
};

export default ({ config }) => {
  const tenantId = process.env.TENANT_ID;
  const client = clientList?.find((e) => e.tenantId === tenantId) || {};

  let updateUrl;
  if (client?.local?.app?.host) {
    const baseUrl = getBaseUrl(client.local.app);
    updateUrl = `${baseUrl}/supervisor/bundles/manifest`;
  }
  const finalConfig = {
    ...config,
    updates: !updateUrl
      ? config.updates
      : {
          enabled: true,
          fallbackToCacheTimeout: 0,
          url: updateUrl,
        },
    extra: {
      version: config.version,
      ...config.extra,
      ...client,
    },
  };
  return finalConfig;
};
