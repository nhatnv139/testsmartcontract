import requestHttp from "../config";
export function getListHistoryApi(params: any) {
  return requestHttp({
    url: `/api/history`,
    method: "GET",
    params: {
      wallet: params.wallet,
      pageSize: params.pageSize,
      page: params.page,
    },
  });
}
