import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, FlatList, HStack, Image, Pressable, Spinner, Text, useToast } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from '../../Redux/constants/homeConstant';
import CommonCard from '../../Components/CommonCard';
import { IMAGE_URL } from '../../config/Constants';
import customAxios from '../../CustomAxios';

const Stack = createNativeStackNavigator();



const SubCategory = ({ route }) => {

	const { category } = route.params
	const toast = useToast()

    const [subCategoryList, setSubCategoryList] = useState([])


	const { width, height } = useWindowDimensions()

	const navigation = useNavigation();

	const dispatch = useDispatch();

	const { user } = useSelector(state => state.auth)



	useEffect(() => {
		let data = {
			Category: category
		}
		getAllSubCategories(data)
	}, [])


    const getAllSubCategories = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`productManage/subcategory/list`, data)  
        .then(async response => {
            setSubCategoryList(response.data)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

	

	

	const renderItems = ({ item }) => {

		return (

			<CommonCard
				onPress={() => navigation.navigate('petsDetails', { label: item?.Text, breed: item?.Value })}
				label={item.Text}
				img={{ uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}` }}
			/>

		)
	}

	return (
		// <Box flex={1} bg='#fff' alignItems='center'>
			<FlatList
				data={subCategoryList}
				keyExtractor={(item) => item._id}
				renderItem={renderItems}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}
			/>
		// </Box>
	)
}

export default SubCategory

const styles = StyleSheet.create({})