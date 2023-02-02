import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Text, FlatList, HStack, Icon, Spinner, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import PetsCard from '../../PetsCard'
import { getRecentPost } from '../../../../Redux/actions/homeAction'
import { RESET_ERROR } from '../../../../Redux/constants/homeConstant'
import CardTitle from '../../CardTitle'
import { IMAGE_URL } from '../../../../config/Constants'


const RecentPosts = ({ label, onPress}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { recentPost, loading, error } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
        let data = {
            Type: 1,
	        countryId : userData?.Country
        }
        dispatch(getRecentPost(data))
        
    }, [])
      
    useEffect(() => {
        if(error){
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
            // productName={recentPost?.Name}
            productName={recentPost?.Name}

            gender={recentPost?.Gender}
            price={item.Price}
            // weight={item.Weight}
            // weightType={item.weighttype[0]?.Type}
            // age={item.Age}
            // ageType={item.agetype[0]?.Type}
            // rating={item.rating}
            city={item.City}
            // vendor={item.user.Name}
            // SellingMode={item.SellingMode}
            // Isverified={item.Isverified}
            // BasePrice={item.BasePrice}
            // FinalPrice={item.FinalPrice}
       
        />
    )


  return (
    <>
        <CardTitle label={label}/>

        <FlatList 
            data={recentPost}
            // keyExtractor={(item) => item?.id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    </>
  )
}

export default RecentPosts

const styles = StyleSheet.create({})