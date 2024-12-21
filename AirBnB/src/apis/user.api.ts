import { ApiResponse } from '../interfaces/api.interface';
import { Content, LoginRequestBody, Register } from '../interfaces/user.interface';
import fetcher from './fetcher';

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
  }
};