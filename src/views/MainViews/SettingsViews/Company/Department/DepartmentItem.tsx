import React from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { deleteDepartment } from "../../../../../requests/MainTabRequests/SettingsRequests/Department";

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

export function DepartmentItem({Department}:any)
{
    return(
            <View style={{...styles.container}}>
                        <Text style={{alignSelf: 'center' ,opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{Department.DepartmentName}</Text> 
            </View>
    )
}

export function DepartmentItemFull({Department, callbackDepartment}:any)
{

    const createDeleteAlert = () =>
    Alert.alert(
        "Подразделение",
        `Удалить ${Department.DepartmentName}?`,
        [
        { text: "Да", onPress: () => {deleteDepartment(Department.ID); callbackDepartment()} },
        { text: "Нет", onPress:()=>{}}
        ]
    );

    return(
        <View style={{...styles.container, backgroundColor:'#BFE4A9', height: itemHeight*0.09}}>
        
                    <Text style={{marginBottom: 15, alignSelf: 'center' ,opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{Department.DepartmentName}</Text>
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