import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, Image, ScrollView, useToast, Text } from 'native-base'
import { useForm } from "react-hook-form";
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import CommonBackground from '../../../Components/CommonBackground'
import SelectInput from '../../../Components/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getAddressType, getStateList, saveAndUpdateAddress } from '../../../Redux/actions/settingsAction';
import CommonSelectCountry from '../../../Components/CommonSelectCountry';
import { useTranslation } from "react-i18next";
import reactotron from '../../../ReactotronConfig';
import { LOADING } from '../../../Redux/constants/homeConstant';
import customAxios from '../../../CustomAxios';


const EditAddress = ({navigation, route}) => {

    const { t } = useTranslation();

    const [stateId, setStateId] = useState("")
    const [addressTypeId, setAddressTypeId] = useState("")

    //const [address, setAddress] = useState('')


    const dispatch = useDispatch();
    const toast = useToast()  

    const { address } = route.params

    reactotron.log({address})


    const { error, addressType, stateList } = useSelector(state => state.settings)

    const { userData, selectedCountry } = useSelector(state => state.auth)

    useEffect(() => {
        if(selectedCountry?._id){
            let data={
                Country: selectedCountry?._id
            }
            dispatch(getStateList(data))
        }
        
    }, [selectedCountry?._id])

    useEffect(() => {
        if(address){

            reactotron.log(address?.MobileNumber)
            setValue("Name", address?.Name);
            setValue("MobileNumber", address?.MobileNumber.toString());
            setValue("PostalCode", address?.PostalCode.toString());
            setValue("HouseName", address?.HouseName);
            setValue("Area", address?.Area);
            setValue("LandMark", address?.LandMark);
            setValue("TownCity", address?.TownCity);
            setAddressTypeId(address?.AddressType)

            if(address?.country?._id){
                let data={
                    Country: address?.country?._id
                }
                dispatch(getStateList(data))
            }
        }
        
        
    }, [address])


    useEffect(() => {
      if(stateList){
        setStateId(address?.stat?._id)
      }
    }, [stateList])
    
    

    useEffect(() => {
        
        dispatch(getAddressType())

    }, [])

    const schema = yup.object({      

        Name: yup.string().required(),
        //MobileNumber: yup.number().required().positive().integer(),
        PostalCode: yup.number().required().positive().integer(),
        HouseName: yup.string().required(),
        Area: yup.string().required(),
        TownCity: yup.string().required(),   

    }).required();

const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver : yupResolver(schema)
});

const onSubmit = data => {
    let datas = {
        _id: address?._id,
        UserId: userData?.id,
        HouseName: data.HouseName,
        Country: userData?.Country,
        MobileNumber: data.MobileNumber,
        PostalCode: data.PostalCode,
        HouseNo: data.HouseName,
        Area: data.Area,
        LandMark: data.LandMark,
        TownCity: data.TownCity,
        State: stateId,
        IsDefaultAddress:address?.IsDefaultAddress,
        Name: data.Name,
        AddressType: addressTypeId
    }
        //dispatch(saveAndUpdateAddress(datas))

        updateUserAddress(datas)
};


    const updateUserAddress = async(datas) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customeraddress/_saveCustomerAddress`, datas)  
        .then(async response => {
            navigation.goBack()
            toast.show({
                title: 'Success',
                description: "Address updated successfully",
                backgroundColor: 'success.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }


  return (
    <>
  
    <CommonBackground>
        <Heading label={t("EditAddress.editAddr")}/>
        
        <ScrollView p={4} >
            <Box mb={10}>
                <CommonSelectCountry
                    onPress={()=>navigation.navigate('SelectCountry')} 
                    country={address.country}   
                />

                {/* <Text>{route.params.Name}</Text> */}
                <CommonInput 
                    control={control}
                    error={errors.Name}
                    fieldName="Name" 
                    placeholder={t("EditAddress.fullName")} mt={2}
                />
                <CommonInput
                    control={control}
                    error={errors.MobileNumber}
                    fieldName="MobileNumber"  
                    placeholder={t("EditAddress.mobNo")} mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.PostalCode}
                    fieldName="PostalCode" 
                    placeholder={t("EditAddress.zip")} mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.HouseName}
                    fieldName="HouseName" 
                    placeholder={t("EditAddress.houseName")} 
                    mt={2}
                />
                {/* <CommonInput 
                    control={control}
                    error={errors.HouseNo}
                    fieldName="HouseNo" 
                    placeholder={t("EditAddress.houseNo")}
                    mt={2}
                /> */}
                <CommonInput 
                    control={control}
                    error={errors.Area}
                    fieldName="Area" 
                    placeholder={t("EditAddress.areaCol")}
                    mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.LandMark}
                    fieldName="LandMark" 
                    placeholder={t("EditAddress.landmark")} mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.TownCity}
                    fieldName="TownCity" 
                    placeholder={t("EditAddress.twnOrCty")}
                    mt={2}
                />
                <SelectInput 
                    placeholder={t("EditAddress.stateProReg")}
                    selectedValue={stateId}
                    changeValue={(value) => {
                        setStateId(value)
                    } }
                    optlabel={"StateName"}
                    optValue={"_id"}
                    options={stateList}
                />   
                <SelectInput 
                    placeholder={t("EditAddress.addrType")}
                    selectedValue={addressTypeId}
                    changeValue={(value) => {
                        setAddressTypeId(value)
                    } }
                    optlabel={"Text"}
                    optValue={"_id"}
                    options={addressType} 
                /> 
             
                <Button 
                    onPress={handleSubmit(onSubmit) }
                    label={t("EditAddress.updateAddr")}
                    topLabel={4} marginTop={5}
                />
            </Box>    

         </ScrollView>
            
    </CommonBackground>
</>
  )
}

export default EditAddress

const styles = StyleSheet.create({})