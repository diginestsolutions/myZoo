import { StyleSheet } from 'react-native'
import React,{ useEffect } from 'react'
import { Box, StatusBar, useToast, Spinner } from 'native-base'
import CommonButton from '../../../Components/CommonButton'
import CommonTitle from '../CommonTitle'
import CommonSubtitle from '../CommonSubtitle'
import Logo from '../../../Components/Logo'
import CommonLink from '../CommonLink'
import OtpInput from './OtpInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../../Redux/actions/authAction'
import { useTranslation } from "react-i18next";


const OtpVerification = ({navigation}) => {

    const { t } = useTranslation();


    const dispatch = useDispatch();
    const toast = useToast();
  
    const { verifySuccess, error, loading, user } = useSelector(state => state.auth)
  
    useEffect(() => {
        if(verifySuccess){
          toast.show({
            title: 'Success',
          })
          navigation.navigate('ResetPassword')
          dispatch({
            type: RESET_ERROR
          })
        }
  
        if(error){
          toast.show({
            title: 'Error',
            description: error,
          })
  
          dispatch({
            type: RESET_ERROR
          })
        }
    }, [verifySuccess, error])
    
  
    const schema = yup.object({
        }).required();
        const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver : yupResolver(schema)
    });
  
    const onSubmit = data => {
        let datas={
            otp:data.otp,
            UserId: user.id,
        }
      dispatch(sendOtp(datas))
    };
  return (
    <>
    <StatusBar hidden={true}/>    

        <Box bg='#fff' flex={1} px={3}>
        <KeyboardAwareScrollView> 
            <Box alignItems='center' mb={10}>
                <Logo/>
                <CommonTitle label={t("OtpVerification.otpVer")}/>
                <CommonSubtitle label={t("OtpVerification.enterOtp")} mt={2}/>
            </Box>

            <OtpInput onchange={(text) => setValue("otp", text)}/>

            <CommonLink 
                onPress={()=>navigation.navigate('SignIn')}
                text={t("OtpVerification.didntReceiv")}
                label={t("OtpVerification.resend")}
            />

            { loading ? <Spinner/> : <CommonButton        
                onPress={handleSubmit(onSubmit)} 
                label={t("OtpVerification.verify")}
                mt={5}
            />}
        </KeyboardAwareScrollView>
        </Box>

    </>
    
  )
}

export default OtpVerification

const styles = StyleSheet.create({})