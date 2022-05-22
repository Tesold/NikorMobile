import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TasksTitle } from './TaskTitle';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFF2',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export function TasksScreen()
    {
      return(<View style={styles.container}>
               <TasksTitle/>
               <View style={styles.container}>
              
              </View>
             </View>
           )
    }