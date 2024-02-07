import requestHttp from '../config';
export function checkEmailApi(params: any) {
    return requestHttp({
      url: '/api/check-email',
      method: 'POST',
      data: params,
    });
  }