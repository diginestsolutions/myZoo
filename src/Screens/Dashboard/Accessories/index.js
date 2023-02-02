import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Text, FlatList, HStack, Icon, Pressable, Spinner, useToast} from 'native-base'
import CardTitle from '../CardTitle'
import AccessoriesCard from './AccessoriesCard'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getLatestAccessories } from '../../../Redux/actions/homeAction'
import { RESET_ERROR, SET_ACTIVE_ITEM } from '../../../Redux/constants/homeConstant'
import { isEmpty } from 'lodash'


const Accessories = ({label}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { latestAccessories, loading, error } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country : '',
        }
        //dispatch(getLatestAccessories(data))
        
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
        <AccessoriesCard 
            item={item} 
            mx={2.5}   
            productName={item.Name}  
            price={item.Price}
            city={item.City}
            country={item?.country?.[0]?.Country}
            userName={item.user?.Name}
            SellingMode={item.SellingMode}
            Isverified={item.Isverified}
            BasePrice={item.BasePrice}
            FinalPrice={item.FinalPrice}
        />
    )


    if(!latestAccessories || latestAccessories.length === 0){
        return null
    }


  return (
    <>
        <CardTitle label={label}/>

        <FlatList 
            data={latestAccessories}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    </>
  )
}

export default Accessories

const styles = StyleSheet.create({})