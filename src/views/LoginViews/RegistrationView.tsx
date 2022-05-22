
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, EmitterSubscription, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Registration } from '../../requests/authRequests';
import { TextInputMask } from 'react-native-masked-text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeListener } from '@reduxjs/toolkit';


const itemHeight = (Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: '100%',//itemHeight*0.75,
      backgroundColor: '#BFE4A9',
      marginVertical: 0,
      alignItems: 'center',
      elevation: 10,
      paddingBottom: 50,
      justifyContent: 'center',
      
    },

    input:
    {
        elevation: 5,
        borderRadius: 5,
        marginVertical:10,
        width:'70%',
        backgroundColor: 'white',
        fontSize:20,
        fontFamily: "OpenSans",
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:
    {
        opacity: 0.6,
        fontWeight: 'bold',
        fontSize:20,
        fontFamily: "OpenSans",
        paddingVertical: 35
        //autoComplete: 'password'
    },
    datePickerStyle: {
        width: '60%',
      },
  });

  const container = StyleSheet.create({
    container: {
        width:'100%',
        height: '180%',//itemHeight*0.75,
        backgroundColor: '#BFE4A9',
        marginVertical: 0,
        alignItems: 'center',
        elevation: 10,
        paddingBottom: 50,
        justifyContent: 'center'
      }
  });

 

export function RegistrtionScreen(props:any)
{

    let subs:EmitterSubscription[];
    const [Nickname, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Middlename, setMiddlename] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBday] = useState('');
    const [date, setDate] = useState('');
    const [Code, setCode] = useState('');

    const userData = {
        Nickname: Nickname,
        Password: Password,
        FirstName: Firstname,
        LastName: Lastname,
        MiddleName: Middlename,
        Email: Email,
        Birthday: date,
        Timezone: 3,
        PasswordHash: '',
        Salt: ''
    }

    useEffect(() => {

      subs=[
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
      ]
        // cleanup function
        return () => {
          subs.forEach(s=>s.remove())
        };
      }, []);

    
      const [keyboardStyle, setKeyboardStyle] = useState(styles.container);
      const _keyboardDidShow = () => {setKeyboardStyle(container.container);};
      const _keyboardDidHide = () => {setKeyboardStyle(styles.container);};

      const createOneButtonAlert = () =>
            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

      async function  Registrate(){
        const res = await Registration(userData, Code);

        console.log(res)

        if(res!=501)
        createOneButtonAlert();
      }

      

    return(
        
        <KeyboardAwareScrollView 
         scrollEnabled={true} contentContainerStyle={keyboardStyle} style={{flex:1, backgroundColor: '#BFE4A9'}} enableAutomaticScroll={true} enableOnAndroid = {true}>
        <View style={{width: '100%'}}>
        <TextInput value = {Nickname} onChangeText={setUsername} textAlign= 'center' placeholder='Username' maxLength={16} style={styles.input}/>
        <TextInput value = {Password} onChangeText={setPassword} autoFocus={false} secureTextEntry={true} placeholder='Password' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Firstname} onChangeText={setFirstname}  autoFocus={false} textAlign= 'center' placeholder='Firstname' maxLength={16} style={styles.input}/>
        <TextInput value = {Lastname} onChangeText={setLastname} autoFocus={false} placeholder='Lastname' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Middlename} onChangeText={setMiddlename} autoFocus={false} placeholder='Middlename' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Email} onChangeText={setEmail} autoFocus={false} placeholder='Email' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInputMask
            type={'datetime'}
            options={{
                format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            value={date}
            placeholder={'        Дата рождения'}
            onChangeText={text => setDate(text)}/>
          <TextInput value = {Code} onChangeText={setCode} autoFocus={false} placeholder='Code' textAlign= 'center' maxLength={32} style={styles.input}/>
          </View>

        <TouchableOpacity onPress={Registrate}>
        <Text style = {styles.text}>Зарегистрировать</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
       
            
        
    )
}