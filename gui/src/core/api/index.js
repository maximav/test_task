import axios from 'axios';
import { apiPrefix } from '../../const';

const api = axios.create({
  baseURL: '',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
});

export const fetchMe = () => api.get(`${apiPrefix}/me/`);
export const login = ({ username, password }) =>
  api.post('/api/auth/login/', {
    username,
    password
  });

export const listUsers = ({ page, pageSize }) => {
  const params = { page };
  if (pageSize !== undefined) params.pageSize = pageSize;
  return api.get(`${apiPrefix}/users/`, { params });
};

export const fetchUser = ({ id }) => api.get(`${apiPrefix}/users/${id}/`);

export const logout = () => api.post('/api/auth/logout/', {});

export const dashboard = (payload) => api.post(`${apiPrefix}/dashboard/`, payload);


export const listFiles = ({ page }) => api.get(`${apiPrefix}/files/`,
  { params: { page } });

export const uploadFile = ({ file, name }) => {
  const form = new FormData();
  form.append('file', file);
  form.append('name', name);
  return api.post(`${apiPrefix}/files/`, form, {
    headers: { 'content-type': 'multipart/form-data' }
  });
};