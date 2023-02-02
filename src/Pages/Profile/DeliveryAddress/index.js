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
import { LOADING, RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from "react-i18next";
import customAxios from '../../../CustomAxios'


const DeliveryAddress = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  
    const [selected, setSelected] = useState(null)

    const [addressList, setAddressList] = useState([])

    const { loading, error, delAddress, setDefault, updateAddress } = useSelector(state => state.settings)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
       if(addressList){
            let defaultAddr = addressList.find(addr => addr.IsDefaultAddress === true)
            if(defaultAddr){
                setSelected(defaultAddr);
            }
       }
    }, [addressList])
    

    const SetDefaultAddress = async() => {

        let datas={
            AddressId : selected._id,
	        UserId : userData?.id,
        }

        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customeraddress/SetDefault`,datas)  
        .then(async response => {

            toast.show({
                title: "Success",
                description: "Make default address successfull",
                backgroundColor: "success.500"
            })

            listAddress()
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.500' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    };

    const DeleteAddress = async() => {

        let datas={
            _id : selected._id,
	        UserId : userData?.id,
        }

        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customeraddress/_deleteCustomerAddress`, datas)  
        .then(async response => {
            toast.show({
                title: "Success",
                description: "Address deleted successfull",
                backgroundColor: "success.500"
            })

            listAddress()
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.500' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
        //dispatch(deleteAddress(datas))
    };

    useEffect(() => {
        listAddress()
        
    }, [])


    const listAddress = async() => {
        let data = {
            UserId: userData?.id,
        }

        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customeraddress/_loadAddressOfUser`, data)  
        .then(async response => {

            setAddressList(response.data.data)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.500' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }



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