import { ApiResponse } from '../../../interfaces/api.interface';
import { Content, listUser, LoginRequestBody, Register, CurrentUser, updateUser } from '../../../interfaces/user.interface';
import fetcher from '../../fetcher';

export const userApi = {
  login: async (body: LoginRequestBody): Promise<Content> => {
    try {
      const response = await fetcher.post<ApiResponse<Content>>('/auth/signin', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  register: async (body: Register): Promise<Content> => {
    try {
      const response = await fetcher.post<ApiResponse<Content>>('/auth/signup', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.content;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },
  getListUser: async (page: number = 1, limit: number = 10, keyword:string) : Promise<listUser> => {
    try {
      const response = await fetcher.get<ApiResponse<listUser>>(
        `users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${limit}&keyWord=${keyword}`);
      return response.data.content;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },
  deleteUser: async(id:number): Promise<any> =>{
    try {
      const response = await fetcher.delete<any>(
        `/users?id=${id}`)
        return response.data.content;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },
  addUser: async (body: CurrentUser): Promise<Content> => {
    try {
      const response = await fetcher.post<ApiResponse<Content>>('/users', body, {
      });
      return response.data.content;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },
  updateUser: async (id: number, body: updateUser): Promise<Content> => {
    try {
      const response = await fetcher.put<ApiResponse<Content>>(`/users/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.content;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },
};