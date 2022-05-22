import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RegistrtionScreen } from "../../src/views/LoginViews/RegistrationView";
import { View } from "react-native";
import { EmployeesScreen } from "../../src/views/MainViews/EmployeesViews/EmployeesView";
import { EmployeeCardScreen } from "../../src/views/MainViews/EmployeesViews/EmployeeCard";

const Stack = createNativeStackNavigator();

export function EmployeesStackNavigator()
{
    
    const settingsStack = createNativeStackNavigator();

    return(
        <View style = {{flex:1}}>
        <settingsStack.Navigator>
                
            <Stack.Screen options = {{headerShown: false}} name="Employeers" component={EmployeesScreen} />
            <Stack.Screen options = {{headerShown: false}} name="EmployeeCard" component={EmployeeCardScreen} />

        </settingsStack.Navigator>
        </View>
    )
  }