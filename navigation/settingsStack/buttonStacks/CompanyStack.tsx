import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { CompanyScreen } from "../../../src/views/MainViews/SettingsViews/Company/CompanyView";
import { AddDepartmentScreen } from "../../../src/views/MainViews/SettingsViews/Company/Department/DepartmentView";
import { AddPositionScreen } from "../../../src/views/MainViews/SettingsViews/Company/Position/PositionView";
import { AddPositionNameScreen } from "../../../src/views/MainViews/SettingsViews/Company/PositionName/PositionNameView";
import { AddScoupeScreen } from "../../../src/views/MainViews/SettingsViews/Company/Scoupe/ScoupeView";
import { AddScoupeGeneralPositionScreen } from "../../../src/views/MainViews/SettingsViews/Company/ScoupeGeneralPosition/ScoupeGeneralPositionView";
import { Title } from "../../../src/views/MainViews/SettingsViews/titles/Title";

const Stack = createNativeStackNavigator();

export function CompanyButtonStackNavigator( props:any )
{
    
    const settingsStack = createNativeStackNavigator();

    return(
        <View style = {{flex:1}}>
        <Title goBack={props.navigation.goBack} name={'Компания'} />
        <settingsStack.Navigator>

            <Stack.Screen options = {{headerShown: false, gestureEnabled:true, presentation: 'transparentModal'}} name="Company" component={CompanyScreen} />   
            <Stack.Screen options = {{headerShown: false, gestureEnabled:true, presentation: 'transparentModal'}} name="AddScoupe" component={AddScoupeScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddDepartment" component={AddDepartmentScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddPositionName" component={AddPositionNameScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddPosition" component={AddPositionScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddScoupeGeneralPosition" component={AddScoupeGeneralPositionScreen} />

        </settingsStack.Navigator>
        </View>
    )
  }