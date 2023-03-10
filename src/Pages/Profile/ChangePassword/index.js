import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Image, ScrollView, Icon, useToast } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import CommonBackground from '../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { RESET_AUTH } from '../../../Redux/constants/authConstant'
import { useTranslation } from "react-i18next";
import { changePasswordd } from '../../../Redux/actions/settingsAction'
import { LOADING } from '../../../Redux/constants/homeConstant'
import customAxios from '../../../CustomAxios'


const ChangePassword = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { pswdChange, loading, error, userData } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(pswdChange){
            dispatch({
                type: RESET_AUTH        
                })
            toast.show({
                title: 'Password Changed Successfully',
            })
            // navigation.navigate('SignIn')
        }
    }, [error, pswdChange])


    const schema = yup.object({   
        OldPassword: yup.string().required('Current Password is required'),
        NewPassword:  yup.string().required('Password is required'),
        confirmPassword: yup.string().required('Password is required').oneOf([yup.ref('NewPassword'), null], 'Passwords does not match'),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit =async data => {
        let datas={
            _id: userData?.id,
            OldPassword: data.OldPassword,
            NewPassword: data.NewPassword
        }

        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`admin/UserProfile/ChangePassword`, datas)  
        .then(async response => {
            toast.show({
                title: "Success",
                description: "Password updated successfully",
                backgroundColor: "success.500"
            })

            navigation.goBack()
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: "error.500"
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
        dispatch(changePasswordd(datas))
    };
  return (
    <>


    <CommonBackground>
        <Heading label={t("ChangePassword.changePswd")}/>
        
        <ScrollView p={4}>
            <CommonInput 
                control={control}
                error={errors.OldPassword}
                fieldName="OldPassword" 
                placeholder={t("ChangePassword.crntPswd")}
                topLabel={t("ChangePassword.EntCrntPawd")}
                inputType="password"
            />
            <CommonInput 
                control={control}
                error={errors.NewPassword}
                fieldName="NewPassword" 
                placeholder={t("ChangePassword.enterNewPaswd")}
                topLabel={t("ChangePassword.newPswd")}
                inputType="password"
            />
            <CommonInput 
                control={control}
                error={errors.confirmPassword}
                fieldName="confirmPassword" 
                placeholder={t("ChangePassword.reEntPwsd")}
                topLabel={t("ChangePassword.reEntNewPwsd")}
                inputType="password"
            />
            <Button 
                onPress={handleSubmit(onSubmit)}
                label={t("ChangePassword.submit")}
                marginTop={5}
            />
        </ScrollView>
            
    </CommonBackground>
</>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})