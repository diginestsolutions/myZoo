import { StyleSheet, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, ScrollView, useToast,  } from 'native-base'
import { useForm } from "react-hook-form";
import Heading from '../../../Components/Heading'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import ProfileDp from '../ProfileDp'
import CommonBackground from '../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../../Redux/actions/settingsAction';
import CommonSelectCountry from '../../../Components/CommonSelectCountry';
import { LOADING, RESET_ERROR } from '../../../Redux/constants/homeConstant';
import { useTranslation } from "react-i18next";
import { RESET_AUTH } from '../../../Redux/constants/authConstant';
import reactotron from '../../../ReactotronConfig';
import {launchImageLibrary} from 'react-native-image-picker';
import customAxios from '../../../CustomAxios';



const EditProfile = ({navigation}) => {

    const { t } = useTranslation();

    const [image, setImage] = useState('');


    const dispatch = useDispatch();
    const toast = useToast()  

    // const { error } = useSelector(state => state.settings)
    const { selectedCountry, userProfile, userData, profileSuccess, error } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
            dispatch({
                type: RESET_ERROR        
            })
        
        }    
        if(profileSuccess){
            setImage(null)
            dispatch({
                type: RESET_AUTH
            })
            toast.show({
                title: 'Profile Updated Successfully',
            })
            
        }
    }, [error, profileSuccess])


    useEffect(() => {
      if(userProfile){
        reactotron.log({postal: userProfile?.PostalCode.toString()})
        setValue("PostalCode", userProfile?.PostalCode.toString());
      }
    }, [userProfile])
    


    const schema = yup.object({   

        FirstName: yup.string().required(),
        LastName: yup.string().required(),
        PhoneNumber: yup.number().required().positive().integer(),
        EmailAddress: yup.string().email().required(),
        Address: yup.string().required(),
        City: yup.string().required(),
        PostalCode: yup.string().required(),
        Twitter: yup.string().required(),
        Facebook: yup.string().required(),
        Aboutme: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver : yupResolver(schema),
        defaultValues:{
            FirstName: userProfile?.FirstName,
            LastName: userProfile?.LastName,
            PhoneNumber: userProfile?.PhoneNumber,
            EmailAddress: userProfile?.EmailAddress, 
            Address: userProfile?.Address, 
            City: userProfile?.City, 
            PostalCode: userProfile?.PostalCode, 
            Facebook: userProfile?.Facebook, 
            Twitter: userProfile?.Twitter, 
        }
    });

    const onSubmit =async data => {

        reactotron.log({data})

        if(image){
            let formData = new FormData();
            formData.append("file", {
                uri: image.uri,
                type: image.type,
                name: image.fileName
            }) 

            dispatch({
                type: LOADING,
                payload: true
            })
        
            await customAxios.post(`admin/uploaduser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })  
            .then(async response => {
                data.Image = [{
                    "ClientFileName":image.fileName,
                    "UploadedFileName":response.data
                }]

                data._id = userProfile?._id

                data.userId = userData.id

                await customAxios.post(`admin/UserProfile/_save`, data)  
                .then(async response => {
                    toast.show({
                        title: "Success",
                        description: "Profile Updated successfully",
                        backgroundColor: "success.500"
                    })
                    dispatch(getUserProfile(userData?.id))
                    dispatch({
                        type: LOADING,
                        payload: false
                    })
                    navigation.goBack()
                })
                .catch(async error => {

                    toast.show({
                        title: "Error",
                        description: error,
                        backgroundColor: "error.600"
                    })

                    dispatch({
                        type: LOADING,
                        payload: false
                    })
                });
            })
            .catch(async error => {
        
                toast.show({
                    title: "Error",
                    description: error,
                    backgroundColor: "error.600"
                })
        
                dispatch({
                    type: LOADING,
                    payload: false
                })
            });

        }

        //let images = uploadFile(image)
        //reactotron.log({images})
        // let datas={

        //     _id: userProfile?._id,
        //     userId: userData?.id,
        //     FirstName: data.FirstName,
        //     LastName: data.LastName,
        //     EmailAddress: data.Email,
        //     PhoneNumber: data.MobileNumber,
        //     Address: data.HouseName,
        //     City: data.City,
        //     PostalCode: data.PostalCode,
        //     Country: selectedCountry?._id,
        //     Twitter: data.Twitter,
        //     Facebook: data.Facebook,
        //     Aboutme: data.Aboutme,
        //     Image:[{
        //         ClientFileName: image?.filename,
        //         UploadedFileName: image?.path
        //     }]
	
        // }

        //dispatch(updateUserProfile(datas))
    };

    


    const ChoosePhotoFromLibrary = async() => {

        let options = {
            mediaType: 'photo',
            selectionLimit: 1
        }

        const result = await launchImageLibrary(options);

        reactotron.log({result: result.assets[0]})

        setImage(result.assets[0])

        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     cropping: true
        //   }).then(image => {
        //     reactotron.log(image);
        //     setImage(image)
        // });

    }
    

return (
<>

    <CommonBackground>
        <Heading label={t("EditProfile.editPro")}/>
        <ScrollView p={4} >

            <ProfileDp 
                onPress={ChoosePhotoFromLibrary}
                iconName={'pencil-sharp'} >
                <Image                

                    source={{
                        uri : image ? image?.uri :  userProfile?.Image?.[0]?.UploadedFileName
                    }}
                    style={{height:100, width:100,  borderRadius:50}}
                />
            </ProfileDp>

            <Box mb={10}>
                <CommonInput 
                    control={control}
                    error={errors.FirstName}
                    fieldName="FirstName" 
                    placeholder={t("EditProfile.firstName")}
                    topLabel={t("EditProfile.firstName")}
                />
                <CommonInput 
                    control={control}
                    error={errors.LastName}
                    fieldName="LastName" 
                    placeholder={t("EditProfile.lastName")}
                    topLabel={t("EditProfile.lastName")}
                />
                <CommonInput 
                    control={control}
                    error={errors.PhoneNumber}
                    fieldName="PhoneNumber" 
                    placeholder={t("EditProfile.phNo")} 
                    topLabel={t("EditProfile.phNo")} 
                />
                <CommonInput 
                    control={control}
                    error={errors.EmailAddress}
                    fieldName="EmailAddress" 
                    placeholder={t("EditProfile.email")}
                    topLabel={t("EditProfile.email")}
                />
                <CommonInput 
                    control={control}
                    error={errors.Address}
                    fieldName="Address" 
                    placeholder={t("EditProfile.address")}
                    topLabel={t("EditProfile.address")}
                />
                <CommonInput 
                    control={control}
                    error={errors.City}
                    fieldName="City" 
                    placeholder={t("EditProfile.city")}
                    topLabel={t("EditProfile.city")}
                />
                <CommonInput 
                    control={control}
                    error={errors.PostalCode}
                    fieldName="PostalCode" 
                    placeholder={t("EditProfile.posCode")}
                    topLabel={t("EditProfile.posCode")}
                />
                <CommonSelectCountry
                    onPress={()=>navigation.navigate('SelectCountry')}  
                    topLabel={t("EditProfile.countryOrReg")}
                    label={userProfile?.Country}
                />
                <CommonInput
                    control={control}
                    error={errors.Facebook}
                    fieldName="Facebook"  
                    placeholder={t("EditProfile.fb")}
                    topLabel={t("EditProfile.fb")}
                />
                <CommonInput 
                    control={control}
                    error={errors.Twitter}
                    fieldName="Twitter"  
                    placeholder={t("EditProfile.twitter")}
                    topLabel={t("EditProfile.twitter")}
                />
                <CommonInput 
                    control={control}
                    error={errors.Aboutme}
                    fieldName="Aboutme"  
                    placeholder={t("EditProfile.abtMe")}
                    topLabel={t("EditProfile.abtMe")} height={100}
                />

                <Button 
                    onPress={handleSubmit(onSubmit)}
                    label={t("EditProfile.updateProfile")}
                    marginTop={5}
                />
            </Box>    

        </ScrollView>
        
    </CommonBackground>
</>
  )
}

export default EditProfile

const styles = StyleSheet.create({})