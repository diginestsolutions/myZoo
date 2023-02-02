import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Icon, ScrollView, Text, HStack, useToast, Spinner, FlatList } from 'native-base'
import Header from '../../../../../Components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Sharebutton from './Sharebutton'
import Title from '../../Title'
import MyzooPicks from '../../../../Dashboard/MyZooPicks'
import Ratings from '../../../../Dashboard/Item/Ratings'
import CommonInput from '../../../../../Components/CommonInput'
import Button from '../../../../../Components/Button'
import ReviewsCard from './ReviewsCard'
import SellerCard from './SellerCard'
import CommonBackground from '../../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import {getSellerDetails, getSellerFeedback, getSellerProducts} from '../../../../../Redux/actions/orderAction'
import { RESET_FEEDBACK } from '../../../../../Redux/constants/orderConstant'
import { useTranslation } from "react-i18next";
import CardTitle from '../../../../Dashboard/CardTitle'
import PetsCard from '../../../../Dashboard/PetsCard'
import { IMAGE_URL } from '../../../../../config/Constants'


const LeaveSellerFeedback = ({navigation}) => {

    const { t } = useTranslation();

    const { width, height } = useWindowDimensions()
    
    const dispatch = useDispatch();
    const toast = useToast()

    const { sellerFeedback, loading, error, orderList, sellerProduct, sellerDetails } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        let data = {
            id: userData?.id,
        }
        dispatch(getSellerDetails(data))
    
    }, [])

    useEffect(() => {
        let data = {
            id: userData?.id,
        }
        dispatch(getSellerProducts(data))
    
    }, [])

   

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(sellerFeedback){
            dispatch({
                type: RESET_FEEDBACK        
                })
            toast.show({
                title: 'Submitted',
            })
            
            // navigation.navigate('MyOrder')
        }
    }, [error, sellerFeedback])



    const schema = yup.object({   

        Comments: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
        
            Comments:data.Comments,
            OrderId: orderList?._id,
            SellerId: userData?.id,
            UserId: userData?.id,
            Rating: "3.5",
            
        }

        dispatch(getSellerFeedback(datas))
    };

    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   
            image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
            // image={{ uri: item.Images[0]?.ClientFileName}} 
            productName={item.Name}
            gender={item.Gender}
            price={item.Price}
            weight={item.Weight}
            weightType={item.weighttype[0]?.Type}
            age={item.Age}
            ageType={item.agetype[0]?.Type}
            rating={item.rating}
            city={item.City}
            vendor={item.VenderDetails[0]?.Name}
            SellingMode={item.SellingMode}
            Isverified={item.Isverified}
            BasePrice={item.BasePrice}
            FinalPrice={item.FinalPrice}
       
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
                    <Text  fontWeight={400} fontSize={16} color={'#000'}>{sellerDetails?.[0]?.profile?.[0]?.FirstName} {sellerDetails?.[0]?.profile?.[0]?.LastName}</Text>
                    <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/>                        
                </HStack>
                <HStack justifyContent={'space-between'}>
                    <Text  fontWeight={400} fontSize={16} color={'#535353'}>{sellerDetails?.[0]?.profile?.[0]?.City}</Text>
                    <HStack alignItems={'center'}>
                        <Icon as={<Ionicons/>} name='ios-star' size={19} color='yellow.500' />
                        <Text fontWeight={500} fontSize={16} ml={2} color={'gray.700'}>4.5</Text>
                    </HStack>
                </HStack>                
            </Box>

            <Box p={3}>

                <Title label={t("LeaveSellerFeedback.abtSeller")}/>
                <Box>
                    <Text fontWeight={200} fontSize={15} color={'#535353'}>Energetic, obedient, agile and can compete in dog sports. Adapts well to apartment living, good for new pet owners, tolerates cold weather, affectionate even with kids, doesn’t drool, easy to train and very playful.</Text>
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

                <SellerCard/>

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

                <Title label={t("LeaveSellerFeedback.revRateItem")}/>
                <Box alignItems={'flex-start'}>
                    <Ratings imageSize={22}/>
                </Box>
                <CommonInput 
                    control={control}
                    error={errors.Comments}
                    fieldName="Comments" 
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