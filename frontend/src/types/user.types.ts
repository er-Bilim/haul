export interface IUser {
  message: string;
  user: {
    email: string;
    displayName: string;
    avatar: string | null;
    role: string;
    refreshToken: string;
  };
}

export interface IRegister {
  displayName: string;
  avatar?: File | null;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
