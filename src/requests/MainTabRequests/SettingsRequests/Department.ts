import axios from "axios";
import { getAccessToken } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addDepartment(ScoupeID:number, DepartmentName:string) {

  try{
    console.log(ScoupeID, DepartmentName)
    const response = await axiosInstance.post('/positions/create/department',{ScoupeID, DepartmentName: DepartmentName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    const response = await axiosInstance.post('/positions/create/department',{ScoupeID, DepartmentName: DepartmentName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}

export async function getDepartments() {

  try{
    const response = await axiosInstance.post('/positions/get/departments',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/departments',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function getDepartmentPositionNames(ID:number) {
  try{
    const response = await axiosInstance.post('/positions/get/positionnames',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    console.log(response.status)

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/positionnames',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function deleteDepartment(ID: number) {

  try{
    const response = await axiosInstance.post('/positions/delete/department',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    const response = await axiosInstance.post('/positions/delete/department',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}