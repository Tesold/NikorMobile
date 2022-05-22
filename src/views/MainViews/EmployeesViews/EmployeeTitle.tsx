import React from "react";
import { Text, View } from "react-native";



const style=
{
    container:
    {
        height: '4%',
        width: '100%',
        backgroundColor: '#BFE4A9',
        elevation: 10
    }
}

export function EmployeeTitle()
{
    return(
    <View style={style.container}>
        <Text style={{opacity: 0.65, fontSize:17, letterSpacing: 1, textAlign:'center',  fontWeight: 'bold'}}>Сотрудники</Text>
    </View>
    )
}