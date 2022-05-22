import axios from "axios";
import { getAccessToken } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addScoupeName(ScoupeName:string) {


  const access_token = await getAccessToken();

    const response = await axiosInstance.post('/positions/create/scoupe',{ScoupeName: ScoupeName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+access_token,
    }})

    return response.status
  }

  export async function getScoupes() {

    try{
    const response = await axiosInstance.post('/positions/get/scoupes',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await getAccessToken()),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/scoupes',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
  }

  export async function deleteScoupe(ID: number) {

    try{
      const response = await axiosInstance.post('/positions/delete/scoupe',{ID}, {headers: { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+getAccessToken(),
      }})
  
      return response.status
    }
    catch{
      const response = await axiosInstance.post('/positions/delete/scoupe',{ID}, {headers: { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+(await refreshToken()).access_token,
      }})
  
      return response.status
    }
  }


  export async function getScoupesWithAllData() {

    try{
    const response = await axiosInstance.post('/positions/get/scoupeswithalldata',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await getAccessToken()),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/scoupeswithalldata',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
  }