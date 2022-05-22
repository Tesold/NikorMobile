import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { AddTaskScreen } from '../src/views/MainViews/AddTaskViews/AddTaskView';
import { EmployeesScreen } from '../src/views/MainViews/EmployeesViews/EmployeesView';
import { SettingsScreen } from '../src/views/MainViews/SettingsViews/SettingsView';
import { StatisticsScreen } from '../src/views/MainViews/StatisticsViews/StatisticsView';
import { TasksScreen } from '../src/views/MainViews/TasksViews/TasksView'
import { TitleView } from '../src/views/MainViews/Title/TitleView';
import { EmployeesStackNavigator } from './employeeStack/EmployeesStack';
import { SettingsStackNavigator } from './settingsStack/SettingsStack';
import { CreateIconView } from './tabBarIconsViews/CreateIconView';
import { EmployeeIconView } from './tabBarIconsViews/EmployeeIconView';
import { SettingsIconView } from './tabBarIconsViews/SettingsIconView';
import { StatisticIconView } from './tabBarIconsViews/StatisticIconView';
import { TasksIconView } from './tabBarIconsViews/TasksIconView';

const Tabs = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function MainTabs()
{
  const bol = (Platform.OS==='ios')
return(
  
      <View style={styles.container}>
        
          <View style={{backgroundColor: '#77A75C'}}>
          </View>
        
        <TitleView />

      <Tabs.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: '#77A75C'}, tabBarInactiveTintColor: "white", tabBarActiveTintColor: "black", tabBarActiveBackgroundColor: '#BFE4A9'}}>
        <Tabs.Screen options={{tabBarIcon: (props)=>(<TasksIconView/>)}} name="Задачи" component={TasksScreen} />
        <Tabs.Screen options={{tabBarIcon: (props)=>(<EmployeeIconView/>)}} name="Сотрудники" component={EmployeesStackNavigator} />
        <Tabs.Screen options={{tabBarIcon: (props)=>(<CreateIconView/>)}} name="Создать" component={AddTaskScreen} />
        <Tabs.Screen options={{tabBarIcon: (props)=>(<StatisticIconView/>)}} name="Статистика" component={StatisticsScreen} />
        <Tabs.Screen options={{tabBarIcon: (props)=>(<SettingsIconView/>)}} name="Настройки" component={SettingsStackNavigator} />
      </Tabs.Navigator>
      
      </View>
      )
}