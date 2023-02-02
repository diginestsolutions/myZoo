import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Icon, ScrollView, Text, HStack, useToast, Spinner, FlatList } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Sharebutton from './Sharebutton'
import Title from '../../Title'
import Ratings from '../../../ProductDetails/Ratings'
import CommonInput from '../../../../Components/CommonInput'
import Button from '../../../../Components/Button'
import ReviewsCard from './ReviewsCard'
import SellerCard from './SellerCard'
import CommonBackground from '../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import {getSellerDetails, getSellerFeedback, getSellerProducts} from '../../../../Redux/actions/orderAction'
import { RESET_FEEDBACK } from '../../../../Redux/constants/orderConstant'
import { useTranslation } from "react-i18next";
import CardTitle from '../../../../Components/CardTitle'
import PetsCard from '../../../../Components/PetsCard'
import { IMAGE_URL } from '../../../../config/Constants'
import { LOADING } from '../../../../Redux/constants/homeConstant'
import customAxios from '../../../../CustomAxios'
import RatingsViewer from '../../../ProductDetails/RatingsViewer'
import reactotron from 'reactotron-react-native'


const LeaveSellerFeedback = ({navigation, route}) => {

    const { productId, orderId, sellerId } = route.params

    const { t } = useTranslation();

    const { width, height } = useWindowDimensions()
    const [ rating, setRating ] = useState('')

    
    const dispatch = useDispatch();
    const toast = useToast()

    const [sellerDetails, setSellerDetails] = useState(null)
    const [sellerProduct, setSellerProduct] = useState(null)

    const { sellerFeedback, loading, error, orderList } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    reactotron.log({userData})

    useEffect(() => {
        getSellerDetails()
    }, [])

    const getSellerDetails = async() => {
        let data = {
            id: sellerId,
        }
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`Front_End/Mob_products/detailsOneseller`,data)  
        .then(async response => {
            setSellerDetails(response.data.data)
    
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

    useEffect(() => {
        
        getSellerProducts()
    
    }, [])

    const getSellerProducts = async() => {

        let data = {
            id: sellerId
        }
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`Front_End/Mob_products/_getproductList`,data)  
        .then(async response => {
            setSellerProduct(response.data.data)
    
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

   

    



    const schema = yup.object({   

        Comments: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    let ratings = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    }

    const onSubmit = data => {
        let datas={
            OrderId: orderId,
            SellerId:sellerId,
            UserId: userData?.id,
            Rating: rating,
            Comments: data.Comments
        }

        saveSellerFeedbacks(datas)
    };

    const saveSellerFeedbacks = async(datas) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`Front_End/CartMob/_leaveSellerFeedbacks`, datas)  
        .then(async response => {
    
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



    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}  
       
        />
    )


    
    return (
    <>
  

        <CommonBackground>
           
            <ScrollView >
            <ImageBackground 

                source={{ uri: `${IMAGE_URL}${sellerDetails?.[0]?.profile?.[0]?.Image?.[0]?.UploadedFileName}`}} 
       
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                style={{height:height/2-31, width: width}}
                resizeMode='contain'
                marginTop={-1}
            >
                <Sharebutton goBack={()=>navigation.goBack()}/>
            </ImageBackground>

            <Box width={'95%'} bg={'#fff'}alignSelf='center' borderRadius={10} mt={-10} p={3} elevation={12}>
                <HStack justifyContent={'space-between'}>
                    <Text  fontWeight={400} fontSize={16} color={'#000'}>{sellerDetails?.[0]?.profile.length > 0 ?`${sellerDetails?.[0]?.profile?.[0]?.FirstName} ${sellerDetails?.[0]?.profile?.[0]?.LastName}` : sellerDetails?.[0]?.Name}</Text>
                    {sellerDetails?.[0]?.Isverified && <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/> }                      
                </HStack>
                <HStack justifyContent={'space-between'}>
                    <Text  fontWeight={400} fontSize={16} color={'#535353'}>{sellerDetails?.[0]?.profile?.[0]?.City}</Text>
                    {sellerDetails?.[0]?.rating && <HStack alignItems={'center'}>
                        <Icon as={<Ionicons/>} name='ios-star' size={19} color='yellow.500' />
                        <Text fontWeight={500} fontSize={16} ml={2} color={'gray.700'}>{sellerDetails?.[0]?.rating}</Text>
                    </HStack>}
                </HStack>                
            </Box>

            <Box p={3}>

                <Title label={t("LeaveSellerFeedback.abtSeller")}/>
                <Box>
                    <Text fontWeight={200} fontSize={15} color={'#535353'}>{sellerDetails?.[0]?.profile?.[0]?.AboutMe}</Text>
                </Box>

                {/* <MyzooPicks label={t("LeaveSellerFeedback.itemSale")}/> */}

                <CardTitle label={t("LeaveSellerFeedback.itemSale")}/>

                {loading ? <Spinner/> : <FlatList 
                    data={sellerProduct}
                    keyExtractor={(item) => item?._id}
                    renderItem={renderItems}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />}

                {/* <SellerCard/> */}
                <HStack justifyContent={'space-between'} px={10}>
                        <Box alignItems={'center'} justifyContent="center">
                            <Text fontSize={50} color={'gray.600'}>{5.0}</Text>
                            <Ratings imageSize={16} defaultRating={1} readonly={true} />
                            <Text fontSize={16} color={'gray.500'}>{2} ratings</Text>
                        </Box>
                        <Box width={width/2-40}>
                            <RatingsViewer ratings={ratings} />
                        </Box>
                    </HStack>
                

                <Title label={t("LeaveSellerFeedback.revRateItem")}/>
                <Box alignItems={'flex-start'}>
                    <Ratings imageSize={22} defaultRating={0} onFinishRating={setRating}/>
                </Box>
                <CommonInput 
                    control={control}
                    error={errors.Comments}
                    fieldName="Comments" 
                    numLines={3}
                    height={85}
                    placeholder={t("LeaveSellerFeedback.wrYrRevHere")}
                />
                <Text fontSize={11} color={'#535353'} fontWeight={200} mt={2} ml={1}>The name "MyZoo customer will be displayed with your feedback"</Text>
                <Text fontSize={12} color={'#008ECC'} fontWeight={300}  ml={1}>{t("LeaveSellerFeedback.useDefName")}</Text>

                <Button 
                    onPress={handleSubmit(onSubmit)}
                    label={t("LeaveSellerFeedback.subFed")} marginTop={5}
                />
                <Text fontSize={16} color={'#000'} my={3}>42 reviews</Text>

                <ReviewsCard/>

            </Box>

            </ScrollView>
                
        </CommonBackground>
    </>
    )
}

export default LeaveSellerFeedback

const styles = StyleSheet.create({})