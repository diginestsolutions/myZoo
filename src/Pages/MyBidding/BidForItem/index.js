import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, Icon, ScrollView, Text, FlatList, HStack, useToast, Spinner } from 'native-base'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import Heading from '../../../Components/Heading'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTranslation } from "react-i18next";
import reactotron from 'reactotron-react-native';
import CommonBackground from '../../../Components/CommonBackground';
import customAxios from '../../../CustomAxios';
import { LOADING } from '../../../Redux/constants/homeConstant';


const BidForItem = ({route}) => {


    const { t } = useTranslation();

    const [currentBid, setCurrentBid] = useState(null)
    const [biddersList, setBiddersList] = useState([])

    const dispatch = useDispatch();
    const toast = useToast()  

    const { productId } = route.params

    reactotron.log(productId)

    const { loading } = useSelector(state => state.myItems)

    const { userData } = useSelector(state => state.auth)

    // const count = biddersList.length
    // reactotron.log(count)

    
    useEffect(() => {
        
        
        let data ={
            _id : productId,
            countryId: userData?.Country
        }
        getLastBiddingAmount(data)
        getAllBidders(data)

   
    }, [])

    const getLastBiddingAmount = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`profile/Bidding/priceLastBidding`, data)  
        .then(async response => {
            setCurrentBid(response.data)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {

            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
    
        });
    }

    


    const getAllBidders = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`profile/Bidding/bidderslist`, data)  
        .then(async response => {
            setBiddersList(response.data)
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }




    const schema = yup.object({   
        bidAmount: yup.number().required().positive().integer(),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit =async data => {
        let datas={
            bidAmount: data.bidAmount,
            ProductId: productId,
            UserId: userData?.id,
            UserType: userData?.UserType,
            bidAmountWS: currentBid?.[0]?.bidAmountWS,
            countryId: userData?.Country
        }

        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`profile/Bidding/productBid`, datas)  
        .then(async response => {
            let data ={
                _id : productId,
                countryId: userData?.Country
            }

            getAllBidders(data)
            getLastBiddingAmount(data)

            toast.show({
                title: 'Success',
                description: 'Your bid has been placed successfully',
                backgroundColor: 'success.400'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });

        
    };

  const navigation = useNavigation();


const renderItems = ({item}) => {
        
    return(
        <HStack borderTopWidth={0.5} borderBottomWidth={0.5} py={2} alignItems='center' my={1}>
            <Box>
                <Icon as={<Entypo name={'circle'}/>} color="#005EAA" size={3}/>
            </Box>
            <Box flex={0.9} ml={2}>
                <Text fontWeight={200} fontSize={16}>{item.user?.Name}</Text>
                <Text fontWeight={200} color='#535353'>{item?.BidOn}</Text>
            </Box>
            <Box alignItems={'flex-end'} flex={0.3}>
                <Text fontWeight={200} color='#005EAA'>{item?.bid}</Text>
            </Box>
        </HStack>           
    )
}

    

  return (
    <>
    

        <CommonBackground bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
            <Heading label={t("BidForItem.bidForItm")}/>

                <Box shadow={1} p={4}>
                    <Text alignSelf={'center'}fontWeight={200} color='#535353'>{t("BidForItem.crntBid")}</Text>
                    {loading ? <Spinner/> : <Text alignSelf={'center'} fontWeight={400} color='#000000' fontSize={29}>{currentBid?.[0]?.bid ? currentBid?.[0]?.bid : "0.00"}</Text>}
                    <Text alignSelf={'center'} fontWeight={200} color='#005EAA' fontSize={13}>( {biddersList?.length } {t("BidForItem.bids")})</Text>
                    <Box height={0.5} bg={'#E0E0E0'} my={3}/>
                    <CommonInput 
                        control={control}
                        error={errors.bidAmount}
                        fieldName="bidAmount" 
                        placeholder={t("BidForItem.entYrBid")} mt={4}
                    />
                    <Button 
                        onPress={handleSubmit(onSubmit) }
                        label={t("BidForItem.placeBid")} marginTop={6}
                    />

                </Box>
                

                <Text fontWeight={300} color='#005EAA' fontSize={17} m={3} >{t("BidForItem.allBids")}</Text>
                
                {loading ? <Spinner/> : <FlatList 
                    data={biddersList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                    mx={3}
                />}

          
                
                
        </CommonBackground>
    </>
  )
}

export default BidForItem

const styles = StyleSheet.create({})