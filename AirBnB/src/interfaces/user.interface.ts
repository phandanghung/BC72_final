export interface Content {
  user: CurrentUser
  token: string
}

export interface CurrentUser {
  id: number
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  avatar: string
  gender: boolean
  role: string
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface Register{
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  gender: boolean
  role: string
}