import { StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, useToast, ScrollView, Text } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Accessories from '../BrowseCategories/Accessories/index'
import Services from '../BrowseCategories/Services/index'
import Pets from '../BrowseCategories/Pets/index';
import Header from '../../../../Components/Header';
import Heading from '../../../../Components/Heading';
import PetsNavigation from './Pets/PetsNavigation';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { HOME_INPUT } from '../../../../Redux/constants/homeConstant';
import { getAllCategories } from '../../../../Redux/actions/homeAction';


const Tab = createMaterialTopTabNavigator();

const BrowseCategories = ({navigation}) => {

    const dispatch = useDispatch();

  const { t } = useTranslation();

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
                <Heading label={t("BrowseCategories.browCat")}/>

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
                    <Tab.Screen 
                        name={t("BrowseCategories.pet")} 
                        component={PetsNavigation} 
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                dispatch({
                                    type: HOME_INPUT,
                                    payload: {
                                        prop: 'categoryList',
                                        value: []
                                    }
                                })
                                
                            },
                        })}
                    />
                    <Tab.Screen 
                        name={t("BrowseCategories.Accessories")} 
                        component={Accessories} 
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                dispatch({
                                    type: HOME_INPUT,
                                    payload: {
                                        prop: 'categoryList',
                                        value: []
                                    }
                                })
                            },
                        })}
                    />
                    <Tab.Screen name={t("BrowseCategories.serv")} component={Services} />
                </Tab.Navigator>  

            </Box>
                
        </Box>
    </>
  )
}

export default BrowseCategories

const styles = StyleSheet.create({})