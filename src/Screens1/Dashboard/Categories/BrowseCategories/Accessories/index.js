import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, FlatList, Spinner, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../../../Redux/actions/homeAction'
import CommonCard from '../CommonCard'
import { useFocusEffect } from '@react-navigation/native'
import { IMAGE_URL } from '../../../../../config/Constants'
import { HOME_INPUT, RESET_ERROR } from '../../../../../Redux/constants/homeConstant'

const Accessories = ({navigation}) => {


  const { categoryList, loading, error } = useSelector(state => state.home)

  const { latestAccessories } = useSelector(state => state.home)

  const toast = useToast()
  const dispatch = useDispatch();


  
  
  

  
  

    useFocusEffect(
        React.useCallback(() => {
            let data = {
                Type: "5fdba00742ef4b45c3a60e49"
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
        label={item?.CategoryName}
        onPress={()=>navigation.navigate('SelectedAccessory', {label: item?.CategoryName, type: item?._id})}
        // img={require('../../../../../Images/dogg.jpg')}
        img={{uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}` }}

    />
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

export default Accessories

const styles = StyleSheet.create({})