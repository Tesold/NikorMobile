import * as SecureStore from 'expo-secure-store';
import { UserDto } from '../requests/dto/user.dto';

export async function getRefreshToken()
{
    return await SecureStore.getItemAsync("RefreshToken");
}

export async function setRefreshToken(Refreshtoken: string)
{
        await SecureStore.setItemAsync("RefreshToken", Refreshtoken);
}

export async function setUser(user: UserDto) {
    await SecureStore.setItemAsync("User", JSON.stringify(user));
}

export async function getUser()
{
    const user = await SecureStore.getItemAsync("User");
    
    if(user)
    {
    return JSON.parse(user);
    }

    throw 'НЕТ ЮЗЕРА В ПАМЯТИ!' 
}

export async function setAccessToken(Accesstoken: string)
{
        await SecureStore.setItemAsync("AccessToken", Accesstoken);
}

export async function getAccessToken()
{
    const access_token = await SecureStore.getItemAsync("AccessToken");
    if(access_token)
    return access_token;

    return 'not found'
}
    