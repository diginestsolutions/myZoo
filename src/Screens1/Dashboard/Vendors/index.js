import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, FlatList, Image, HStack, Icon} from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useNavigation } from '@react-navigation/native'
import ImageTextCard from '../ImageTextCard'
import CardTitle from '../CardTitle'
import { useTranslation } from "react-i18next";


const Vendors = ({label}) => {

    const { t } = useTranslation();

    const navigation = useNavigation();


    const datas = [
        {   id: 1, 
            title:'Vendor',
            rate:'123 SR',           
            city:'City, Saudi Arabia',
            name:'Nilva'
        },
        {   id: 2, 
            title:'Vendor',
            rate:'28 SR',         
            city:'City, Saudi Arabia',
            name:'Muhammad'

        },
        {   id: 3, 
            title:'Vendor',
            rate:'100 SR - 500 SR',             
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'

        },
        {   id: 4, 
            title:'Vendor',
            rate:'150 SR',             
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'
        },
        {   id: 5, 
            title:'Vendor',
            rate:'100 SR' ,             
            city:'City, Saudi Arabia',
            name:'Muhammad Rahees'
        },   
        {   id: 6, 
            title:'Vendor',
            rate:'28 SR',         
            city:'City, Saudi Arabia',
            name:'Muhammad'
        },  
       
    ]

    const renderItems = ({item}) => {
        
        return(
            <ImageTextCard 
                // onPress={()=>navigation.navigate('VendorProfile')}
                width={140} height={145} 
                mx={2.5}
            >
                <Image 
                    source={require('../../../Images/vendor.jpg')} 
                    h={100} alt="image" borderTopRadius={10} 
                />
                <Text textAlign={'center'} fontWeight={200} fontFamily={'body'} fontSize={16} mt={2} color='#B4B4B4'>{item.title}</Text>                    

            </ImageTextCard>                
        )
    }


  return (
    <>
        <CardTitle label={label}/>
        {/* <FlatList 
            data={datas}
            keyExtractor={(item) => item.id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        /> */}

        <Text textAlign={'center'} fontWeight={500} fontFamily={'body'} fontSize={26} mt={2} color='#005EAA' mb={10}>{t("Dashboard.coming")}</Text>                    



    </>
  )
}

export default Vendors

const styles = StyleSheet.create({})