

export interface AuthState {
  isLoading: boolean;
  isError: string | null;
  token: string | null;
  user: User | null;
  role: string | null;
}

export interface User {
  name: string;
  email: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface AuthResponse{
  message:string;
  user:User
}

export interface AuthContexttype {
  authData: AuthState;
  registeruser: (data: RegisterPayload) => Promise<any>;
  loginuser:(data:LoginPayload)=>Promise<any>;
  logout:()=>void;
}



export interface signupformvalue {
    name:string;
    email:string;
    password:string;
    // role?:string;
}
export interface Loginformvalue{
    email:string;
    password:string;
}