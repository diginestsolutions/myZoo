import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Image, ScrollView, FlatList, HStack, useToast, Spinner } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'

import CommonTextIcon from '../CommonTextIcon'
import AddressBox from './AddressBox'
import EditButton from '../../../Components/EditButton'
import CommonBackground from '../../../Components/CommonBackground'
import { deleteAddress, listAddress, makeDefaultAddress } from '../../../Redux/actions/settingsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { SET_ACTIVE_ADDRESS } from '../../../Redux/constants/settingsConstant'
import { useTranslation } from "react-i18next";


const DeliveryAddress = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  
    const [selected, setSelected] = useState(null)

    const { addressList, loading, error, delAddress, setDefault, updateAddress } = useSelector(state => state.settings)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
       if(addressList){
            let defaultAddr = addressList.find(addr => addr.IsDefaultAddress === true)
            if(defaultAddr){
                setSelected(defaultAddr);
            }
       }
    }, [addressList])
    

    const SetDefaultAddress = () => {

        if(setDefault){
            
            toast.show({
                description: setDefault?.msg
            })
            
        }

        let datas={
            AddressId : selected,
	        UserId : userData?.id,
        }

        dispatch(makeDefaultAddress(datas))
    };

    const DeleteAddress = () => {

        if(delAddress){
            toast.show({
                description: "Address Deleted Successfully"
            })
        }
        let datas={
            AddressId : selected,
	        UserId : userData?.id,
        }
        dispatch(deleteAddress(datas))
    };

    useEffect(() => {
        if(updateAddress){
            let data = {
                UserId: userData?.id,
            }
            dispatch(listAddress(data))
        }else{
            let data = {
                UserId: userData?.id,
            }
            dispatch(listAddress(data))
        }
        
    }, [updateAddress])

    useEffect(() => {
        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
            type: RESET_ERROR
            })
        }
    }, [error])

    const renderItems = ({item}) => (
        <AddressBox 
            item={item}
            selected={selected?._id}
            onChanged={() => setSelected(item)}
        />
    ) 

    const MakeActiveAddress = () => {

        
        navigation.navigate('EditAddress', {address: selected});
    }


  return (
    <>

    <CommonBackground>
        <Heading label={t("DeliveryAddress.deliveryAddr")}/>
        
        <ScrollView p={4}>
            <CommonTextIcon 
                onPress={()=>navigation.navigate('AddANewAddress')}
                text={t("DeliveryAddress.addNewAddr")}
                icon={<MaterialCommunityIcons name="note-text-outline"/>}
                bottomRad={5}
                topRad={5}
                iconName="right"
            />
            <Box height={0.3} bg={'#E0E0E0'} mt={3}/>           
                

            {loading ? <Spinner/> : <FlatList 
                data={addressList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
            />}

            <EditButton 
                onPress={SetDefaultAddress}
                label={t("DeliveryAddress.makedef")}
                mt={8}
                color='#005EAA'
            />
            <EditButton 
                onPress={MakeActiveAddress}
                label={t("DeliveryAddress.editAddr")}
                mt={5}
                color='#005EAA'
            />
            <EditButton 
                onPress={DeleteAddress}
                label={t("DeliveryAddress.delAddr")}
                mt={5}
                color='#FF1010'
                mb={20}
            />
                

        </ScrollView>
            
    </CommonBackground>
</>
  )
}

export default DeliveryAddress

const styles = StyleSheet.create({})