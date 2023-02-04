import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, FlatList, Text } from 'native-base'
import Header from '../../../../../Components/Header'
import Heading from '../../../../../Components/Heading'
import PetsCard from '../../../PetsCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../../../../../Redux/actions/homeAction'
import { API_URL, IMAGE_URL } from '../../../../../config/Constants'
import { LOADING } from '../../../../../Redux/constants/homeConstant'
import customAxios from '../../../../../CustomAxios'
import reactotron from 'reactotron-react-native'



const SelectedPet = ({navigation, route}) => {

    //const { productList } = useSelector(state => state.home)
    const [datas, setDatas] = useState([])

    const dispatch = useDispatch();

    const { breed } = route.params
	const { user } = useSelector(state => state.auth)


    // PRODUCT LIST
	const getProductList = () => {
		dispatch({
			type: LOADING,
			payload: true
		})
		let data = {
			Type: "5fdba02442ef4b45c3a60e4a",
			Breed: breed,
			countryId: user?.Country ? user?.Country : '5fe321d2e9ce6f4494dd8b81',
		}
        
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
            image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
            mx={2.5}     
            productName={item?.breed[0]?.BreedName}   
            gender={item.Gender}
            price={item.Price}
            weight={item.Weight}
            weightType={item.weighttype[0]?.Type}
            age={item.Age}
            ageType={item.agetype[0]?.Type}
            rating={item.rating}
            city={item.City}
            vendor={item.user.Name}
            SellingMode={item.SellingMode}
            Isverified={item.Isverified}
            BasePrice={item.BasePrice}
            FinalPrice={item.FinalPrice} 
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

export default SelectedPet

const styles = StyleSheet.create({})