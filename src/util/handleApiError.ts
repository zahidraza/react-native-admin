import type { AxiosError } from 'axios';
// import { HttpError } from '../HttpError';
import { isEmpty } from './helpers';

export const handleApiError = (error: AxiosError): Error => {
  let statusCode: number | undefined,
    statusText: string | undefined,
    title: string | undefined,
    message: string = '';

  if (!error.response) {
    title = error?.message?.includes('timeout')
      ? 'Request Timeout'
      : 'Network Error';
    message = error?.message || 'Check if you are connected to Wifi';
  } else if (error.response) {
    const response = error.response;

    statusCode = response.status;
    statusText = response.statusText;
    const url = error.response.config?.url;

    const data = response.data as any;
    if (data) {
      if (response.status === 403) {
        title = 'Access Denied';
        message = `You do not have enough privilege for the operation.${
          !isEmpty(url) ? ` URL = ${url}` : ''
        }`;
      } else if (response.status === 401) {
        title = 'Session Expired';
        message = 'Login again.';
      } else {
        title = 'Error';
        message =
          data.message || data.devMessage || JSON.stringify(response.data);
      }
    } else {
      if (error?.message?.includes('status code 401')) {
        title = 'Session Expired';
        message = 'Login again.';
      } else if (error?.message?.includes('status code 403')) {
        title = 'Access Denied';
        message = `You do not have enough privilege for the operation.${
          !isEmpty(url) ? ` URL = ${url}` : ''
        }`;
      } else {
        title = 'Error';
        message = typeof error === 'string' ? error : JSON.stringify(error);
      }
    }
  }

  // return new HttpError(message, statusCode, statusText, title);
  return new Error(message);
};
