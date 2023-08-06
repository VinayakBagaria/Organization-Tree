import { IOrganizationUser } from './types';

const API_URL = process.env.REACT_APP_API_URL;

async function callApi<T>(path: string, method: 'GET' | 'PUT') {
  const response = await fetch(API_URL + path, {
    method,
  });

  if (response.status === 204) {
    return { response, json: null };
  }

  const json: { data: T } = await response.json();
  return {
    response,
    json,
  };
}

export async function fetchTree() {
  if (!API_URL) {
    throw new Error('API url is not defined');
  }

  const { json } = await callApi<Array<IOrganizationUser>>('/', 'GET');
  if (json === null) {
    throw new Error('Unexpected no data received');
  }

  return json.data;
}

export async function updateManagerForUser(
  sourceUserId: IOrganizationUser['id'],
  targetUserId: IOrganizationUser['id']
) {
  if (!API_URL) {
    throw new Error('API url is not defined');
  }

  const { response } = await callApi<Array<IOrganizationUser>>(
    `/update_manager/${sourceUserId}/${targetUserId}`,
    'PUT'
  );

  if (response.status === 400) {
  }
}
