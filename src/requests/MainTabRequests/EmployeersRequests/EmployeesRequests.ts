import axios from "axios";
import { getAccessToken, getUser } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function getEmployees() {

    try{
      const access_token = await getAccessToken();
      const response = await getEmployeesReq(access_token);
      return response.data
    }
    catch{
      const access_token = (await refreshToken()).access_token;
      const response = await getEmployeesReq(access_token);
      return response.data
    }
  }

export async function getEmployeesReq(access_token: string) {

    const user = await getUser();
    const response = await axiosInstance.post('/api/get/employees',{ScoupeID: user?.Scoupe?.ID}, {headers: { 
       "Content-Type": "application/json",
       'Authorization': "Bearer "+access_token,
    }})
    
    return response;  

}

export async function deleteEmployeesScoupe(UserID: number) {

  try{
    const access_token = await getAccessToken();
    const response = await deleteEmployeesScoupeReq(access_token, UserID);
    return response.status
  }
  catch{
    const access_token = (await refreshToken()).access_token;
    const response = await deleteEmployeesScoupeReq(access_token, UserID);
    return response.status
  }
}

async function deleteEmployeesScoupeReq(access_token: string, UserID: number) {
  const response = await axiosInstance.post('/api/delete/employeescoupe',{UserID}, {headers: { 
     "Content-Type": "application/json",
     'Authorization': "Bearer "+access_token,
  }})
  
  return response;  
}


export async function setScoupeForEmployee(UserID: number, ScoupeID:number) {

  try{
    const access_token = await getAccessToken();
    const response = await setScoupeForEmployeeReq(access_token, UserID, ScoupeID);
    return response.status
  }
  catch{
    const access_token = (await refreshToken()).access_token;
    const response = await setScoupeForEmployeeReq(access_token, UserID, ScoupeID);
    return response.status
  }
}

async function setScoupeForEmployeeReq(access_token: string, UserID: number, ScoupeID: number) {
  const response = await axiosInstance.post('/api/set/employeescoupe',{UserID, ScoupeID}, {headers: { 
     "Content-Type": "application/json",
     'Authorization': "Bearer "+access_token,
  }})
  
  return response;  
}