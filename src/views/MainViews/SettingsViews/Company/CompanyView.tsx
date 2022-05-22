
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../../../../../redux/slice';
import { setRefreshToken } from '../../../../store/authToken';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFF2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {marginVertical:10,justifyContent: 'center', alignContent: 'center',height: '7%', width: '60%', backgroundColor: '#BFE4A9', borderRadius: 10}
    
  });

export function CompanyScreen (props:any)
{

    return(
      
        <View style={styles.container}>

            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('AddScoupeGeneralPosition')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Управляющие структурой</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('AddPosition')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Должности</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('AddPositionName')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Наименования должностей</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('AddDepartment')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Отделы</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.button}
              onPress={() =>
              props.navigation.navigate('AddScoupe')
            }>
              <Text style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.7}}>Структуры</Text>
            </TouchableOpacity>

        </View>
    )
}