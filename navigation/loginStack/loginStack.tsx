import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RegistrtionScreen } from "../../src/views/LoginViews/RegistrationView";
import { View } from "react-native";
import { LoginScreen } from "../../src/views/LoginViews/LogInView";

const Stack = createNativeStackNavigator();

export function LoginStackNavigator()
{
    
    const settingsStack = createNativeStackNavigator();

    return(
        <View style = {{flex:1}}>
        <settingsStack.Navigator>
                
            <Stack.Screen options = {{headerShown: false}} name="Login" component={LoginScreen} />
            <Stack.Screen options = {{headerShown: false}} name="Registration" component={RegistrtionScreen} />

        </settingsStack.Navigator>
        </View>
    )
  }