import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacityBase, TouchableOpacity} from "react-native";

const style=StyleSheet.create(
{
    container:
    {
        //flex:1,
        height: '4%',
        width: '100%',
        backgroundColor: '#BFE4A9',
        elevation: 10,
        flexDirection: 'row',
    }
})

export function Title({goBack, name}:any)
{
    return(
    <View style={style.container}>
        <TouchableOpacity onPress={()=>goBack()} style={{flex:1, alignSelf: 'center', alignItems: 'flex-start'}}>
            <Image
            style={{width: '60%', height: '60%', alignSelf: 'flex-start'}}
            resizeMode='contain'
            source={
              require('D:/JS/NikorMobile/assets/icons/left-arrowhead.png')
            }
            />
        </TouchableOpacity>
        <Text style={{flex:6, letterSpacing: 1, opacity: 0.65, textAlign:'center', fontSize:17, fontWeight: 'bold'}}>{name}</Text>
        <View style={{flex:1}}></View>
    </View>
    )
}