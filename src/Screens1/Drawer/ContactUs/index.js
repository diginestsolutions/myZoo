import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Spinner, useToast, ScrollView, Text } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import Button from '../../../Components/Button'
import CommonInput from '../../../Components/CommonInput'
import CommonBackground from '../../../Components/CommonBackground'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../../Redux/actions/settingsAction'
import { RESET } from '../../../Redux/constants/settingsConstant'
import { useTranslation } from "react-i18next";


const ContactUs = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { contact, loading, error } = useSelector(state => state.settings)

    useEffect(() => {
        if(error){

        toast.show({
            title: 'Error',
            description : error
        })
        
        }    
        if(contact){
        dispatch({
            type: RESET        
            })
        toast.show({
            title: contact.msg
        })
        }
    }, [error, contact])



    const schema = yup.object({   

        Email: yup.string().email().required(),
        Name: yup.string().required(),
        Message: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas = {
            Email: data.Email,
            Message: data.Message,
            Name: data.Name,
        }
        dispatch(contactUs(datas))
    }; 

    return (
    <>
       
        <CommonBackground>

            <Heading label={t("ContactUs.contUs")}/>

            <ScrollView p={3}>
            
                <Text color={'#535353'} fontWeight={200} fontSize={16}>{t("ContactUs.areUExp")}</Text>
                <Text color={'#008BFC'} fontWeight={200} fontSize={17} mt={4}>{t("ContactUs.fileComplnt")}</Text>
                <CommonInput 
                    control={control}
                    error={errors.Email}
                    fieldName="Email" 
                    placeholder={t("ContactUs.email")} mt={3}
                />
                <CommonInput 
                    control={control}
                    error={errors.Name}
                    fieldName="Name" 
                    placeholder={t("ContactUs.name")} mt={3}
                />
                <CommonInput 
                    control={control}
                    error={errors.Message}
                    fieldName="Message" 
                    placeholder={t("ContactUs.note")} mt={3}
                />
                <Button 
                    onPress={handleSubmit(onSubmit)}
                    label={t("ContactUs.submit")} marginTop={3}
                />

            </ScrollView>
            
        </CommonBackground>
    </>
  )
}

export default ContactUs

const styles = StyleSheet.create({})