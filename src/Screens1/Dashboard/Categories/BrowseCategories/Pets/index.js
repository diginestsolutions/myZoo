import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, FlatList, HStack, Image, Pressable, Text, Spinner } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getAllCategories, getLatestPets, getProductList } from '../../../../../Redux/actions/homeAction'
import CommonCard from '../CommonCard'
import { IMAGE_URL } from '../../../../../config/Constants'
import { HOME_INPUT, RESET_ERROR } from '../../../../../Redux/constants/homeConstant'


const Pets = ({}) => {


  const dispatch = useDispatch();


  const { categoryList, loading, error, latestPets } = useSelector(state => state.home)
  const { user } = useSelector(state => state.auth)


    const navigation = useNavigation();


    
    

    
    


    useFocusEffect(
        React.useCallback(() => {
            
            let data = {
                Type: "5fdba02442ef4b45c3a60e4a"
            }
            dispatch(getAllCategories(data))
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

    const renderItems = ({item}) => {
            
    return(
        
        <CommonCard 
            img={{uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}`}}
            label={item?.CategoryName}
            onPress={()=>navigation.navigate('SubCategory', { category: item?._id })}
        >
        </CommonCard>
            
    )
    }

    return (
        <Box flex={1} bg='#fff' alignItems='center'>
            <FlatList 
                data={categoryList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </Box>
    )
}

export default Pets

const styles = StyleSheet.create({})