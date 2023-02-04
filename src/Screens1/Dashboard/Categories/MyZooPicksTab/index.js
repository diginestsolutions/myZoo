import { StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, Text } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Heading from '../../../../Components/Heading';
import MyzooPicks from '../MyZooPicksTab/MyZooPets/index';
import MyZooAccessories from '../MyZooPicksTab/MyZooAccessories/index';
import MyZooServices from '../MyZooPicksTab/MyZooServices/index';


const Tab = createMaterialTopTabNavigator();

const MyZooPicksTab = ({navigation}) => {
  return (
    <>
   

        <Box width={'100%'} height={21} bg={{
            linearGradient: {
                colors: ['#005EAA', '#008BFC'],
                start: [0, 0],
                end: [1, 0],
            },
        }}/>
            <Box bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
            <Box flex={1}>
                <Heading label={'MyZoo Picks'}/>

                <Tab.Navigator 
                    screenOptions={{
                    tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: '#7D7D7D',
                    tabBarIndicatorStyle: {
                        backgroundColor: 'blue'
                    },
                    tabBarAllowFontScaling: true,
                    tabBarBounces: true
                }}>            
                    <Tab.Screen name="Pets" component={MyzooPicks} />
                    <Tab.Screen name="Accessories" component={MyZooAccessories} />
                    <Tab.Screen name="Services" component={MyZooServices} />
                    
                </Tab.Navigator>  

            </Box>
                
        </Box>
    </>
  )
}

export default MyZooPicksTab

const styles = StyleSheet.create({})