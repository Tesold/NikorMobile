
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, EmitterSubscription, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCode } from '../../../../requests/authRequests';
import { Title } from '../titles/Title';


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
        paddingVertical: 35,
        alignSelf: 'center'
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

 

export function CodeScreen(props:any)
{

    let subs:EmitterSubscription[];

    const [Email, setEmail] = useState('');
    const [Code, setCode] = useState('');

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

      async function getCodeButton(){
          const code = await getCode(Email);
        setCode(code);
      }

      console.log("Code: "+Code)

    return(
        <View style={{flex:1}}>
        <Title goBack={props.navigation.goBack} name={"Добавить сотрудника"}/>
        <KeyboardAwareScrollView 
         scrollEnabled={true} contentContainerStyle={keyboardStyle} style={{flex:1, backgroundColor: '#BFE4A9'}} enableAutomaticScroll={true} enableOnAndroid = {true}>
        
        <View style={{width: '100%'}}>
        <TextInput value = {Email} onChangeText={setEmail} autoFocus={false} placeholder='Email' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TouchableOpacity onPress={getCodeButton}>
        <Text style = {styles.text}>Получить код</Text>
        </TouchableOpacity>
        <TextInput editable= {true} value = {Code} onChangeText={setCode} autoFocus={false} placeholder='Code' textAlign= 'center' maxLength={32} style={styles.input}/>
          </View>
        </KeyboardAwareScrollView>
        </View>
       
            
        
    )
}