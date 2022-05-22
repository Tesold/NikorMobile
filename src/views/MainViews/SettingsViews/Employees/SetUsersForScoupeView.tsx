import React, { useMemo, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getScoupes } from "../../../../requests/MainTabRequests/SettingsRequests/Scoupe";
import { ScoupeItem } from "../Company/Scoupe/ScoupeItem";
import { Title } from "../titles/Title";
import { EmployeeItem, EmployeeItemForScoupe, EmployeeItemFullForScoupe } from "../../EmployeesViews/Items/EmployeeItem";
import { deleteEmployeesScoupe, getEmployees, setScoupeForEmployee } from "../../../../requests/MainTabRequests/EmployeersRequests/EmployeesRequests";
import { setUserForScoupeGeneralPosition } from "../../../../requests/MainTabRequests/SettingsRequests/ScoupeGeneralPosition";

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


export function SetUsersForScoupeScreen(props:any)
{
    const deleteOneButtonAlert = () =>
            Alert.alert(
                "Сотрудник",
                "Удален из подразделения!",
                [
                { text: "OK", onPress: () => console.log("Успешно удален!") }
                ]
            );

    const createOneButtonAlert = () =>
            Alert.alert(
                "Сотрудник",
                "Успешно добавлен!",
                [
                { text: "OK", onPress: () => console.log("Успешно добавлен!") }
                ]
            );

    const mount = 1;

    const [ScoupeArray, setScoupeArray] = useState(new Array);
    const [EmployeesArray, setEmployeesArray] = useState(new Array);

    const [selectedScoupeObj, setSelectedScoupeObj] = useState(Object);
    const [selectedEmployee, setSelectedEmployee] = useState(Object);



    const [modalScoupeVisible, setModalScoupeVisible] = useState(false);
    const [modalEmployeesVisible, setModalEmployeesVisible] = useState(false);



    async function callback(){
        try{
            const employeesResponse = await getEmployees();
            setEmployeesArray(employeesResponse);
        }
        catch{console.log("Cant get employees")}
    }

    async function deletecallback(UserID:number)
    {
        try{
            deleteEmployeesScoupe(UserID);
            callback();
            deleteOneButtonAlert();
        }
        catch{
            Alert.alert(
                "Сотрудник",
                "Не удалось удалить!",
                [
                { text: "OK", onPress: () => console.log("Не удалось удалить!") }
                ]
            );
        }
    }

    function renderItem(emp:any){
        if(emp?.item?.ID === selectedEmployee?.ID)
        return (<TouchableOpacity style={{alignSelf: 'center'}} onPress={()=>setSelectedEmployee(null)}><EmployeeItemFullForScoupe Employee={emp.item} deletecallback = {deletecallback}/></TouchableOpacity>)
       
        return (<TouchableOpacity style={{alignSelf: 'center'}} onPress={()=>setSelectedEmployee(emp.item)}><EmployeeItem Employee={emp.item}/></TouchableOpacity>)

        
    };

    function addRenderItem(emp:any){
        return (<TouchableOpacity onPress={ async ()=>{
            setModalEmployeesVisible(false);
            await setUserForScoupeGeneralPosition(emp.item.ID, selectedScoupeObj.ID);
            await callback();
            createOneButtonAlert();
            setModalEmployeesVisible(false);
        }}><EmployeeItem Employee={emp.item}/></TouchableOpacity>) 
    };

    useMemo(async () => {

        try{
            const scoupeResponse = await getScoupes();
            setScoupeArray(scoupeResponse.map((_value: any)=>_value));
            setSelectedScoupeObj({ScoupeName: "Выберите структуру..."});
            callback();
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    let ref:any;

    console.log(EmployeesArray.filter((element:any)=>{if(element?.Scoupe?.ID===selectedScoupeObj.ID) return true}))

    return(
        <View style={{flex:1}}>
            <Title goBack={props.navigation.goBack} name = {"Добавление в отдел"}/>
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
                visible={modalEmployeesVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalEmployeesVisible(!modalEmployeesVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.flatListStyle}>
                <FlatList data={
                EmployeesArray.filter(element=>{if(element.Scoupe===null) return element;})}
                renderItem = {addRenderItem} 
                keyExtractor={item => item.ID}/>
                </View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{setModalEmployeesVisible(false)}}>
                <View style={{height:60, width: 120, alignSelf: 'center', marginTop: 10}}>
                    <Text style={{opacity:0.75, fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'tomato'}}>Закрыть</Text>
                </View>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>

            <View style= {{width: '100%'}}>
            

            <TouchableOpacity onPress={()=>setModalScoupeVisible(true)}>
            <View style ={{marginBottom: 20, shadowRadius: 10 , shadowColor: 'black', shadowOpacity:1 ,shadowOffset: {width: 10, height: 10} ,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Text style={{opacity:0.65, fontWeight: 'bold', alignSelf: 'center'}}>{selectedScoupeObj?.ScoupeName}</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{if(selectedScoupeObj?.ID)setModalEmployeesVisible(true)}} style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
            <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>
            
            <View style={{width:'100%', height: 700}}>
            <FlatList
            data={[...EmployeesArray.filter((element:any)=>(element?.ScoupeID===selectedScoupeObj.ID))]} 
            renderItem = {renderItem} 
            keyExtractor={item => item?.ID}
            />
            </View>
         
        </View>
    </View>
    )
}
