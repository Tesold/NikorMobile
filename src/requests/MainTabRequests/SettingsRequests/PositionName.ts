import axios from "axios";
import { getAccessToken } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl+'positions/';

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addPositionName(DepartmentID:number, PositionName:string) {

  try{
    const response = await axiosInstance.post('create/positionname',{DepartmentID, PositionName: PositionName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status;
  }
  catch{
    const response = await axiosInstance.post('create/positionname',{DepartmentID, PositionName: PositionName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status;
  }
}

export async function getPositionNames() {

  try{
    const response = await axiosInstance.post('get/positionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data;
  }
  catch{
    const response = await axiosInstance.post('get/positionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data;
  }
}

export async function getAllPositionNames() {

  try{
    const response = await axiosInstance.post('get/allpositionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data;
  }
  catch{
    const response = await axiosInstance.post('get/allpositionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data;
  }
}

export async function deletePositionName(ID: number) {

  try{
    const response = await axiosInstance.post('delete/positionname',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status;
  }
  catch{
    const response = await axiosInstance.post('delete/positionname',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status;
  }
}

export async function setManagerForPositionName(ID: number, ObeyToID: number){
  try{
    return setManagerForPositionNameReq(ID, ObeyToID, await getAccessToken());
  }
  catch{
    return setManagerForPositionNameReq(ID, ObeyToID, (await refreshToken()).access_token);
  }
}

export async function setManagerForPositionNameReq(ID: number, ObeyToID: number, token: string){
  console.log(baseUrl)
  console.log(ID)
  console.log(ObeyToID)
  const response = await axiosInstance.post('set/ManagerForPositionName',
  { 
    ID, ObeyToID 
  },
  { 
    headers:{     
      "Content-Type": "application/json",
      'Authorization': "Bearer "+token
    }
  }
  );

  return response.status;
}