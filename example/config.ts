import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrl, getBaseUrl, isEmpty } from '@jazasoft/react-native-admin';

export const appId = 'optafloor';

export const authUrl: ApiUrl = async () => {
  let url: string = '';
  try {
    const tenantInfoStr = await AsyncStorage.getItem('tenantInfo');
    if (tenantInfoStr) {
      const tenantInfo = JSON.parse(tenantInfoStr);
      url = getBaseUrl(tenantInfo.local.iam);
    }
  } catch (error) {
    console.log(error);
  }
  if (isEmpty(url)) {
    throw new Error('Cannot detect Auth Url');
  }
  return url;
};

export const appUrl: ApiUrl = async () => {
  let url: string = '';
  try {
    const tenantInfoStr = await AsyncStorage.getItem('tenantInfo');
    if (tenantInfoStr) {
      const tenantInfo = JSON.parse(tenantInfoStr);
      url = getBaseUrl(tenantInfo.local.app);
    }
  } catch (error) {
    console.log(error);
  }
  if (isEmpty(url)) {
    throw new Error('Cannot detect App Url.');
  }
  return url;
};

export const clientId = 'client';
export const clientSecret = 'secret';

export const basePath = '/v1/api'; // Base Path for DataProvider. Final Url = `${appUrl}/${basePath}/${options.url}`

//** Local Environment **//
// export const authUrl: ApiUrl = "https://iam-dev.jaza-soft.com";
// export const appUrl: ApiUrl = "http://192.168.1.3:8050";
