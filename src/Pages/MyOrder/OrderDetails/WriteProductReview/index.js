import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, Text, HStack, Pressable, useToast, Spinner } from 'native-base'
import Heading from '../../../../Components/Heading'
import Ratings from '../../../ProductDetails/Ratings'

import Title from '../../Title'
import CommonInput from '../../../../Components/CommonInput'
import Button from '../../../../Components/Button'
import ReviewsCard from '../LeaveSellerFeedback/ReviewsCard'
import CommonBackground from '../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { RESET_FEEDBACK } from '../../../../Redux/constants/orderConstant'
import { getProductReview } from '../../../../Redux/actions/orderAction'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../../config/Constants'
import moment from 'moment'
import RatingsViewer from '../../../ProductDetails/RatingsViewer'
import { LOADING } from '../../../../Redux/constants/homeConstant'
import customAxios from '../../../../CustomAxios'


const WriteProductReview = ({ navigation, route }) => {

    const { t } = useTranslation();

    const { order } = route.params

    const [rating, setRating] = useState(0)
    const [ratingLevel, setRatingLevel] = useState(0)
    const [ reviewList, setReviewlist ] = useState(null)

    const dispatch = useDispatch();
    const toast = useToast()

    const { productReview, loading, error, activeOrder } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)
    const { width, height } = useWindowDimensions()

    const [ratings, setRatings] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    })

    


    useEffect(() => {
        productRating()
        getReviewList()
    }, [])
    


    useEffect(() => {
        if (error) {

            toast.show({
                title: 'Error',
                description: error
            })

        }
        if (productReview) {
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

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Comment: ''
        }
    });

    const onSubmit = data => {
        let datas = {
            Comment: data.Comment,
            OrderId: order?._id,
            UserId: userData?.id,
            ProductId: order?.orderdetails?.productId,
            Rating: rating,
        }
        getProductReview(datas)
    };


    const getProductReview = async(datas) => {
        dispatch({
            type: LOADING,
            payload: true
        })


    
        await customAxios.post(`Front_End/CartMob/_purchasedProductReviews`, datas)  
        .then(async response => {

            toast.show({
                title: 'Success',
                description: "Feedback submited successfully",
                backgroundColor: 'success.500'
            })

            reset()
            
    
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

    const getReviewList = async() => {
        let data = {
            ProductId: order?.orderdetails?.productId
        }

        await customAxios.post(`admin/Productdetails/_listallproductreview`, data)  
        .then(async response => {

            setReviewlist(response.data)
    
        })
        .catch(async error => {
            
        });
    }


    const productRating = async() => {

        let data = {
            ProductId: order?.orderdetails?.productId
        }
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customer/product/_CountOfRating`, data)  
        .then(async response => {
            let count = 0;
            if(response?.data){
            response?.data[0].counts.map(c => {
                count += c.Count
                if(c.Rating === 1){
                    ratings.one = c.Count
                    
                }
                else if(c.Rating === 2){
                    ratings.two = c.Count
                }
                else if(c.Rating === 3){
                    ratings.three = c.Count
                }
                else if(c.Rating === 4){
                    ratings.four = c.Count
                }
                else if(c.Rating === 5){
                    ratings.five = c.Count
                }
            })

            setRatings({ ...ratings })
            setRating(count)

            setRatingLevel(count/response?.data[0].counts.length)
        }
    
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
                    <Heading label={t("ItemReviews.itmRev")} />
                    <Box p={3}>

                        {/* <OrderCard 
                    status={'Item'}
                />  */}

                        <HStack
                            borderWidth={1} borderColor={'#B4B4B4'}
                            p={3} alignItems='center' mx={1} my={3} borderRadius={7}
                        >
                            <ImageBackground
                                source={{ uri: `${IMAGE_URL}${order?.products?.Images?.[0]?.UploadedFileName}` }}
                                style={{ height: 110, width: 110 }}>
                            </ImageBackground>
                            <Box w={'80%'}>
                                <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{order?.products?.Name}</Text>
                                <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{moment(order?.orderDate).format("DD-MM-YYYY")}</Text>
                            </Box>

                        </HStack>
                        <HStack justifyContent={'space-between'} px={10}>
                            <Box alignItems={'center'} justifyContent="center">
                                <Text fontSize={50} color={'gray.600'}>{5.0}</Text>
                                <Ratings imageSize={16} defaultRating={ratingLevel} readonly={true} />
                                <Text fontSize={16} color={'gray.500'}>{rating} ratings</Text>
                            </Box>
                            <Box width={width / 2 - 40}>
                                <RatingsViewer ratings={ratings} />
                            </Box>
                        </HStack>

                        <Title label={t("ItemReviews.ovrRat")} />

                        <Box alignItems={'flex-start'}>
                            <Ratings imageSize={17} defaultRating={rating} onFinishRating={setRating} />
                        </Box>
                        {/* <Text fontSize={12} color={'#3D3D3D'} fontWeight={400}>{t("ItemReviews.shopFndImgNvid")}</Text>


                        <Pressable bg='#F1F9FF' width={75} height={75} my={3} alignItems={'center'} justifyContent={'center'}>
                            <FontAwesome name='camera' color={'#1A73BA'} size={25} />
                            <Text fontSize={10} color={'#1A73BA'} mt={2}>{t("ItemReviews.addImg")}</Text>
                        </Pressable> */}

                        {/* <Title label={t("ItemReviews.addHdLne")}/> */}

                        {/* <CommonInput placeholder={"What's most important to know?"} mt={1}/> */}

                        <Title label={t("ItemReviews.wrtYrReview")} />

                        <CommonInput
                            control={control}
                            error={errors.Comment}
                            fieldName="Comment"
                            placeholder={t("ItemReviews.whtDidYou")}
                            mt={1} 
                            height={60}
                        />

                        <Text fontSize={11} color={'#535353'} fontWeight={200} mt={2} ml={1}>The name "MyZoo customer will be displayed with your feedback"</Text>
                        <Text fontSize={12} color={'#008ECC'} fontWeight={300} ml={1}>{t("ItemReviews.useDefName")}</Text>


                        {loading ? <Spinner /> : <Button
                            onPress={handleSubmit(onSubmit)}
                            label={t("ItemReviews.subFed")}
                            marginTop={5}
                        />}

                        <Text fontSize={16} color={'#000'} my={3}>42 reviews</Text>

                        <ReviewsCard reviewList={reviewList} />
                    </Box>
                </ScrollView>

            </CommonBackground>
        </>
    )
}

export default WriteProductReview

const styles = StyleSheet.create({})