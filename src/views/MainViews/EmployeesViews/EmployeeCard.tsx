
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View , Text, Image, TouchableOpacityBase, TouchableOpacity, Modal, Alert, FlatList} from 'react-native';
import { getScoupe } from '../../../requests/authRequests';
import { getFreePositions, setEmployeeForPosition } from '../../../requests/MainTabRequests/SettingsRequests/Position';
import { PositionItem } from '../SettingsViews/Company/Position/PositionItem';



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFF2',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logo:{
      width: '35%',
      height: '35%',
      alignSelf: 'center',
      marginRight: 10,
      paddingVertical: 25
    },
    text:
    {
      opacity: 0.65,
      fontSize: 24,
      marginHorizontal: 5,
      fontWeight: 'bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      //backgroundColor: 'black',
      height: '100%',
      //opacity: 0.5,
    },
    backView:
    {
      opacity: 0.5,
      backgroundColor: 'black',
      height: '100%',
      width: '100%',
    },
  modalView: {
      opacity: 1,
      justifyContent:'center',
      width: '90%',
      height: '60%',
      margin: 20,
      backgroundColor: "#BFE4A9",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: "black",

      shadowOpacity: 1,
      shadowRadius: 500,
      elevation: 5
    },
    flatListStyle:{
      flex:10, width: "100%", justifyContent: 'center', backgroundColor: "#E5F4DC", borderRadius: 10
    }
  });

  export function EmployeeCardScreen({navigation, route}:any)
  {


    const [PositionsArray, setPositionsArray] = useState(new Array);

    const [modalPositionVisible, setModalPositionVisible] = useState(false);

    async function setPositionsAsync()
    {
      setPositionsArray(await getFreePositions(route.params?.Employee.Position.PositionName.Department.ID));
    }

    return(
        <View style={styles.container}>
            <Image
              style={styles.logo}
              resizeMode='contain'
              source={
              require('D:/JS/NikorMobile/assets/images/logoW.png')
            }
            />

          <Modal
              animationType="fade"
              transparent={true}
              visible={modalPositionVisible}
              onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalPositionVisible(!modalPositionVisible);
              }}
          >
              <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={styles.flatListStyle}>
              <FlatList data={PositionsArray}
              renderItem = {
                (emp:any)=><TouchableOpacity
                         onPress={()=>{
                                        setEmployeeForPosition(route.params?.Employee.ID, emp.item.ID);
                                        setModalPositionVisible(false);
                                        route.params.Employee.ID=emp.item.ID;
                                      }}>
                                                          

                      <PositionItem Position={emp.item}/>
                      </TouchableOpacity>} 

              keyExtractor={item => item.ID}/>
              </View>
              <View style={{flex:1}}>
              <TouchableOpacity onPress={()=>{setModalPositionVisible(false)}}>
              <View style={{height:60, width: 120, alignSelf: 'center', marginTop: 10}}>
                  <Text style={{opacity:0.75, fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'tomato'}}>Закрыть</Text>
              </View>
              </TouchableOpacity>
              </View>
              </View>
              </View>
          </Modal>

          <View></View>
          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={styles.text}>{route.params?.Employee.LastName} {route.params?.Employee.FirstName} {route.params?.Employee.MiddleName}</Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{flex:2, textAlign: 'center', opacity: 0.65, fontSize: 20, fontWeight: 'bold'}}>{route.params?.Employee?.Scoupe?.ScoupeName||"Не в структуре"}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <View style={{flex:1}}></View>
              <TouchableOpacity
              disabled={route.params?.Employee?.GeneralPosition?.GeneralPositionName||route.params?.Employee?.ScoupeGeneralPosition?.ScoupeGeneralPositionName}
              onPress={()=>{
                setPositionsAsync();
                setModalPositionVisible(true);
                console.log(PositionsArray);
              }} style={{flex:3, flexDirection: 'row'}}>
              <Text style={{flex:2, textAlign: 'center', opacity: 0.65, fontSize: 20, fontWeight: 'bold'}}>{route.params?.Employee?.Position?.PositionCode||route.params?.Employee?.GeneralPosition?.GeneralPositionName||route.params?.Employee?.ScoupeGeneralPosition?.ScoupeGeneralPositionName||'Нет должности'}</Text>
              
              <View style={{flex:1, justifyContent:'flex-start', alignContent: 'flex-start'}}>
              <Image
                 style={{height: '30%', width: '30%'}}
                 resizeMode='contain'
                source={
                require('D:/JS/NikorMobile/assets/icons/iconpencil.png')
                }
                />
              </View>
              
            </TouchableOpacity>
          </View>
        </View>
    )

  }


