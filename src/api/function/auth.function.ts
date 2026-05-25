import type { LoginPayload, RegisterPayload } from "../../typescript/interface/auth.interface";
import API from "../axios.instance";
import { endpoint } from "../endpoint";

export const registerUserFns = async (data: RegisterPayload)=>{
    const res = await API.post(`${endpoint.auth.regiter}`, data);
    return res.data
}


export const loginUserFns = async (data: LoginPayload)=>{
    const res = await API.post(`${endpoint.auth.login}`, data);
    return res.data
}