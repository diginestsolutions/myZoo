import { StyleSheet } from 'react-native'
import React from 'react'
import { Text} from 'native-base'

import { useNavigation } from '@react-navigation/native'
//import ImageTextCard from '../ImageTextCard'
import CardTitle from '../../Components/CardTitle'
import { useTranslation } from "react-i18next";


const Vendors = ({label}) => {

    const { t } = useTranslation();

    const navigation = useNavigation();



    // const renderItems = ({item}) => {
        
    //     return(
    //         <ImageTextCard 
    //             // onPress={()=>navigation.navigate('VendorProfile')}
    //             width={140} height={145} 
    //             mx={2.5}
    //         >
    //             <Image 
    //                 source={require('../../../Images/vendor.jpg')} 
    //                 h={100} alt="image" borderTopRadius={10} 
    //             />
    //             <Text textAlign={'center'} fontWeight={200} fontFamily={'body'} fontSize={16} mt={2} color='#B4B4B4'>{item.title}</Text>                    

    //         </ImageTextCard>                
    //     )
    // }


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