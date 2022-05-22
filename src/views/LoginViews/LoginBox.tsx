import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, KeyboardAvoidingView, Platform} from 'react-native';
import { useDispatch } from 'react-redux';
import { LogIn, refreshToken } from '../../requests/authRequests';
import { setLogIn } from '../../../redux/actions';
import { clearAllListeners } from '@reduxjs/toolkit';
import { LOG_IN } from '../../../redux/slice';


const itemHeight = (Dimensions.get('window').height)

export function LoginBox(callback:any)
{

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const dispatch = useDispatch();

    const check = async () => {


        try
        {
            const mount = true;
            let responses:any;
            if(mount)
            responses = await LogIn(Username.replace(/\s+/g, ''), Password);

            setUsername('');
            setPassword('');

            if(responses.status===201)
            {   
                //dispatch({type:'SET_ACCESSTOKEN', payload:responses.access_token});
                setUsername('');
                setPassword('');
                dispatch(LOG_IN());
            }
        }
        catch{
            console.log('Authorization error');
        }



    };

    const mount =1;

    useMemo(async ()=>{
        try{
        const res = await refreshToken();
        if(res.access_token)
        dispatch(LOG_IN())
        return ()=>clearAllListeners()
        }
        catch{}
    }, [mount])
    
    return (
            <View style= {styles.container}>
                
                <TextInput value = {Username} onChangeText={setUsername}  autoFocus={true} textContentType='username' autoComplete='username' textAlign= 'center' placeholder='Username' maxLength={16} style={styles.input}/>
                <TextInput value = {Password} onChangeText={setPassword} autoFocus={false} secureTextEntry={true} textContentType='password' autoComplete='password' placeholder='Password' textAlign= 'center' maxLength={32} style={styles.input}/>
                <TouchableOpacity onPress={check}>
                <Text style = {styles.text}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>callback.callback()}>
                <Text style = {styles.text}>Регистрация</Text>
                </TouchableOpacity>

            </View>
            )
}

const styles = StyleSheet.create({
    container: {
        
      width:'100%',
      height: itemHeight*0.25,
      backgroundColor: '#BFE4A9',
      marginVertical: 10,
      alignItems: 'center',
      elevation: 10,
      paddingVertical: 20,
      justifyContent: 'space-between'
    },

    input:
    {
        elevation: 5,
        borderRadius: 5,

        width:'70%',
        backgroundColor: 'white',
        fontSize:20,
        fontFamily: "OpenSans",
    },
    text:
    {
        opacity: 0.6,
        fontWeight: 'bold',
        fontSize:20,
        fontFamily: "OpenSans",
        //autoComplete: 'password'
    }
  });