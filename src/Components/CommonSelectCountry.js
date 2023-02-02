import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Icon, Text, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { getStateList } from '../Redux/actions/settingsAction';


const CommonSelectCountry = ({onPress, topLabel, label, country}) => {

  const { t } = useTranslation();
  const dispatch = useDispatch()

  const { selectedCountry } = useSelector(state => state.auth)

  useEffect(() => {
      if(selectedCountry){
        dispatch(getStateList({
          Country:selectedCountry._id
        }))
      }
  }, [selectedCountry])
  

  return (

    <>

        { topLabel && <Text color={'#535353'} ml={2} mt={2} mb={-1} fontWeight={200} fontSize={13} fontFamily='body'>{topLabel}</Text>}
        <Pressable 
            onPress={onPress}
            borderWidth={1} borderColor='#00000029'
            justifyContent={'space-between'} 
            flexDir='row' alignItems={'center'}
            borderRadius={4} pr={2} mt={2} pl={2.5}
            minH={35}
        >
            { selectedCountry?.Country ? <Text color='#000' fontWeight={300} fontFamily='body'  fontSize={13}>{selectedCountry?.Country}</Text> : 
            <Text color='#B4B4B4' fontWeight={400} fontFamily='body'  fontSize={13}>{country ? country?.Country : t("EditAddress.countryOrReg")}</Text>
            // <Text color='#000' fontWeight={300} fontFamily='body'  fontSize={13}>{label}</Text>
            }
            <Icon as={<Ionicons/>} name={'chevron-down'} color="#3D3D3DAC" size={22}/>
        </Pressable>
    
    </>

    
  )
}

export default CommonSelectCountry

const styles = StyleSheet.create({})