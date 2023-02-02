import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, useToast, ScrollView, Text, Spinner, HStack } from 'native-base'
import Heading from '../../../../Components/Heading'
import Title from '../../Title'
import Ratings from '../../../ProductDetails/Ratings'
import CommonInput from '../../../../Components/CommonInput'
import Button from '../../../../Components/Button'
import CommonBackground from '../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveryFeedback } from '../../../../Redux/actions/orderAction'
import { RESET_FEEDBACK } from '../../../../Redux/constants/orderConstant'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../../config/Constants'
import moment from 'moment'
import customAxios from '../../../../CustomAxios'
import { LOADING } from '../../../../Redux/constants/homeConstant'


const LeaveDeliveryFeedback = ({navigation, route}) => {

    const { order } = route.params

    const [rating, setRating] = useState(0)

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { deliveryFeedback, loading, error, orderList, activeOrder } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(deliveryFeedback){
            dispatch({
                type: RESET_FEEDBACK        
                })
            toast.show({
                title: 'Submitted',
            })
            
            // navigation.navigate('DeliveryAddress')
        }
    }, [error, deliveryFeedback])



    const schema = yup.object({   

        Comments: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
            Comments:data.Comments,
            OrderId: order?._id,
	        UserId: userData?.id,
        }
        saveDeliveryFeedbacks(datas)
    };

    const saveDeliveryFeedbacks = async(datas) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`Front_End/CartMob/_leaveDeliveryFeedbacks`, datas)  
        .then(async response => {
            toast.show({
                title: 'Success',
                description: "Feedback submitted successfully",
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
    }

  return (
    <>
   

        <CommonBackground>
            <ScrollView>
            <Heading label={t("DeliveryFeedback.delFed")}/>

            <Box p={3}>

            <HStack 
                borderWidth={1} borderColor={'#B4B4B4'} 
                p={3} alignItems='center' mx={1} my={3} borderRadius={7} 
            >
                <ImageBackground 
                    source={{ uri: `${IMAGE_URL}${order?.products?.Images?.[0]?.UploadedFileName}`}}               
                    style={{height:110, width:110}}>
                </ImageBackground>
                <Box w={'80%'}>
                    <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{order?.products?.Name}</Text>
                    <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{moment(order?.orderDate).format("DD-MM-YYYY") }</Text>
                </Box>
                
            </HStack>

                <Title label={t("DeliveryFeedback.rateYrDelExp")}/>
                {/* <Box alignItems={'flex-start'}>
                    <Ratings imageSize={22} defaultRating={rating} onFinishRating={setRating} />
                </Box> */}
                <CommonInput 
                    control={control}
                    error={errors.Comments}
                    fieldName="Comments" 
                    numLines={3}
                    height={85}
                    placeholder={t("DeliveryFeedback.pleaseEntCmt")}
                />
                <Text fontSize={11} color={'#535353'} fontWeight={200} mt={2} ml={1}>The name "MyZoo customer will be displayed with your feedback"</Text>
                <Text fontSize={12} color={'#008ECC'} fontWeight={300}  ml={1}>{t("DeliveryFeedback.useDefName")}</Text>
                
                {loading ? <Spinner/> : <Button 
                    onPress={handleSubmit(onSubmit)}
                    label={t("DeliveryFeedback.subFed")} marginTop={5}
                />}


            </Box>
            

            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default LeaveDeliveryFeedback

const styles = StyleSheet.create({})