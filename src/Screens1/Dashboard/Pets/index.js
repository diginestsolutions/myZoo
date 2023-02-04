import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Text, FlatList, HStack, Icon, Spinner, useToast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageTextCard from '../ImageTextCard'
import Favourite from '../../../Components/Favourite'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR, SET_ACTIVE_ITEM } from '../../../Redux/constants/homeConstant'
import CardTitle from '../CardTitle'
import { getLatestPets, getProductById } from '../../../Redux/actions/homeAction'
import PetsCard from '../PetsCard'
import reactotron from '../../../ReactotronConfig'
import { IMAGE_URL } from '../../../config/Constants'
import { isEmpty } from 'lodash'



const Pets = ({ label, onPress}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { latestPets, loading, error } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)



    useEffect(() => {
        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country :  null
        }
       //dispatch(getLatestPets(data))
    
    }, [])
      
    
    useEffect(() => {

    if(error){
        // toast.show({ title: 'Error', description: error })
        dispatch({
        type: RESET_ERROR
        })
    }
    
    }, [error])

    const navigation = useNavigation();

   

    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   
            image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
            productName={item.breed[0]?.BreedName}
            gender={item.Gender}
            price={item.Price}
            weight={item.Weight}
            weightType={item.weighttype[0]?.Type}
            age={item.Age}
            ageType={item.agetype[0]?.Type}
            rating={item.rating}
            city={item.City}
            country={item?.country?.[0]?.Country}
            vendor={item.user.Name}
            SellingMode={item.SellingMode}
            Isverified={item.Isverified}
            BasePrice={item.BasePrice}
            FinalPrice={item.FinalPrice}

        />
    )



  return (
    <>
       {latestPets && <CardTitle label={label}/>}

        <FlatList 
            data={latestPets}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            windowSize={15}
            getItemLayout={(_, index) => ({
                length: 60 + 20, //  WIDTH + (MARGIN_HORIZONTAL * 2)
                offset: (60 + 20) * (index),  //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
                index,
            })}
        />

    </>
  )
}

export default Pets

const styles = StyleSheet.create({})