import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, Icon, ScrollView, Spinner, Text, useToast, Pressable, FlatList } from 'native-base'
import { useForm } from "react-hook-form";
import Heading from '../../../Components/Heading'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import CommonBackground from '../../../Components/CommonBackground'
import SelectInput from '../../../Components/SelectInput'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { RESET } from '../../../Redux/constants/settingsConstant';
import { getAddressType, getStateList, saveAndUpdateAddress } from '../../../Redux/actions/settingsAction';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonModal from '../../../Components/CommonModal';
import { RESET_ERROR } from '../../../Redux/constants/homeConstant';
import CommonSelectCountry from '../../../Components/CommonSelectCountry';

const AddANewAddress = ({navigation}) => {

  const [stateId, setStateId] = useState("")
  const [addressTypeId, setAddressTypeId] = useState("")


  const dispatch = useDispatch();
  const toast = useToast()  

  const { updateAddress, loading, error, addressType, stateList } = useSelector(state => state.settings)
  const { selectedCountry, userData } = useSelector(state => state.auth)

    useEffect(() => {
        if(selectedCountry?._id){
            let data={
                Country: selectedCountry?._id
            }
            dispatch(getStateList(data))
        }
        
    }, [selectedCountry?._id])

    useEffect(() => {
        
        dispatch(getAddressType())

    }, [])
  

    useEffect(() => {

        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
            type: RESET_ERROR
            })
        }

    }, [error])

  
  useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(updateAddress){
            dispatch({
                type: RESET        
                })
            toast.show({
                title: 'Submitted',
            })
            
            navigation.navigate('DeliveryAddress')
        }
    }, [error, updateAddress])



    const schema = yup.object({   

        Name: yup.string().required(),
        MobileNumber: yup.number().required().positive().integer(),
        PostalCode: yup.number().required().positive().integer(),
        HouseName: yup.string().required(),
        HouseNo: yup.number().required().positive().integer(),
        Area: yup.string().required(),
        LandMark: yup.string().required(),
        TownCity: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
            Name:data.Name,
            MobileNumber: data.MobileNumber,
            PostalCode: data.PostalCode,
            HouseName:data.HouseName,
            HouseNo:data.HouseNo,
            Area: data.Area,
            LandMark: data.LandMark,
            TownCity:data.TownCity,
           
            UserId: userData?.id,
            Country: selectedCountry?._id,
            State: stateId,
	        IsDefaultAddress:false,
            AddressType: addressTypeId
        }

        dispatch(saveAndUpdateAddress(datas))
    };

     
  return (
    <>

    <CommonBackground>
        <Heading label={'Add a new address'}/>
        
        <ScrollView p={4} >
            <Box mb={10}>
                <CommonSelectCountry
                    onPress={()=>navigation.navigate('SelectCountry')}    
                />

                <CommonInput 
                    control={control}
                    error={errors.Name}
                    fieldName="Name" 
                    placeholder={'Full Name'} mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.MobileNumber}
                    fieldName="MobileNumber" 
                    placeholder={'Mobile number'} mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.PostalCode}
                    fieldName="PostalCode" 
                    placeholder={'Zip code'} mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.HouseName}
                    fieldName="HouseName" 
                    placeholder={'House name'} 
                    mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.HouseNo}
                    fieldName="HouseNo" 
                    placeholder={'Flat/Hpuse No.'} 
                    mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.Area}
                    fieldName="Area" 
                    placeholder={'Area'} 
                    mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.LandMark}
                    fieldName="LandMark" 
                    placeholder={'Landmark'} 
                    mt={2}
                />
                <CommonInput 
                    control={control}
                    error={errors.TownCity}
                    fieldName="TownCity" 
                    placeholder={'Town/City'} 
                    mt={2}
                />
                       
                <SelectInput 
                    placeholder={'State'} 
                    selectedValue={stateId}
                    changeValue={(value) => {
                        setStateId(value)
                    } }
                    optlabel={"StateName"}
                    optValue={"_id"}
                    options={stateList}
                />   
                <SelectInput 
                    placeholder={'Address Type'} 
                    selectedValue={addressTypeId}
                    changeValue={(value) => {
                        setAddressTypeId(value)
                    } }
                    optlabel={"Text"}
                    optValue={"_id"}
                    options={addressType} 
                />        
     
                { loading ? <Spinner/> : <Button 
                    onPress={handleSubmit(onSubmit) }
                    label={'ADD ADDRESS'} 
                    topLabel={4} marginTop={5}
                />}


            </Box>    

         </ScrollView>
        
            
    </CommonBackground>

    
</>
  )
}

export default AddANewAddress

const styles = StyleSheet.create({})