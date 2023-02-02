import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Text, FlatList, Spinner, useToast } from 'native-base'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AccessoriesCard from '../../../Accessories/AccessoriesCard'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR, SET_ACTIVE_ITEM } from '../../../../../Redux/constants/homeConstant'
import { getMyZooPicksProduct } from '../../../../../Redux/actions/homeAction'

const MyZooAccessories = () => {

    const { latestAccessories, myZooPicksProduct, error } = useSelector(state => state.home)

    const dispatch = useDispatch();
    const toast = useToast()


    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            let data = {
                Type: latestAccessories[0]?.Type
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
        <AccessoriesCard 
            item={item} 
            mx={3.5}   
            productName={item.Name}  
            price={item.Price}
            city={item.City}
            user={item.user.Name}
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

export default MyZooAccessories

const styles = StyleSheet.create({})