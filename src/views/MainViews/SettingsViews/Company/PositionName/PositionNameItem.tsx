import React from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { deleteDepartment } from "../../../../../requests/MainTabRequests/SettingsRequests/Department";
import { deletePositionName } from "../../../../../requests/MainTabRequests/SettingsRequests/PositionName";

const itemHeight = (Dimensions.get('window').height);
const itemWidth = (Dimensions.get('window').width);

const styles = StyleSheet.create(
    {
        container:
        {
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 10,
            height: itemHeight*0.05,
            width: '95%',
            backgroundColor: '#F1F1F1',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            elevation: 5,
            alignSelf: 'center'
        },
          data:
          {
            flex: 4,
              alignItems: 'center',
              justifyContent: 'space-between'
              //justifyContent: 'center'
          }
    }
)

export function PositionNameItem({PositionName}:any)
{
    return(
            <View style={{...styles.container}}>
                        <Text style={{alignSelf: 'center' ,opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{PositionName.PositionName}</Text> 
            </View>
    )
}

export function PositionNameItemFull({PositionName, callback, setModalPositionNameVisible}:any)
{

    const createDeleteAlert = () =>
    Alert.alert(
        "Структура",
        `Удалить ${PositionName.PositionName}?`,
        [
        { text: "Да", onPress: () => {deletePositionName(PositionName.ID); callback()} },
        { text: "Нет", onPress:()=>{}}
        ]
    );
    console.log(PositionName.ID)
    return(
        <View style={{...styles.container, backgroundColor:'#BFE4A9', height: itemHeight*0.16, flex: 1, justifyContent: 'space-around'}}>

                    <Text style={{marginBottom: 15, alignSelf: 'center' ,opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{PositionName.PositionName}</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <View style={{flex:1}}></View>
              <TouchableOpacity onPress={()=>{
                setModalPositionNameVisible()
              }} style={{flex:3, flexDirection: 'row'}}>
              <Text style={{flex:2, textAlign: 'center', opacity: 0.65, fontSize: 14, fontWeight: 'bold', marginBottom: 15}}>Командующий: {PositionName?.ObeyTo?.PositionName||'Нет командующего'}</Text>
              
              <View style={{flex:1, justifyContent:'flex-start', alignContent: 'flex-start'}}>
              <Image
                style={{height: '20%', width: '10%'}}
                resizeMode='cover'
                source={
                require('D:/JS/NikorMobile/assets/icons/iconpencil.png')
                }
                />
              </View>
              
            </TouchableOpacity>
          </View>
                    <View style={{width: '100%', flexDirection: "row", alignSelf: "center", justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{backgroundColor: '#F7FFF2', width: '40%', borderRadius: 5}}>
                    <Text style = {{marginVertical: 2,alignSelf: 'center' ,opacity:0.65, fontWeight: 'bold'}}>Редактировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>createDeleteAlert()} style={{alignSelf: 'center' ,width:'35%', backgroundColor: 'tomato', borderRadius: 5, justifyContent: 'center', alignContent: 'center'}}>
                    <Text style = {{marginVertical: 2,marginHorizontal: 10,alignSelf: 'center' ,opacity:0.65, fontWeight: 'bold'}}>Удалить</Text>
                    </TouchableOpacity>
                    </View>
        </View>)
}