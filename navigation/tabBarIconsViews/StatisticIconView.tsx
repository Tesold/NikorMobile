import React from "react";
import { Image, StyleSheet, View } from "react-native";

const styles=StyleSheet.create(
{
    container:
    {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export function StatisticIconView(props:any)
{
  return(
      <View style={styles.container}>
        
        <Image
        resizeMode="contain"
        style={{height: 25, width: 25}}
        source={
          require('D:/JS/NikorMobile/assets/tabIcons/bar-chart.png')
        }
        />       
      </View>
        )
}