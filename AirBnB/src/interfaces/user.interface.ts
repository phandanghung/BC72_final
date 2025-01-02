
export interface CurrentUser {
  id?: number ;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar?: string | null;
  gender: boolean;
  role: string;
}

export interface updateUser {
  id?: number ;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar?: string | null;
  gender: boolean;
  role: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface Register{
  id?: number;
  avatar?: string | null;
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  gender: boolean
  role: string
}

export interface Content{
  user: CurrentUser;
  token: string;
}

export interface listUser {
  pageIndex: number
  pageSize: number
  totalRow: number
  keywords: any
  data: CurrentUser[]
}