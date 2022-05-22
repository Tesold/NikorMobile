import React, { useMemo, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { getUser } from '../../../store/authToken';

const itemHeight = (Dimensions.get('window').height)

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: '100%',
      height: '10%',
      backgroundColor: '#77A75C',
      padding: 5,
      elevation: 5
    },
    elements: {
      flex: 3,
      alignSelf: 'center',
    },
    logo:{
      width: '100%',
      height: '100%',
      flex: 1
    },
    AvatarPos:{
      width: '100%',
      height: '100%',
      flex: 1
    }
  });

export function TitleView(props:any)
    {

      const [user, setUser] = useState({FirstName: String, LastName: String, MiddleName: String, PositionName: String});  

      const mount = 1;

      useMemo(async ()=>{
        setUser(await getUser())
      },[mount]);

        console.log(props)
      return(
        <View style={styles.container}>
            
            <Image
            style={styles.logo}
            resizeMode='contain'
            source={
              require('D:/JS/NikorMobile/assets/images/logoW.png')
            }
            />
            

            <View style={styles.elements}>
            <Text style={{textAlign:'center', color: 'white', fontWeight: 'bold'}}>{user?.LastName} {user?.FirstName} {user?.MiddleName}</Text>
            <Text style={{textAlign:'center', color: 'white'}}>{user?.PositionName}</Text>
            </View>

            <Image
            style={styles.logo}
            resizeMode='contain'
            source={
              require('D:/JS/NikorMobile/assets/images/logoW.png')
            }
            />

        </View>
            )
    }