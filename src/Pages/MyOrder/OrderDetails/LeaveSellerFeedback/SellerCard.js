import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, FlatList, Image, HStack, Icon} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageTextCard from '../../../../Components/ImageTextCard'
import CardTitle from '../../../../Components/CardTitle'
import { useTranslation } from "react-i18next";



const SellerCard = ({onPress}) => {

    const { t } = useTranslation();

    const datas = [
        {   id: 1, 
            title:'Vendor',
            rating:'4.5',           
            city:'City, Saudi Arabia',
            name:'Nilva'
        },
        {   id: 2, 
            title:'Vendor',
            rating:'4.5',           
            city:'City, Saudi Arabia',
            name:'Muhammad'

        },
        {   id: 3, 
            title:'Vendor',
            rating:'4.5',           
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'

        },
        {   id: 4, 
            title:'Vendor',
            rating:'4.5',           
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'
        },
        {   id: 5, 
            title:'Vendor',
            rating:'4.5',           
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'
        },   
       
       
    ]

    const renderItems = ({item}) => {
        
        return(
            <ImageTextCard 
                onPress={onPress}
                width={140} height={180} 
                mx={2.5}
            >
                <Image 
                    source={require('../../../../Images/sam.jpg')} 
                    h={120} alt="image" borderTopRadius={10} 
                />
                <Text fontWeight={200} fontFamily={'body'} fontSize={16} mt={2} color='#B4B4B4' ml={2}>{item.title}</Text>   
                <HStack alignItems={'center'} ml={2}>
                    <Icon as={<Ionicons/>} name='ios-star' size={13} color='yellow.500' />
                    <Text fontWeight={400} fontSize={14} color={'#535353'} ml={1}>{item.rating}</Text>
                </HStack>                

            </ImageTextCard>                
        )
    }


  return (
    <>
        <CardTitle label={t("LeaveSellerFeedback.popSellers")}/>
        <FlatList 
            data={datas}
            keyExtractor={(item) => item.id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    </>
  )
}

export default SellerCard

const styles = StyleSheet.create({})