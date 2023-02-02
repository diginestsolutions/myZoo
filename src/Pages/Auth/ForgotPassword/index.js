import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, HStack, StatusBar, Icon, useToast, Spinner } from 'native-base'
import CommonInput from '../../../Components/CommonInput'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../../Components/CommonButton'
import CommonTitle from '../CommonTitle'
import CommonSubtitle from '../CommonSubtitle'
import Logo from '../../../Components/Logo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { RESET_AUTH } from '../../../Redux/constants/authConstant'
import { forgetPswd } from '../../../Redux/actions/authAction'
import { useTranslation } from "react-i18next";
import customAxios from '../../../CustomAxios'
import { LOADING } from '../../../Redux/constants/homeConstant'


const ForgotPassword = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { forgetPswdSuccess, loading, error } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){
            dispatch({
                type: RESET_AUTH        
            })

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(forgetPswdSuccess){
            dispatch({
                type: RESET_AUTH        
            })
            toast.show({
                title: 'Success',
                description: "Sending OTP"
            })
            
            navigation.navigate('OtpVerification')
        }
    }, [error, forgetPswdSuccess])


    const schema = yup.object({   

        username: yup.string().email().required(),

        
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = async data => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`mobileforgot-password`, data)
        .then(async response => {
            dispatch({
				type: LOADING,
				payload: false
			})
            navigation.navigate('verifyOtp', { userId: response?.data?.data?.AppUserId })
        })
        .catch(async error => {
            toast.show({
				title : "Error",
				description: error,
				backgroundColor: "error.500"
			})
			dispatch({
				type: LOADING,
				payload: false
			})
        })
    };


  return (
    <>
    <StatusBar hidden={true}/>

        <Box bg='#fff' flex={1} px={3}>
        <KeyboardAwareScrollView> 

            <HStack alignItems={'center'}>
                <Box flex={0.4}>
                    <Icon as={<Ionicons />} name={'close'}  color="#535353" size={8} 
                    onPress={()=>navigation.navigate('SignIn')}/>
                </Box>
                <Box flex={0.7}>
                    <Logo/>
                </Box>
            </HStack>

            <CommonTitle label={t("ForgotPassword.frgtPswd")}/>
            <CommonSubtitle 
                mt={6}
                label={t("ForgotPassword.provideEmail")}
            />     
            
            <CommonInput 
                control={control}
                error={errors.username}
                fieldName="username" 
                placeholder={t("ForgotPassword.emailAddr")}
                keyboardType='email-address' 
                mt={10}
            />

            { loading ? <Spinner/> : <CommonButton 
                onPress={handleSubmit(onSubmit)}
                label={t("ForgotPassword.getOtp")}
                mt={5}
            />}
        </KeyboardAwareScrollView>
        </Box>

    </>
    
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})