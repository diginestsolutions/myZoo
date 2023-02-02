import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Text, FlatList, HStack, Icon, Spinner, useToast } from 'native-base'
import CardTitle from '../CardTitle'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getMyZooPicks } from '../../../Redux/actions/homeAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import PetsCard from '../PetsCard'
import { getLastBiddingAmount } from '../../../Redux/actions/myItemsAction'
import { IMAGE_URL } from '../../../config/Constants'
import { isEmpty } from 'lodash'


const MyzooPicks = ({ label, onPress}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { myZooPicks, loading, error } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country : "5fe321d2e9ce6f4494dd8b81"
        }
        dispatch(getMyZooPicks(data))
        
    }, [])


    useEffect(() => {
        if(userData?.Country){
            let data = {
                countryId : !isEmpty(userData?.Country) ? userData?.Country : "5fe321d2e9ce6f4494dd8b81"
            }
            dispatch(getMyZooPicks(data))
        }
    }, [userData?.Country])
    
      
    useEffect(() => {
        if(error){
            // toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [error])

    const navigation = useNavigation();

    useEffect(() => {
        
        let data ={
            _id : myZooPicks?._id,
            countryId: userData?.Country,
        }
        dispatch(getLastBiddingAmount(data))
       
    
    }, [])

   


    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   
            image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
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
            bidType={item?.BidType}
        />
    )

if(!myZooPicks || myZooPicks.length === 0){
    return null
}


  return (
    <>
        <CardTitle label={label}/>

        <FlatList 
            data={myZooPicks}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    </>
  )
}

export default MyzooPicks

const styles = StyleSheet.create({})