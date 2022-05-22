import axios from "axios";
import { getAccessToken, getRefreshToken, getUser } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'
import { UserDto } from "../../dto/user.dto";

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addPosition(PositionNameID:number, PositionCode:string) {

  try{
    console.log(PositionNameID, PositionCode)
    const response = await axiosInstance.post('/positions/create/position',{PositionNameID, PositionCode}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    console.log(PositionNameID, PositionCode)
    const response = await axiosInstance.post('/positions/create/position',{PositionNameID, PositionCode}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}

export async function deletePosition(ID: number) {

  try{
    const response = await axiosInstance.post('/positions/delete/position',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    const response = await axiosInstance.post('/positions/delete/position',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}


export async function getPositionNamePosition(ID: number) {

  try{
    const response = await axiosInstance.post('/positions/get/positionnamepositions',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/positionnamepositions',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function getAllPositions() {

  try{
    const response = await axiosInstance.post('/positions/get/allpositions',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/allpositions',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function getFreePositions(DepartmentID:number){
  try{
    const res = await getFreePositionsReq(await getAccessToken(), DepartmentID);
    if(res.status===401)
    return getFreePositionsReq((await refreshToken()).access_token, DepartmentID);

    return res;
  }
  catch{
    console.log(DepartmentID)
    return getFreePositionsReq((await refreshToken()).access_token, DepartmentID);
  }
}

export async function getFreePositionsReq(Token:string, DepartmentID: number){
  
  const response = await axiosInstance.post('/positions/get/freepositions',{DepartmentID}, {headers: { 
    "Content-Type": "application/json",
    'Authorization': "Bearer "+Token,
  }})

  return response.data
}

export async function setEmployeeForPosition(EmployeeID: number, PositionID:number){

  try{
    setEmployeeForPositionReq(await getAccessToken(), EmployeeID, PositionID);
  }
  catch{
    setEmployeeForPositionReq((await refreshToken()).access_token, EmployeeID, PositionID);
  }
}

export async function setEmployeeForPositionReq(Token: string, EmployeeID: number, PositionID:number){
  const response = await axiosInstance.post('/positions/update/setUserForPosition',{EmployeeID, PositionID}, {headers: { 
    "Content-Type": "application/json",
    'Authorization': "Bearer "+Token,
  }})

  return response.data
}