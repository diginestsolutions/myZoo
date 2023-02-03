import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOADING } from '../../Redux/constants/homeConstant';
import customAxios from '../../CustomAxios';
import PetsCard from '../../Components/PetsCard';
import { Box, FlatList } from 'native-base';
import Heading from '../../Components/Heading';
import reactotron from 'reactotron-react-native';
import LoadingContext from '../../context/loading';

const PetsDetails = ({navigation, route}) => {

    const [datas, setDatas] = useState([])

    const dispatch = useDispatch();

    const { breed } = route.params
	const { userData } = useSelector(state => state.auth)
    const context = useContext(LoadingContext)

    // PRODUCT LIST
	const getProductList = () => {
		context.setLoading(true)
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
			context.setLoading(false)
			setDatas(response?.data)
			
		})
		.catch(async error => {
			toast.show({
				title: 'Error',
				description: error,
				backgroundColor: 'error.500'
			})
            context.setLoading(false)
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