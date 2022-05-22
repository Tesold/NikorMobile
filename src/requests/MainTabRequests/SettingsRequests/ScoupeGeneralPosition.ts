import axios from "axios";
import { getAccessToken } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl+'positions/';

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addScoupeGeneralPosition(ScoupeID:number, ScoupeGeneralPositionName:string){
    try{
        return addScoupeGeneralPositionReq(ScoupeID, ScoupeGeneralPositionName, await getAccessToken())
    }
    catch{
        return addScoupeGeneralPositionReq(ScoupeID, ScoupeGeneralPositionName, (await refreshToken()).access_token)
    }
}

export async function addScoupeGeneralPositionReq(ScoupeID:number, ScoupeGeneralPositionName:string, token: string) {

      const response = await axiosInstance.post('create/scoupegeneralposition',{ScoupeID, ScoupeGeneralPositionName}, {headers: { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token,
      }})
  
      return response.status;

}

  export async function getScoupesWithGeneralPosition(){
    try{
        return await getScoupesWithGeneralPositionReq(await getAccessToken())
    }
    catch{
        return await getScoupesWithGeneralPositionReq((await refreshToken()).access_token)
    }
}

export async function getScoupesWithGeneralPositionReq(token: string) {

      const response = await axiosInstance.post('get/scoupeswithgeneralposition',{}, {headers: { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token,
      }})
      console.log(response.data)
      return response.data;

}

export async function deleteScoupeGeneralPosition(ID:number){
    try{
        return deleteScoupeGeneralPositionReq(ID, await getAccessToken())
    }
    catch{
        return deleteScoupeGeneralPositionReq(ID, (await refreshToken()).access_token)
    }
}

export async function deleteScoupeGeneralPositionReq(ID:number, token: string) {

      const response = await axiosInstance.post('create/scoupegeneralposition',{ID}, {headers: { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token,
      }})
  
      return response.status;

}

export async function setUserForScoupeGeneralPosition(ScoupeID:number, UserID:number){
    try{
        return setUserForScoupeGeneralPositionReq(ScoupeID, UserID, await getAccessToken());
    }
    catch{
        return setUserForScoupeGeneralPositionReq(ScoupeID, UserID, (await refreshToken()).access_token);
    }
}

export async function setUserForScoupeGeneralPositionReq(ScoupeID:number, UserID:number, token: string) {

    const response = await axiosInstance.post('set/userforscoupegeneralposition',{ScoupeID, UserID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+token,
    }})

    return response.status;

}