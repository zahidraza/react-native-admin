import type { AxiosError } from 'axios';
import HttpError from '../HttpError';

const handleAuthError = (error: AxiosError): HttpError => {
  let statusCode: number = 0,
    statusText: string = '',
    title: string = '',
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

    const data = response.data as any;

    if (statusCode === 400) {
      if (data.error_description === 'User credentials have expired') {
        title = 'Credentials expired';
        message = data.error_description;
      } else if (data.error_description === 'User is disabled') {
        title = 'User disabled';
        message = data.error_description;
      } else if (data.error === 'invalid_grant') {
        title = 'Invalid Credentials';
        message = 'Incorrect username or password. Try again';
      } else {
        title = 'Error';
        message = data.error_description || JSON.stringify(data);
      }
    } else if (statusCode === 401) {
      title = 'Invalid Credentials';
      message = 'Incorrect username or password. Try again';
    } else {
      title = 'Error';
      message =
        data?.error_description ||
        data?.error ||
        data.message ||
        data.devMessage ||
        JSON.stringify(data);
    }
  }
  return new HttpError(message, statusCode, statusText, title);
};

export default handleAuthError;
