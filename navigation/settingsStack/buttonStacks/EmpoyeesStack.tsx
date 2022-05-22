import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { CodeScreen } from "../../../src/views/MainViews/SettingsViews/Employees/CodeView";
import { EmployeesSettingsScreen } from "../../../src/views/MainViews/SettingsViews/Employees/EmployeesSettingsView";
import { SetUsersForScoupeScreen } from "../../../src/views/MainViews/SettingsViews/Employees/SetUsersForScoupeView";
import { SettingsTitle } from "../../../src/views/MainViews/SettingsViews/titles/SettingsTitle";
import { Title } from "../../../src/views/MainViews/SettingsViews/titles/Title";

const Stack = createNativeStackNavigator();

export function EmployeeButtonStackNavigator( props:any )
{
    
    const settingsStack = createNativeStackNavigator();

    return(
        <View style = {{flex:1}}>
        <Title goBack={props.navigation.goBack} name={'Сотрудники'} />
        <settingsStack.Navigator>
                
            <Stack.Screen options = {{headerShown: false, }} name="EmployeesSettings" component={EmployeesSettingsScreen} />
            <Stack.Screen options = {{headerShown: false, }} name="GetCode" component={CodeScreen} />
            <Stack.Screen options = {{headerShown: false}} name="SetUsersForScoupe" component={SetUsersForScoupeScreen} />

        </settingsStack.Navigator>
        </View>
    )
  }