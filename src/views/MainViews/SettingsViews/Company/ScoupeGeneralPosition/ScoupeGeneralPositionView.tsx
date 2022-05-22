import React, { useMemo, useState } from "react";
import { Alert, Dimensions, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addScoupeGeneralPosition, getScoupesWithGeneralPosition, setUserForScoupeGeneralPosition } from "../../../../../requests/MainTabRequests/SettingsRequests/ScoupeGeneralPosition";
import { ScoupeGeneralPositionItem, ScoupeGeneralPositionItemFull } from "./ScoupeGeneralPositionItem";
import { ScoupeItem } from "../Scoupe/ScoupeItem";
import { Title } from "../../titles/Title";
import { EmployeeItem } from "./EmployeeItemSGP";

const itemHeight = (Dimensions.get('window').height);
const itemWidth = (Dimensions.get('window').width);

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
      justifyContent: 'flex-start',
      alignSelf: 'center'
      
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


export function AddScoupeGeneralPositionScreen(props:any)
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Подразделение",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

    const mount = 1;

    const [ScoupeGeneralPositionName, setScoupeGeneralPositionName] = useState(''); 

    const [ScoupeArray, setScoupeArray] = useState(new Array);
    const [ScoupeGeneralPositionsArray, setScoupeGeneralPositionsArray] = useState(new Array);

    const [selectedScoupeObj, setSelectedScoupeObj] = useState(Object);
    const [selectedScoupeGeneralPositionObj, setSelectedScoupeGeneralPositionObj] = useState(Object);

    const [modalScoupeVisible, setModalScoupeVisible] = useState(false);
    const [modalScoupeGeneralPositionVisible, setModalScoupeGeneralPositionVisible] = useState(false);


    async function addScoupeGeneralPositionReq(){
        try{
        const status = await addScoupeGeneralPosition(selectedScoupeObj.ID, ScoupeGeneralPositionName);

        if(status===201)
        createOneButtonAlert();
        }
        catch{
            Alert.alert(
                "Подразделение",
                "Ошибка!",
                [
                { text: "OK", onPress: () => console.log("Ошибка!") }
                ]
            );
        }
    }

    async function callbackScoupeGeneralPosition(){
        try{
        const response = await getScoupesWithGeneralPosition();
        setScoupeArray(response)
        setScoupeGeneralPositionsArray(response.find((item:any)=>item.ID===selectedScoupeObj.ID).ScoupeGeneralPosition);
        }
        catch{}
    }

    function renderItem(emp:any){
        if(emp?.item?.ID === selectedScoupeGeneralPositionObj?.ID)
        return (<TouchableOpacity onPress={()=>setSelectedScoupeGeneralPositionObj(null)}><ScoupeGeneralPositionItemFull ScoupeGeneralPosition={emp.item} callbackScoupeGeneralPosition = {callbackScoupeGeneralPosition} setModalScoupeGeneralPositionVisible={openModal}/></TouchableOpacity>)
        
        return (<TouchableOpacity onPress={()=>setSelectedScoupeGeneralPositionObj(emp.item)}><ScoupeGeneralPositionItem ScoupeGeneralPosition={emp.item}  /></TouchableOpacity>)
    };

    useMemo(async () => {

        try{
            const response = await getScoupesWithGeneralPosition();

            setScoupeArray(response.map((_value: any)=>_value));
            callbackScoupeGeneralPosition();
            setSelectedScoupeObj({ScoupeName: "Выберите структуру..."});
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    let ref:any;

    function openModal()
    {
        setModalScoupeGeneralPositionVisible(true);
    }

    return(
        <View>
            <Title goBack={props.navigation.goBack} name = {"Отделы"}/>
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
                                                        if(emp.item.ScoupeGeneralPosition)
                                                        {
                                                        setScoupeGeneralPositionsArray(emp.item.ScoupeGeneralPosition);
                                                        setModalScoupeVisible(false);
                                                        }}}>
                                                            

                        <ScoupeItem Scoupe={emp.item}/>
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
                visible={modalScoupeGeneralPositionVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalScoupeGeneralPositionVisible(modalScoupeGeneralPositionVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.flatListStyle}>
                <FlatList data={selectedScoupeObj?.User?.filter((e:any)=>e.Position==null&&e.GeneralPosition==null&&e.ScoupeGeneralPosition==null)}
                renderItem = {(emp)=><TouchableOpacity onPress={()=>{
                                                        console.log(selectedScoupeGeneralPositionObj.ID+ " "+ emp.item.ID)
                                                        setUserForScoupeGeneralPosition(selectedScoupeGeneralPositionObj.ID, emp.item.ID);
                                                        setModalScoupeGeneralPositionVisible(false);
                                                        setSelectedScoupeGeneralPositionObj(
                                                            {...selectedScoupeGeneralPositionObj,
                                                            User: emp.item}
                                                        )
                                                    }
                                                }>

                        <EmployeeItem Employee={emp.item}/>
                        </TouchableOpacity>} 

                keyExtractor={item => item.ID}/>
                </View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{setModalScoupeGeneralPositionVisible(false)}}>
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
            
            
            <TextInput ref={(reff)=>ref=reff} value = {ScoupeGeneralPositionName} onChangeText={setScoupeGeneralPositionName} textAlign= 'center' placeholder='Имя подразделения' maxLength={32} style={styles.input}/>
            
            <TouchableOpacity style = {{marginBottom: 20}} onPress={async ()=>{
                if(ScoupeGeneralPositionName)
                addScoupeGeneralPositionReq()
                callbackScoupeGeneralPosition();
                setScoupeGeneralPositionName('');
                TextInput.State.blurTextInput(ref);
            }}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>
            
            <View style = {{width: '100%', height: '74%'}}>
            <FlatList data={ScoupeGeneralPositionsArray} renderItem = {renderItem} keyExtractor={item => item.ID}/>
            </View>
            </View>
        </View>
    </View>
    )
}

