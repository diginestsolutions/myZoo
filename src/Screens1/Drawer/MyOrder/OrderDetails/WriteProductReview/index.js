import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, Text, HStack, Pressable, useToast, Spinner } from 'native-base'
import Header from '../../../../../Components/Header'
import Heading from '../../../../../Components/Heading'
import OrderCard from '../../OrderCard'
import Ratings from '../../../../Dashboard/Item/Ratings'
import Title from '../../Title'
import CommonInput from '../../../../../Components/CommonInput'
import Button from '../../../../../Components/Button'
import ReviewsCard from '../LeaveSellerFeedback/ReviewsCard'
import CommonBackground from '../../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { RESET_FEEDBACK } from '../../../../../Redux/constants/orderConstant'
import { getProductReview } from '../../../../../Redux/actions/orderAction'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../../../config/Constants'


const WriteProductReview = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { productReview, loading, error, activeOrder } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(productReview){
            dispatch({
                type: RESET_FEEDBACK        
                })
            toast.show({
                title: 'Submitted',
            })
            
            navigation.navigate('MyOrder')
        }
    }, [error, productReview])



    const schema = yup.object({   

        Comment: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
            Comment:data.Comment,
            OrderId: activeOrder?._id,
	        UserId: userData?.id,
            ProductId: activeOrder?._id,
            Rating: "4",
        }
        dispatch(getProductReview(datas))
    };



    return (
    <>
        <CommonBackground>
            <ScrollView>
            <Heading label={t("ItemReviews.itmRev")}/>
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

                <HStack justifyContent={'space-between'} px={10}>
                    <Box alignItems={'center'}>
                        <Text fontSize={50} color={'gray.600'}>5.0</Text>
                        <Ratings imageSize={16}/>
                        <Text fontSize={16} color={'#535353'}>47 item ratings</Text>
                    </Box>
                    <Box alignItems={'center'} justifyContent='center'>
                        
                        <Ratings imageSize={16}/>
                        <Text fontSize={16} color={'#535353'}>0 ratings</Text>
                    </Box>
                </HStack> 

                <Title label={t("ItemReviews.ovrRat")}/>

                <Box alignItems={'flex-start'}>
                    <Ratings imageSize={17}/>
                </Box>
                <Text fontSize={12} color={'#3D3D3D'} fontWeight={400}>{t("ItemReviews.shopFndImgNvid")}</Text>

              
                <Pressable bg='#F1F9FF' width={75} height={75} my={3} alignItems={'center'} justifyContent={'center'}>
                    <FontAwesome name='camera' color={'#1A73BA'} size={25}/>
                    <Text fontSize={10}color={'#1A73BA'} mt={2}>{t("ItemReviews.addImg")}</Text>
                </Pressable>

                {/* <Title label={t("ItemReviews.addHdLne")}/> */}

                {/* <CommonInput placeholder={"What's most important to know?"} mt={1}/> */}

                <Title label={t("ItemReviews.wrtYrReview")}/>

                <CommonInput 
                    control={control}
                    error={errors.Comment}
                    fieldName="Comment" 
                    placeholder={t("ItemReviews.whtDidYou")}  
                    mt={1} height={60}
                />

                <Text fontSize={11} color={'#535353'} fontWeight={200} mt={2} ml={1}>The name "MyZoo customer will be displayed with your feedback"</Text>
                <Text fontSize={12} color={'#008ECC'} fontWeight={300}  ml={1}>{t("ItemReviews.useDefName")}</Text>
                

                {loading ? <Spinner/> : <Button 
                    onPress={handleSubmit(onSubmit)}
                    label={t("ItemReviews.subFed")}
                    marginTop={5}
                />}

                <Text fontSize={16} color={'#000'} my={3}>42 reviews</Text>

                <ReviewsCard/>
            </Box>
            </ScrollView>
                
        </CommonBackground>
    </>
    )
}

export default WriteProductReview

const styles = StyleSheet.create({})