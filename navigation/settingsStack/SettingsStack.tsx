import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SettingsTitle } from "../../src/views/MainViews/SettingsViews/titles/SettingsTitle";
import { SettingsScreen } from "../../src/views/MainViews/SettingsViews/SettingsView";
import { AddScoupeScreen } from "../../src/views/MainViews/SettingsViews/Company/Scoupe/ScoupeView";
import { AddDepartmentScreen } from "../../src/views/MainViews/SettingsViews/Company/Department/DepartmentView";
import { AddPositionNameScreen } from "../../src/views/MainViews/SettingsViews/Company/PositionName/PositionNameView";
import { AddPositionScreen } from "../../src/views/MainViews/SettingsViews/Company/Position/PositionView";
import { View } from "react-native";
import { EmployeeButtonStackNavigator } from "./buttonStacks/EmpoyeesStack";
import { CompanyButtonStackNavigator } from "./buttonStacks/CompanyStack";

const Stack = createNativeStackNavigator();

export function SettingsStackNavigator()
{
    
    const settingsStack = createNativeStackNavigator();

    return(
        <View style = {{flex:1}}>
        <SettingsTitle/>
        <settingsStack.Navigator>
                
            <Stack.Screen options = {{headerShown: false, }} name="Settings" component={SettingsScreen} />
            <Stack.Screen options = {{headerShown: false, headerStyle:{backgroundColor: '#F7FFF2'}}} name="EmployeeButtonStackNavigator" component={EmployeeButtonStackNavigator} />
            <Stack.Screen options = {{headerShown: false, headerStyle:{backgroundColor: '#F7FFF2'}}} name="CompanyButtonStackNavigator" component={CompanyButtonStackNavigator} />

        </settingsStack.Navigator>
        </View>
    )
  }