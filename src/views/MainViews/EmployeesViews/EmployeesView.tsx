
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View , Text} from 'react-native';
import { EmployeeTitle } from './EmployeeTitle';
import { getEmployees } from '../../../requests/MainTabRequests/EmployeersRequests/EmployeesRequests';
import { EmployeeItem, EmployeeItemFull } from './Items/EmployeeItem';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFF2',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });

export function EmployeesScreen(props:any)
{
    const [data, setData] = useState(new Array);

    const i = 0;

    async function fillData()
    {
        try{setData(await getEmployees());}
        catch{console.log("Cant get employeers")}
    }

    function OpenEmployeeCard(Employee: any)
    {
        props.navigation.navigate('EmployeeCard', {Employee, fillData})
    }

    useMemo(async () => {
        fillData();
    }, [i]);

    const renderItem = (emp:any) => {
        
        if(emp.index === selectedId)
        return (<TouchableOpacity onPress={()=>setSelectedId(null)}><EmployeeItemFull Employee={emp.item} OpenCardCall={OpenEmployeeCard}/></TouchableOpacity>)
    
        return (<TouchableOpacity onPress={()=>setSelectedId(emp.index)}><EmployeeItem Employee={emp.item} /></TouchableOpacity>)
    };

    const [selectedId, setSelectedId] = useState(null);

    return(
        <View style={styles.container}>
            <EmployeeTitle/>

            <SafeAreaView style={{...styles.container, width:'100%', alignSelf: 'center'}}>
                <FlatList style={{width:'100%', alignSelf: 'center'}} data={data} renderItem={renderItem} extraData={selectedId} keyExtractor={item => item.ID} />
                <TouchableOpacity onPress={()=>fillData()}>
                    <Text style = {{opacity: 0.65, paddingVertical: 15, fontSize:17, letterSpacing: 1, textAlign:'center',  fontWeight: 'bold'}}>Обновить</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}