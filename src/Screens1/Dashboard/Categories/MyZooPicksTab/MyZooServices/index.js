import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { useToast, FlatList, Image, Box, Spinner } from 'native-base'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AllServicesCard from './AllServicesCard'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR, SET_ACTIVE_ITEM, SET_ACTIVE_SERVICE } from '../../../../../Redux/constants/homeConstant'
import { getLatestServices, getMyZooPicksProduct, getServices } from '../../../../../Redux/actions/homeAction'


const MyZooServices = ({}) => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const toast = useToast()
    const { myZooPicksProduct, loading, error, latestServices } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)


   

    useFocusEffect(
        React.useCallback(() => {
            let data ={
                countryId: userData?.Country
            }
            dispatch(getServices(data))
        }, [])
    );

    useEffect(() => {
        
        
        
    }, [])


    useEffect(() => {
        if(error){
            // toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [error])


    const renderItems = ({item}) => (
        <AllServicesCard 
            item={item}
            mx={2.5}
        />
    )


  return (
    <Box flex={1} bg='#fff' alignItems='center'>
        <FlatList 
            data={latestServices}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    </Box>
  )
}

export default MyZooServices

const styles = StyleSheet.create({})