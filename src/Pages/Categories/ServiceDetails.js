import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Icon, FlatList, Spinner } from 'native-base'
import Heading from '../../Components/Heading'
import { useDispatch, useSelector } from 'react-redux'
import AccessoriesCard from '../Dashboard/AccessoriesCard'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import reactotron from 'reactotron-react-native'


const ServiceDetails = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const [datas, setDatas] = useState([])

    const { userData } = useSelector(state => state.auth)

    const { breed } = route.params


    useEffect(() => {
        
        getProductList()
    }, [])

    // PRODUCT LIST
	const getProductList = () => {
		dispatch({
			type: LOADING,
			payload: true
		})
		let data = {
            Type: "5fdba03942ef4b45c3a60e4b",
            id: breed,
            countryId: userData?.Country ? userData?.Country : '5fe321d2e9ce6f4494dd8b81',
            page: 1,
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



    const renderItems = ({ item }) => (
        <AccessoriesCard
            item={item}
            mx={2.5}
        />
    )

    return (
        <>

            <Box
                width={'100%'}
                height={21}
                bg={{
                    linearGradient: {
                        colors: ['#005EAA', '#008BFC'],
                        start: [0, 0],
                        end: [1, 0],
                    },
                }}
            />
            <Box bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
                <Heading label={route.params.label} />

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

export default ServiceDetails

const styles = StyleSheet.create({})