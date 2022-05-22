import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { addPosition, getAllPositions, getPositionNamePosition } from "../../../../../requests/MainTabRequests/SettingsRequests/Position";
import { PositionItem, PositionItemFull } from "./PositionItem";
import { getScoupesWithAllData } from "../../../../../requests/MainTabRequests/SettingsRequests/Scoupe";
import { produceWithPatches } from "immer";
import { ScoupeItem } from "../Scoupe/ScoupeItem";
import { DepartmentItem } from "../Department/DepartmentItem";
import { PositionNameItem } from "../PositionName/PositionNameItem";
import { Title } from "../../titles/Title";

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: '100%',//itemHeight*0.75,
      backgroundColor: '#F7FFF2',
      marginVertical: 0,
      alignItems: 'center',
      elevation: 10,
      paddingBottom: 50,
      paddingTop: 15,
      justifyContent: 'flex-start'
      
    },

    input:
    {
        elevation: 5,
        borderRadius: 5,
        marginVertical:10,
        width:'70%',
        backgroundColor: 'white',
        fontSize:16,
        fontFamily: "OpenSans",
    },
    text:
    {
        opacity: 0.6,
        fontWeight: 'bold',
        fontSize:20,
        fontFamily: "OpenSans",
        //autoComplete: 'password'
    },
    datePickerStyle: {
        width: '60%',
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

export function AddPositionScreen(props:any)
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Должность",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

    const mount = 1;

    const [PositionCode, setPositionCode] = useState(''); 

    const [ScoupeArray, setScoupeArray] = useState(new Array);
    const [AllPositionsArray, setAllPositionsArray] = useState(new Array);

    const [selectedScoupeObj, setSelectedScoupeObj] = useState(Object);
    const [selectedDepartmentObj, setSelectedDepartmentObj] = useState(Object);
    const [selectedPositionNameObj, setSelectedPositionNameObj] = useState(Object);

    const [selectedPosition, setSelectedPosition] = useState(null);

    const [modalScoupeVisible, setModalScoupeVisible] = useState(false);
    const [modalDepartmentVisible, setModalDepartmentVisible] = useState(false);
    const [modalPositionNameVisible, setModalPositionNameVisible] = useState(false);

    async function addPositionReq(){
        try{
        console.log(selectedPositionNameObj.PositionName);
        const status = await addPosition(selectedPositionNameObj.ID, PositionCode);

        if(status===201){
        createOneButtonAlert();
        callbackPosition();
        }
        }
        catch{
            Alert.alert(
                "Наименование должности",
                "Ошибка!",
                [
                { text: "OK", onPress: () => console.log("Ошибка!") }
                ]
            );
        }
    }

    async function callbackPosition(){
        try{
        const response = await getAllPositions();
        setAllPositionsArray(response)
        console.log(response)
        //setPositionArray(getCurrentPositionArray());
        }
        catch{console.log("cant get pos")}
    }

    function renderItem(emp:any){
        if(emp.index === selectedPosition)
        return (<TouchableOpacity onPress={()=>setSelectedPosition(null)}><PositionItemFull Position={emp.item} callback = {callbackPosition}/></TouchableOpacity>)
        
        return (<TouchableOpacity onPress={()=>setSelectedPosition(emp.index)}><PositionItem Position={emp.item}  /></TouchableOpacity>)
    };

    useMemo(async () => {

        try{
            const response = await getScoupesWithAllData();
            setScoupeArray(response.map((_value: any)=>_value));
            callbackPosition();
            setSelectedScoupeObj({ScoupeName: "Выберите структуру..."});
            
            setSelectedDepartmentObj({DepartmentName: "Выберите отдел..."});

            setSelectedPositionNameObj({PositionName: "Выберите наименование должности..."});
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    function getCurrentPositionArray(){
        try{
        const pos = AllPositionsArray.filter(position=>{if(position.PositionNameID===selectedPositionNameObj.ID) return position; return;});


        pos.slice(undefined)
        console.log(pos.length)
        console.log(pos)

        if(pos)
        return pos;

        return null;
        }
        catch { return undefined}
    }

    let ref:any;

    return(
        <View>
            <Title goBack={props.navigation.goBack} name = {"Должности"}/>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalScoupeVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalScoupeVisible(!modalScoupeVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.flatListStyle}>
                <FlatList data={ScoupeArray}
                renderItem = {(emp)=><TouchableOpacity onPress={()=>{

                                                        setSelectedScoupeObj(emp.item);
                                                        if(emp.item.DepartmentID)
                                                        {
                                                        setSelectedDepartmentObj(emp.item.DepartmentID[0]);
                                                        if(emp.item.DepartmentID[0]?.PositionName)
                                                        setSelectedPositionNameObj(emp.item.DepartmentID[0].PositionName[0]);
                                                        else setSelectedPositionNameObj({})
                                                        }
                                                        setModalScoupeVisible(false);
                                                        }}>
                                                            

                        <ScoupeItem Scoupe={emp.item} modalScoupeCallback/>
                        </TouchableOpacity>} 

                keyExtractor={item => item.ID}/>
                </View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{setModalScoupeVisible(false)}}>
                <View style={{height:60, width: 120, alignSelf: 'center', marginTop: 10}}>
                    <Text style={{opacity:0.75, fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'tomato'}}>Закрыть</Text>
                </View>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDepartmentVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalDepartmentVisible(!modalDepartmentVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.flatListStyle}>
                <FlatList data={selectedScoupeObj?.DepartmentID}
                renderItem = {(emp)=><TouchableOpacity onPress={()=>{

                                                        setSelectedDepartmentObj(emp.item);
                                                        if(emp.item.PositionName)
                                                        setSelectedPositionNameObj(emp.item.PositionName[0]);
                                                        setModalDepartmentVisible(false);
                                                        }}>

                        <DepartmentItem Department={emp.item}/>
                        </TouchableOpacity>} 

                keyExtractor={item => item.ID}/>
                </View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{setModalDepartmentVisible(false)}}>
                    <View style={{height:60, width: 120, alignSelf: 'center', marginTop: 10}}>
                    <Text style={{opacity:0.75, fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'tomato'}}>Закрыть</Text>
                    </View>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPositionNameVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalDepartmentVisible(!modalDepartmentVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.flatListStyle}>
                <FlatList data={selectedDepartmentObj?.PositionName}
                renderItem = {(emp)=><TouchableOpacity onPress={()=>{

                                                        setSelectedPositionNameObj(emp.item);
                                                        setModalPositionNameVisible(false);
                                                        }}>

                        <PositionNameItem PositionName={emp.item}/>
                        </TouchableOpacity>} 

                keyExtractor={item => item.ID}/>
                </View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{setModalPositionNameVisible(false)}}>
                <View style={{height:60, width: 120, alignSelf: 'center', marginTop: 10}}>
                    <Text style={{opacity:0.75, fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'tomato'}}>Закрыть</Text>
                    </View>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>

            <View style= {styles.container}>

            

            
            <View style={{width: '100%', justifyContent:'flex-start'}}>
            <TouchableOpacity onPress={()=>setModalScoupeVisible(true)}>
            <View style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Text style={{opacity:0.65, fontWeight: 'bold', alignSelf: 'center'}}>{selectedScoupeObj?.ScoupeName}</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setModalDepartmentVisible(true)}>
            <View style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Text style={{opacity:0.65, fontWeight: 'bold', alignSelf: 'center'}}>{selectedDepartmentObj?.DepartmentName}</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setModalPositionNameVisible(true)}>
            <View style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Text style={{opacity:0.65, fontWeight: 'bold', alignSelf: 'center'}}>{selectedPositionNameObj?.PositionName}</Text>
            </View>
            </TouchableOpacity>
            </View>
            
            
            <TextInput ref={reff=>ref=reff} value = {PositionCode} onChangeText={setPositionCode} textAlign= 'center' placeholder='Код должности' maxLength={32} style={styles.input}/>
            
            <TouchableOpacity style = {{marginBottom: 20}} onPress={()=>{
                addPositionReq()
                callbackPosition();
                setPositionCode('');
                TextInput.State.blurTextInput(ref);
            }}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>
            
            <View style = {{width: '100%'}}>
            <FlatList data={getCurrentPositionArray()} renderItem = {renderItem} keyExtractor={item => item?.ID}/>
            </View>
            </View>
        </View>
    )
}