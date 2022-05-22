import React, { useMemo, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getScoupesWithAllData } from "../../../../../requests/MainTabRequests/SettingsRequests/Scoupe";
import { ScoupeItem } from "../Scoupe/ScoupeItem";
import { DepartmentItem } from "../Department/DepartmentItem";
import { addPositionName, setManagerForPositionName } from "../../../../../requests/MainTabRequests/SettingsRequests/PositionName";
import { PositionNameItem, PositionNameItemFull } from "./PositionNameItem";
import { Title } from "../../titles/Title";

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: '100%',
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
        alignSelf: 'center'
    },
    text:
    {
        opacity: 0.6,
        fontWeight: 'bold',
        fontSize:20,
        fontFamily: "OpenSans",
        alignSelf: 'center'
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

export function AddPositionNameScreen(props:any)
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Наименование должности",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

    const mount = 1;

    const [PositionName, setPositionName] = useState(''); 

    const [ScoupeArray, setScoupeArray] = useState(new Array);
    const [PositionNamesArray, setPositionNamesArray] = useState(new Array);

    const [selectedScoupeObj, setSelectedScoupeObj] = useState(Object);
    const [selectedDepartmentObj, setSelectedDepartmentObj] = useState(Object);
    const [selectedPositionNameObj, setSelectedPositionNameObj] = useState(Object);

    const [selectedPositionName, setSelectedPositionName] = useState(null);

    const [modalScoupeVisible, setModalScoupeVisible] = useState(false);
    const [modalDepartmentVisible, setModalDepartmentVisible] = useState(false);
    const [modalPositionNameVisible, setModalPositionNameVisible] = useState(false);
    
    async function addPositionNameReq(){
        try{
        console.log(selectedPositionNameObj?.PositionName);
        const status = await addPositionName(selectedDepartmentObj.ID, PositionName);

        if(status===201)
        createOneButtonAlert();
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

    async function callbackPositionName(){
        try{
        const response = await getScoupesWithAllData();
        setScoupeArray(response)

        setSelectedScoupeObj(response.find((item:any)=>item.ID===selectedScoupeObj.ID));
        setSelectedDepartmentObj(response.find((item:any)=>item.ID===selectedScoupeObj.ID).DepartmentID.find((item:any)=>selectedDepartmentObj.ID===item.ID));
        }
        catch{}
    }

    function renderItem(emp:any){
        if(emp.item.PositionName === selectedPositionNameObj?.PositionName)
        return (<TouchableOpacity onPress={()=>setSelectedPositionNameObj(null)}><PositionNameItemFull PositionName={emp.item} callback = {callbackPositionName} setModalPositionNameVisible={setModalPositionNameVisible}/></TouchableOpacity>)
        
        return (<TouchableOpacity onPress={()=>setSelectedPositionNameObj(emp.item)}><PositionNameItem PositionName={emp.item}  /></TouchableOpacity>)
    };

    useMemo(async () => {

        try{
            const response = await getScoupesWithAllData();
            setScoupeArray(response.map((_value: any)=>_value));
            setSelectedScoupeObj({ScoupeName: "Выберите структуру..."});
            
            setSelectedDepartmentObj({DepartmentName: "Выберите отдел..."});
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    let ref: any;

    return(
        <View>
            <Title goBack={props.navigation.goBack} name = {'Наименование должностей'}/>
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
                                                        setSelectedDepartmentObj(emp.item.DepartmentID[0]);
                                                        
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
                <FlatList data={selectedDepartmentObj?.PositionName?.filter((e:any)=>e.PositionName!==selectedPositionNameObj?.PositionName)}
                renderItem = {(emp)=><TouchableOpacity onPress={()=>{
                                                        setManagerForPositionName(selectedPositionNameObj.ID, emp.item.ID);
                                                        setModalPositionNameVisible(false);
                                                        setSelectedDepartmentObj({
                                                            ...selectedDepartmentObj,
                                                            PositionName:
                                                                selectedDepartmentObj.PositionName.map(
                                                                    (e:any)=> 
                                                                    {
                                                                        if(e.PositionName===selectedPositionNameObj.PositionName)
                                                                        {
                                                                            console.log("chto ishu2")
                                                                            console.log({...e, ObeyTo:{PositionName:emp.item.PositionName}});
                                                                            return {...e, ObeyTo:{PositionName:emp.item.PositionName}};
                                                                        }
                                                                        console.log("chto ishu")
                                                                            console.log(e);
                                                                            return e;
                                                                    })
                                                                
                                                                })

                                                        }

                                                        }>

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
             
            <TextInput ref={(reff)=>ref=reff} value = {PositionName} onChangeText={setPositionName} textAlign= 'center' placeholder='Имя должности' maxLength={32} style={styles.input}/>
            
            <TouchableOpacity style = {{marginBottom: 20}} onPress={async ()=>{
                addPositionNameReq()
                callbackPositionName();
                setPositionName('');
                TextInput.State.blurTextInput(ref);
            }}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>
            
            <View style = {{width: '100%'}}>
            <FlatList data={selectedDepartmentObj?.PositionName} renderItem = {renderItem} keyExtractor={item => item.ID}/>
            </View>
            </View>
        </View>

        </View>
    )
}