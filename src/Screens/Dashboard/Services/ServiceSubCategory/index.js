import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, FlatList, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import Header from '../../../../Components/Header'
import Heading from '../../../../Components/Heading'
import SubCategoryCard from './SubCategoryCard'
import CommonBackground from '../../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getLatestServices } from '../../../../Redux/actions/homeAction'
import { RESET_ERROR, SET_ACTIVE_ITEM } from '../../../../Redux/constants/homeConstant'


const ServiceSubCategory = ({route}) => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { latestServices, loading, error } = useSelector(state => state.home)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        let data = {
            countryId : user?.Country
        }
            dispatch(getLatestServices(data))
    }, [])
      
    
    useEffect(() => {
  
        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
            type: RESET_ERROR
            })
        }
      
    }, [error])

    // const makeActiveService = (item) => {
    //     dispatch({
    //         type: SET_ACTIVE_ITEM,
    //         payload: item
    //     })
    //     navigation.navigate('ServiceItem');
    // }

    const renderItems = ({item}) => (
        <SubCategoryCard 
            item={item}
            // onPress={()=>makeActiveService(item)} 
        />
    )
  return (
    <>

        <CommonBackground>
            <ScrollView>
            <Heading label={route.params.service}/>

                <Box px={3}>

                    <FlatList 
                        data={latestServices}
                        keyExtractor={(item) => item?._id}
                        renderItem={renderItems}
                    />

                </Box>

                

            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default ServiceSubCategory

const styles = StyleSheet.create({})