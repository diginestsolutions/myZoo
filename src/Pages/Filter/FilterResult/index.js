import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { Box, Text, FlatList, HStack, Pressable } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import Favourite from '../../../Components/Favourite'
import CommonBackground from '../../../Components/CommonBackground'
import { useSelector } from 'react-redux'
import PetsCard from '../../../Components/PetsCard'
import { IMAGE_URL } from '../../../config/Constants'

const FilterResult = ({navigation}) => {

    const { filterItem } = useSelector(state => state.myItems)

    const datas = [
        {   id: 1, 
            name:'German',
            type:'Pet',
            rate:'600 SR'
        },
        {   id: 2, 
            name:'Pug',
            type:'Pet',
            rate:'500 SR'
    
        }
    ]

    // const renderItems = ({item}) => {
        
    //     return(
    //         <Pressable onPress={()=>navigation.navigate('Item')}>
    //         <Box
    //             shadow={5} 
    //             borderRadius={5}           
    //             backgroundColor="#fff"
    //             m={2}
    //             p={3}
    //             flexDirection={'row'}
    //         >
    //             <ImageBackground 
    //                 source={require('../../../Images/dog1.jpg')} 
                    
    //                 style={{height:110, width:110 }}>
    //                     <Favourite iconName={'tag'}/>
    //             </ImageBackground>
    //             <Box ml={2} w='50%'>
    //                 <Text fontFamily="body" fontWeight={500} fontSize={15} color='#000'>{item.name}</Text>
    //                 <HStack>
    //                     <Text fontFamily="body" fontWeight={200} fontSize={13} color='#535353'>Type: </Text>
    //                     <Text fontFamily="body" fontWeight={200} fontSize={13} color='#005EAA'>{item.type}</Text>
    //                 </HStack>
    //                 <Text fontFamily="body" fontWeight={400} fontSize={13} color='#000'>{item.rate}</Text>
    //             </Box>
    //         </Box>
    //         </Pressable>
    //     )
    // }

    const renderItems = ({item}) => {
        return(
            <PetsCard 
                item={item} 
                mx={2.5}   
                image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
                productName={item.breed[0]?.BreedName}
                gender={item.Gender}
                price={item.Price}
                weight={item.Weight}
                weightType={item.weighttype[0]?.Type}
                age={item.Age}
                ageType={item.agetype[0]?.Type}
                rating={item.rating}
                city={item.City}
                country={item?.country?.[0]?.Country}
                vendor={item.user.Name}
                SellingMode={item.SellingMode}
                Isverified={item.Isverified}
                BasePrice={item.BasePrice}
                FinalPrice={item.FinalPrice}

            />
        )
    }


  return (
    <>
        <CommonBackground>
            <Heading label={'Filter Result'}/>
            <Box px={3}>
                <FlatList 
                    data={filterItem}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    numColumns={2}
                    ListEmptyComponent={() => <Box h={400} justifyContent="center" alignItems={"center"}><Text>No Records Found</Text></Box>}
                />
            </Box>
        </CommonBackground>
    </>
  )
}

export default FilterResult

const styles = StyleSheet.create({})
