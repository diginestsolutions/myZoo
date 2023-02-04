import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Icon, FlatList, Spinner } from 'native-base'
import AccessoriesCard from '../../../Accessories/AccessoriesCard'
import Header from '../../../../../Components/Header'
import Heading from '../../../../../Components/Heading'
import { getProductList } from '../../../../../Redux/actions/homeAction'
import { useDispatch, useSelector } from 'react-redux'


const SelectedAccessory = ({navigation, route}) => {
    
    const dispatch = useDispatch();

    const { latestAccessories, loading, error, productList } = useSelector(state => state.home)
    const { user } = useSelector(state => state.auth)

    const { type } = route.params


    useEffect(() => {
        let data = {
            Type: type,
            Breed: type,
            countryId: user?.Country,
        }
        dispatch(getProductList(data))
      }, [])

    const renderItems = ({item}) => (
        <AccessoriesCard 
            item={item} 
            mx={2.5}   
            productName={item.Name}  
            price={item.Price}
            city={item.City}
            user={item.user.Name}
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
            <Heading label={route.params.label}/>

            <FlatList 
                data={latestAccessories}
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