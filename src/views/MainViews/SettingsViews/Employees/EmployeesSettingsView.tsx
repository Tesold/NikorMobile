
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFF2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {marginVertical:10,justifyContent: 'center', alignContent: 'center',height: '7%', width: '60%', backgroundColor: '#BFE4A9', borderRadius: 10}
    
  });

export function EmployeesSettingsScreen (props:any)
{

    return(
      
        <View style={styles.container}>

            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('GetCode')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Добавить сотрудника</Text>
            </TouchableOpacity>
          
            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('SetUsersForScoupe')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Добавить в структуру</Text>
            </TouchableOpacity>
        </View>
    )
}