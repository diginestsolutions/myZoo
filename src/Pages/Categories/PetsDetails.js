import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOADING } from '../../Redux/constants/homeConstant';
import customAxios from '../../CustomAxios';
import PetsCard from '../../Components/PetsCard';
import { Box, FlatList } from 'native-base';
import Heading from '../../Components/Heading';
import reactotron from 'reactotron-react-native';

const PetsDetails = ({navigation, route}) => {

    const [datas, setDatas] = useState([])

    const dispatch = useDispatch();

    const { breed } = route.params
	const { userData } = useSelector(state => state.auth)

    // PRODUCT LIST
	const getProductList = () => {
		dispatch({
			type: LOADING,
			payload: true
		})
		let data = {
			Type: "5fdba02442ef4b45c3a60e4a",
			Breed: breed,
			countryId: userData?.Country ? userData?.Country : '5fe321d2e9ce6f4494dd8b81',
            page : 1,
            pagesize: 100
		}

        reactotron.log({data})
        
		customAxios.post(`Front_End/Mob_products/_getproductLists`, data)  
		.then(async response => {
			dispatch({
				type: LOADING,
				payload: false
			})
			setDatas(response?.data)
			
		})
		.catch(async error => {
			toast.show({
				title: 'Error',
				description: error,
				backgroundColor: 'error.500'
			})
		});
	}



    useEffect(() => {
        getProductList()
    }, [])

    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   
        />
    )


  return (
        <>
            <Box 
                width={'100%'} height={21} 
                bg={{
                    linearGradient: {
                        colors: ['#005EAA', '#008BFC'],
                        start: [0, 0],
                        end: [1, 0],
                    },
                }}
            />
            <Box bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
                <Heading label={route.params.label}/>

                <FlatList 
                    data={datas}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    alignSelf='center'
                
                />
            </Box>
        </>
  )
}

export default PetsDetails

const styles = StyleSheet.create({})