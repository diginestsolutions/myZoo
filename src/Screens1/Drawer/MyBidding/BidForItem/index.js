import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, Icon, ScrollView, Text, FlatList, HStack, useToast, Spinner } from 'native-base'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import Header from '../../../../Components/Header'
import Heading from '../../../../Components/Heading'
import CommonInput from '../../../../Components/CommonInput'
import Button from '../../../../Components/Button'
import Entypo from 'react-native-vector-icons/Entypo'
import CommonBackground from '../../../../Components/CommonBackground'
import { getAllBidders, getLastBiddingAmount, submitBidding } from '../../../../Redux/actions/myItemsAction';
import { RESET_ITEM } from '../../../../Redux/constants/myItemsConstant';
import { useTranslation } from "react-i18next";
import reactotron from 'reactotron-react-native';


const BidForItem = ({route}) => {


    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { productId } = route.params

    reactotron.log(productId)

    const { myBid, loading, error, currentBid, biddersList } = useSelector(state => state.myItems)

    const { userData } = useSelector(state => state.auth)
    const { productById } = useSelector(state => state.home)

    // const count = biddersList.length
    // reactotron.log(count)

    
    useEffect(() => {
        
        
        let data ={
            _id : productId,
            countryId: userData?.Country
        }
        dispatch(getLastBiddingAmount(data))

   
    }, [myBid])

    useEffect(() => {
        
        if(myBid){
            let data ={
                _id : productId,
                countryId: userData?.Country
            }
            dispatch(getAllBidders(data))
        }else{
            let data ={
                _id : productId,
                countryId: userData?.Country
            }
            dispatch(getAllBidders(data))
        }
    
    }, [myBid])


    const schema = yup.object({   
        bidAmount: yup.number().required().positive().integer(),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
            bidAmount: data.bidAmount,
            ProductId: productId,
            UserId: userData?.id,
            UserType: userData?.UserType,
            bidAmountWS: currentBid?.[0]?.bidAmountWS,
            countryId: userData?.Country
        }

        dispatch(submitBidding(datas))

        if(myBid){
            toast.show({
                title: 'Your bid has been placed successfully',
            })
        }
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
                    {loading ? <Spinner/> : <Text alignSelf={'center'} fontWeight={400} color='#000000' fontSize={29}>{currentBid?.[0]?.bid}</Text>}
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