import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";

const itemHeight = (Dimensions.get('window').height);
const itemWidth = (Dimensions.get('window').width);

const styles = StyleSheet.create(
    {
        container:
        {
            
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 10,
            //flexDirection: "row",
            width: '95%',
            backgroundColor: '#F1F1F1',
            justifyContent: 'flex-start',
            alignContent: 'center',
            marginVertical: 10,
            elevation: 5,
            alignSelf: 'center'
        },
        logo:{
            width: '90%',
            height: '90%',
            alignSelf: 'center',
            marginRight: 10,
            flex: 1
          },
          data:
          {
                flex:2,
              alignItems: 'center',
              justifyContent: 'space-between'
              //justifyContent: 'center'
          }
    }
)

export function EmployeeItem({Employee}:any)
{
    return(
            <View style={{...styles.container, flexDirection: 'row'}}>
                <View style={{flex:1}}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={
                    require('D:/JS/NikorMobile/assets/images/logoW.png')
                    }
                    />
                </View>
                <View style={styles.data}>
                        <Text style={{opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{Employee.LastName} {Employee.FirstName} {Employee.MiddleName}</Text>
                        <Text>{Employee?.Position?.PositionCode||Employee?.GeneralPosition?.GeneralPositionName||Employee?.ScoupeGeneralPosition?.ScoupeGeneralPositionName||"Нет должности"}</Text>
                        <View style= {{justifyContent: 'center', alignContent: 'center'}}>
                            <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>8-909-954-39-07</Text>
                            <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>{Employee.Email}</Text>
                        </View>
                </View>
                    
            </View>
    )
}

export function EmployeeItemFull({Employee, OpenCardCall}:any)
{

    function DataView(){return(
        <View style = {{flex: 0.8, flexDirection: 'row', width: '90%', alignSelf: 'center', marginVertical: 5, justifyContent: 'space-around'}}>
            <View style = {{flex: 3, justifyContent: 'space-around', alignContent: "flex-start"}}>
                <Text><Text style = {{ fontSize: 10, fontWeight: 'bold', color: 'green' }}>Выполнено:</Text> </Text>
                <Text><Text style = {{ fontSize: 10, fontWeight: 'bold', color: 'red'}}>Провалено:</Text> </Text>      
            </View> 
            <View style = {{flex: 2, justifyContent: 'space-around', alignContent: "flex-start"}}>
                <Text><Text style = {{ fontSize: 10, fontWeight: 'bold'}}>Выполняется:</Text></Text>
                <Text style = {{ fontSize: 10}}><Text style = {{ fontSize: 10, fontWeight: 'bold'}}>Всего:</Text > 100</Text>      
            </View> 
        </View>
    )}

    return(
        <View style={{...styles.container, backgroundColor:'#BFE4A9', height: itemHeight*0.25}}>
        <View style={{flexDirection: 'row'}}>
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={
                require('D:/JS/NikorMobile/assets/images/logoW.png')
                }
                />
                <View style={styles.data}>
                    <Text style={{opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{Employee.LastName} {Employee.FirstName} {Employee.MiddleName}</Text>
                    <Text>{Employee?.Position?.PositionCode||Employee?.GeneralPosition?.GeneralPositionName||Employee?.ScoupeGeneralPosition?.ScoupeGeneralPositionName||"Нет должности"}</Text>
                    <View style= {{justifyContent: 'flex-end', alignContent: 'flex-end'}}>
                        <Text style = {{opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>8-909-954-39-07</Text>
                        <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>{Employee.Email}</Text>
                    </View>
                </View> 
        </View>

        <View>
        
        </View>
        <DataView/>
        <TouchableOpacity onPress={()=>OpenCardCall(Employee)} style={{justifyContent: 'center', flexDirection: 'column', backgroundColor: '#F1F1F1', borderRadius: 10, width: '30%', alignSelf:'center', height: 25, marginVertical: 5}}>
                    <Text style={{alignSelf: 'center', paddingVertical: 0}}>Открыть</Text>
        </TouchableOpacity>

        </View>
)
}

export function EmployeeItemFullForScoupe({Employee, deletecallback}:any)
{

    return(
            <View style={{...styles.container, flexDirection: 'row', height: itemHeight*0.16}}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={
                    require('D:/JS/NikorMobile/assets/images/logoW.png')
                    }
                    />
                    <View style={styles.data}>
                        <Text style={{opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{Employee?.LastName} {Employee?.FirstName} {Employee?.MiddleName}</Text>
                        <Text>{Employee?.Position?.PositionCode||Employee?.GeneralPosition?.GeneralPositionName||Employee?.ScoupeGeneralPosition?.ScoupeGeneralPositionName||"Нет должности"}</Text>
                        <View style= {{justifyContent: 'center', alignContent: 'center'}}>
                            <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>8-909-954-39-07</Text>
                            <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>{Employee.Email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>deletecallback(Employee.ID)} style={{alignSelf: 'center' ,width:'35%', backgroundColor: 'tomato', borderRadius: 5, justifyContent: 'center', alignContent: 'center'}}>
                    <Text style = {{marginVertical: 2,marginHorizontal: 10,alignSelf: 'center' ,opacity:0.65, fontWeight: 'bold'}}>Удалить</Text>
                    </TouchableOpacity>
                    
            </View>
    )
}

export function EmployeeItemForScoupe({Employee}:any)
{

    return(
            <View style={{...styles.container, flexDirection: 'row', height: 100}}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={
                    require('D:/JS/NikorMobile/assets/images/logoW.png')
                    }
                    />
                    <View style={styles.data}>
                        <Text style={{opacity: 0.65, fontSize:16, fontWeight: 'bold'}}>{Employee?.LastName} {Employee?.FirstName} {Employee?.MiddleName}</Text>
                        <Text>{Employee?.Position?.PositionCode||Employee?.GeneralPosition?.GeneralPositionName||Employee?.ScoupeGeneralPosition?.ScoupeGeneralPositionName||"Нет должности"}</Text>
                        <View style= {{justifyContent: 'center', alignContent: 'center'}}>
                            <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>8-909-954-39-07</Text>
                            <Text style = {{textAlign:'center' ,opacity: 0.65, fontSize: 12, fontWeight: 'bold'}}>{Employee?.Email}</Text>
                        </View>
                    </View>
                    
            </View>
    )
                
}