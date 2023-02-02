import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Spinner, StatusBar, useToast } from 'native-base'
import CommonButton from '../../../Components/CommonButton'
import CommonTitle from '../CommonTitle'
import CommonSubtitle from '../CommonSubtitle'
import Logo from '../../../Components/Logo'
import CommonInput from '../../../Components/CommonInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputHeader from './InputHeader'
import { RESET_AUTH } from '../../../Redux/constants/authConstant'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { resetPswd } from '../../../Redux/actions/authAction'
import { useTranslation } from "react-i18next";


const ResetPassword = ({navigation, route}) => {

    const { t } = useTranslation();

    const { userId } = route.params

    const dispatch = useDispatch();
    const toast = useToast()  

    const { changeSuccess, loading, error } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(changeSuccess){
            dispatch({
                type: RESET_AUTH        
                })
            toast.show({
                title: 'Success',
                description: "Password Changed Successfully"
            })
            navigation.navigate('SignIn')
        }
    }, [error, changeSuccess])


    const schema = yup.object({   
        
        Password: yup.string().required('New Password is required'),
        ConfirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('Password'), null], 'Passwords does not match'),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
        
            Password: data.Password,
            ConfirmPassword: data.ConfirmPassword,

            AppUserId: userId,
        }
        dispatch(resetPswd(datas))
    };
  return (
    <>
    <StatusBar hidden={true}/> 
    
    <Box bg='#fff' flex={1} px={3}>
        <KeyboardAwareScrollView>

            <Box alignItems='center'>
                <Logo/>
                <CommonTitle label={t("ResetPassword.rstpswd")}/>
                <CommonSubtitle label={t("ResetPassword.enterNewPaswd")} mt={2}/>
            </Box>
        
            <InputHeader label={t("ResetPassword.newPswd")} mt={10}/>

            <CommonInput 
                control={control}
                error={errors.Password}
                fieldName="Password" 
                placeholder={t("ResetPassword.newPswd")} 
                iconName='eye-outline' 
                inputType='password'
                mt={2}
            />

            <InputHeader label={t("ResetPassword.cnfrmPswd")} mt={3}/>

            <CommonInput 
                control={control}
                error={errors.ConfirmPassword}
                fieldName="ConfirmPassword" 
                placeholder={t("ResetPassword.cnfrmPswd")} 
                iconName='eye-outline' 
                inputType='password' 
                mt={2}
            />

            { loading ? <Spinner/> : <CommonButton 
                onPress={handleSubmit(onSubmit)}
                label={t("ResetPassword.done")} 
                mt={10}
            />}

        </KeyboardAwareScrollView>
    </Box>



    </>
    
  )
}

export default ResetPassword

const styles = StyleSheet.create({})