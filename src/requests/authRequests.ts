import axios, { AxiosResponse } from 'axios';
import * as Crypto from 'expo-crypto';
import { getAccessToken, getRefreshToken, getUser, setAccessToken, setRefreshToken, setUser } from '../store/authToken';
import { Config } from './config';
import { store } from '../../redux/store';

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function getSalt(Nickname:string)
{
    const salt = await axiosInstance.post(`/auth/salt`, {Nickname}, {headers: { 
      "Content-Type": "application/json",
    }
  });
   // console.log("Salt: "+salt.data);
    return salt.data;
}

export async function genSalt()
{
  const response = await axiosInstance.get('/auth/gensalt');
  return response.data
}

export async function refreshToken()
{
  const Nickname = (await getUser()).Nickname;
  const refresh_token = await getRefreshToken();

  const response = (await axiosInstance.post('/auth/refresh', {
    Nickname: Nickname,
    refresh_token: refresh_token
  }))

  console.log("RefreshToken");

  await setAccessToken(response.data.access_token);
  await setRefreshToken(response.data.refresh_token);



  return response.data;
}

export async function LogIn(Nickname:string, Password:string)
{
    const Salt = await getSalt(Nickname);
    //console.log(Salt);
    const PasswordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Password+Salt
    );
      

    const response = await axiosInstance.post(`/auth/login`, {
        username:Nickname,
        password:PasswordHash,
      }, {headers: { 
        "Content-Type": "application/json",
      }
    });

      if(response.status===201)
      {
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        setUser(response.data.payload)
        return {status: response.status, access_token: response.data.access_token, payload: response.data.payload}
      }

      return {status:response.status, access_token: ''};
}

export async function RegistrationReq(user:any, Code:any)
{
    const regex = new RegExp('/', 'gi');

    const Salt = await genSalt();
    const PasswordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      user.Password+Salt
    );
    
    delete user.Password;
    user.Birthday = user.Birthday.replace(regex, '.');
    const splitedDate = user.Birthday.split('.');
    user.Birthday = splitedDate[1]+'.'+splitedDate[0]+'.'+splitedDate[2];
    user.PasswordHash=PasswordHash;
    user.Salt=Salt;

    console.log(user.Birthday)

    const response = await axiosInstance.post('api/create/user', {user},
      {headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer "+user.Email+" "+Code,
        }
      });

      return response;
}

export async function Registration(user:any, Code:any) {
  try{ return (await RegistrationReq(user, Code)).status}
  catch{console.log("Не удалось зарегистрировать!"); return 501;}

}

export async function getCode(Email: any) {
  try{
    console.log(Email)
    const access_token = await getAccessToken();
    const response = await getCodeReq(access_token, Email);
    return response.Code;
  }
  catch{
    return (await getCodeReq((await refreshToken()).access_token, Email)).Code
  }
}

export async function getCodeReq(Token:any, Email:any) {

    const response = await axiosInstance.post('/api/get/code',{Email}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+Token,
    }})

    return response.data
}

export async function getScoupe() {
  try{
    const access_token = await getAccessToken();
    const response = await getScoupeReq(access_token);
    return response;
  }
  catch{
    return (await getScoupeReq((await refreshToken()).access_token));
  }
}

export async function getScoupeReq(Token:any) {

  const response = await axiosInstance.post('/positions/get/scoupe',{}, {headers: { 
    "Content-Type": "application/json",
    'Authorization': "Bearer "+Token,
  }})

  return response.data
}