import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Text, FlatList, Pressable, useToast, Icon} from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';




const Categories = ({onPress}) => {

    const { error } = useSelector(state => state.home)
    const dispatch = useDispatch();
    const toast = useToast()  
    const { width } = useWindowDimensions()




    

    const { t } = useTranslation();

    const navigation = useNavigation();

    const datas = [
        { 
            id: 1, 
            title: t("Dashboard.pet") ,
            onPress: ()=>navigation.navigate('BrowseCategories', { screen: t("BrowseCategories.pet") }),
            icon: FontAwesome5,
            iconName: 'cat',
        },
        { 
            id: 2, 
            title: t("Dashboard.acc"),
            onPress: ()=>navigation.navigate('BrowseCategories', { screen: t("BrowseCategories.Accessories") }),
            icon: FontAwesome,
            iconName: 'chain',
        },
        { 
            id: 3, 
            title: t("Dashboard.serv"),
            onPress: ()=>navigation.navigate('BrowseCategories', { screen: t("BrowseCategories.serv") }), 
            icon: FontAwesome,
            iconName: 'scissors',
        },
        { 
            id: 4, 
            title: t("Dashboard.myZooPcs") ,
            onPress: ()=>navigation.navigate('MyZooPicksTab'), 
            icon: FontAwesome5,
            iconName: 'paw',

            
        },
     
    ]

    const renderItems = ({item}) => {
        
        return(
            
            <Pressable
                onPress={item.onPress}
                alignItems='center'  mt={5} 
                w={width/4}
            >
                <Box
                    shadow={7} 
                    borderRadius={15} 
                    width={65} 
                    backgroundColor="#fff"
                    height={70} 
                    justifyContent={'center'}                    
                    alignItems='center'
                    borderWidth={1}
                    borderColor={'#008ECC'}
                >
                    <Icon as={item.icon} name={item.iconName} color="#008ECC" size={33}/>
                </Box>
               
                <Text mt={1} color={"#008ECC"} fontWeight={400} fontSize={14} letterSpacing={0.2}>{item.title}</Text>
            </Pressable>
        )
      }


  return (
    <>
        <FlatList 
            data={datas}
            keyExtractor={(item) => item.id}
            renderItem={renderItems}
            alignSelf={'center'}  
            horizontal={true} 
        />
    </>
  )
}

export default Categories

const styles = StyleSheet.create({})