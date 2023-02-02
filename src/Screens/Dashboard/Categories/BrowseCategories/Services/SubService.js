import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, FlatList, Image, Box } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import AllServicesCard from '../../MyZooPicksTab/MyZooServices/AllServicesCard'
import Header from '../../../../../Components/Header'
import Heading from '../../../../../Components/Heading'




const SubService = ({route}) => {

    const navigation = useNavigation();

    const datas = [
        {   id: 1, 
            title:'Dog Grooming',
            rate:'123 SR',           
            city:'City, Saudi Arabia',
            name:'Nilva'
        },
        {   id: 2, 
            title:'Dog Grooming',
            rate:'28 SR',         
            city:'City, Saudi Arabia',
            name:'Muhammad'

        },
        {   id: 3, 
            title:'Dog Grooming',
            rate:'100 SR - 500 SR',             
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'

        },
        {   id: 4, 
            title:'Dog Grooming',
            rate:'150 SR',             
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'
        },
      
        
    ]

    const renderItems = ({item}) => (
        <AllServicesCard 
            item={item}
            mx={4}
        />
    )


  return (
    <>
        <Header 
            onPress={() => navigation.openDrawer()}
            openCart={()=>navigation.navigate('Cart')}
        />

        <Box width={'100%'} height={21} bg={'#008BFC'}/>
            <Box bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
                <Heading label={route.params.service}/>

            <FlatList 
                data={datas}
                keyExtractor={(item) => item.id}
                renderItem={renderItems}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                alignSelf='center'
            />

        </Box>
        
    </>
  )
}

export default SubService

const styles = StyleSheet.create({})