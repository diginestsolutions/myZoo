import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Text, FlatList, HStack, Spinner } from 'native-base'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR, SET_ACTIVE_ITEM, SET_ACTIVE_PRODUCT } from '../../../../../Redux/constants/homeConstant'
import PetsCard from '../../../PetsCard'
import { getMyZooPicksProduct } from '../../../../../Redux/actions/homeAction'
import { IMAGE_URL } from '../../../../../config/Constants'

const MyZooPets = () => {

    const { latestPets, myZooPicksProduct, error } = useSelector(state => state.home)
    const dispatch = useDispatch();
    const navigation = useNavigation();


    useFocusEffect(
      React.useCallback(() => {
          let data = {
              Type: latestPets[0]?.Type
          }
          dispatch(getMyZooPicksProduct(data))
      }, [])
    );


    useEffect(() => {
        if(error){
            toast.show({
                title: 'Error',
                description : error
            })
            dispatch({
                type: RESET_ERROR
            })
        }    
        
    }, [error])


    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={3.5}   
            image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
            productName={item.breed[0]?.BreedName}
            price={item.Price}
            weight={item.Weight}
            age={item.Age}
            rating={item.rating}
            city={item.City}
            vendor={item.user.Name}
            SellingMode={item.SellingMode}
            Isverified={item.Isverified}
            BasePrice={item.BasePrice}
            FinalPrice={item.FinalPrice}
        />
    )


  return (
    <Box flex={1} bg='#fff' alignItems='center'>
        <FlatList 
            data={myZooPicksProduct}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    </Box>
  )
}

export default MyZooPets

const styles = StyleSheet.create({})