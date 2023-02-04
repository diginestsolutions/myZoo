import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Box, FlatList, HStack, Image, Pressable, Spinner, Text, useToast } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native'
import { getAllSubCategories, getProductList } from '../../../../../Redux/actions/homeAction';
import { useDispatch, useSelector } from 'react-redux'
import { HOME_INPUT, LOADING, RESET_ERROR } from '../../../../../Redux/constants/homeConstant';
import CommonCard from '../CommonCard';
import { IMAGE_URL } from '../../../../../config/Constants';
import reactotron from 'reactotron-react-native';
import customAxios from '../../../../../CustomAxios';

const Stack = createNativeStackNavigator();



const SubCategory = ({ route }) => {

	const { category } = route.params
	const toast = useToast()


	const { width, height } = useWindowDimensions()

	const navigation = useNavigation();

	const dispatch = useDispatch();

	const { subCategoryList, loading, error, latestPets } = useSelector(state => state.home)
	const { user } = useSelector(state => state.auth)



	useEffect(() => {
		let data = {
			Category: category
		}
		dispatch(getAllSubCategories(data))
	}, [])

	useEffect(() => {

		if (error) {
			toast.show({ title: 'Error', description: error })
			dispatch({
				type: RESET_ERROR
			})
		}

	}, [error])

	

	const renderItems = ({ item }) => {

		return (

			<CommonCard
				onPress={() => navigation.navigate('SelectedPet', { label: item?.Text, breed: item?.Value })}
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