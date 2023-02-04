import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, useToast, Spinner, HStack, Text, Select } from 'native-base'
import Header from '../../../../../Components/Header'
import Heading from '../../../../../Components/Heading'
import OrderCard from '../../OrderCard'
import Title from '../../Title'
import SelectInput from '../../../../../Components/SelectInput'
import CommonInput from '../../../../../Components/CommonInput'
import Button from '../../../../../Components/Button'
import CommonBackground from '../../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { RESET_FEEDBACK } from '../../../../../Redux/constants/orderConstant'
import { getReturnRequest } from '../../../../../Redux/actions/orderAction'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../../../config/Constants'


const ReturnRequest = ({navigation}) => {

    const { t } = useTranslation();
     
    const dispatch = useDispatch();
    const toast = useToast()

    const { returnRequest, loading, error, orderList, activeOrder } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(returnRequest){
            dispatch({
                type: RESET_FEEDBACK        
                })
            toast.show({
                title: 'Submitted',
            })
            
            navigation.navigate('MyOrder')
        }
    }, [error, returnRequest])



    const schema = yup.object({   

        Comments: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
        
            Comments:data.Comments,
            OrderId: activeOrder?._id,
            UserId: userData?.id,
            ProductId: "610e1f20753309345ca916f6",
            ReasonId: "600961f0927e0c2bfc585556",
            
        }

        dispatch(getReturnRequest(datas))
    };


    return (
    <>

        <CommonBackground>
        <ScrollView>
            <Heading label={t("RequestReturn.reqRet")}/>
            <Box p={3}>

            {/* <OrderCard 
                status={'Item'}
            />  */}

            <HStack 
                borderWidth={1} borderColor={'#B4B4B4'} 
                p={3} alignItems='center' mx={1} my={3} borderRadius={7} 
            >
                <ImageBackground 
                    source={{ uri: `${IMAGE_URL}${activeOrder?.Images?.[0]?.UploadedFileName}`}}               
                    style={{height:110, width:110}}>
                </ImageBackground>
                <Box w={'80%'}>
                    <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{activeOrder?.productName}</Text>
                    <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{activeOrder?.orderDate}</Text>
                </Box>
                
            </HStack>



            <Title label={t("RequestReturn.reason")}/>

            <SelectInput placeholder={t("RequestReturn.chooseRes")}/>

            <Title label={t("RequestReturn.wrtCmt")}/>

            <CommonInput 
                control={control}
                error={errors.Comments}
                fieldName="Comments" 
                placeholder={t("RequestReturn.wrtYrRsn")} 
                height={70} mt={3}
            />

            { loading ? <Spinner/> : <Button 
                onPress={handleSubmit(onSubmit)}
                label={t("RequestReturn.proRet")}  
                marginTop={5}
            />}
            </Box>
        

        </ScrollView>
                
        </CommonBackground>
    </>
    )
}

export default ReturnRequest

const styles = StyleSheet.create({})