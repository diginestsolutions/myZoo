import { StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Box, Icon, FlatList, Spinner } from 'native-base'
import Heading from '../../Components/Heading'
import { useDispatch, useSelector } from 'react-redux'
import AccessoriesCard from '../Dashboard/AccessoriesCard'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import reactotron from 'reactotron-react-native'
import LoadingContext from '../../context/loading'


const SelectedAccessory = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const context = useContext(LoadingContext)

    const [datas, setDatas] = useState([])

    const { userData } = useSelector(state => state.auth)

    const { type, breed } = route.params


    useEffect(() => {
        
        getProductList()
    }, [])

    // PRODUCT LIST
	const getProductList = () => {
		context.setLoading(true)
		let data = {
            Type: type,
            id: breed,
            countryId: userData?.Country ? userData?.Country : '5fe321d2e9ce6f4494dd8b81',
            page: 1,
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

export default SelectedAccessory

const styles = StyleSheet.create({})