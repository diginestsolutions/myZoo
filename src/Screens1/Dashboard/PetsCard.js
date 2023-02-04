import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import ImageTextCard from './ImageTextCard'
import { Box, HStack, Icon, Image, Text, useToast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Favourite from '../../Components/Favourite'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, deleteFavourite } from '../../Redux/actions/myItemsAction'
import { getProductById } from '../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { LOADING, RESET_PRODUCT } from '../../Redux/constants/homeConstant'
import { RESET_ITEM } from '../../Redux/constants/myItemsConstant'
import customAxios from '../../CustomAxios'


const PetsCard = ({item, onPress, mx, image, productName, price, weight, weightType, age, ageType, rating, city,  vendor, SellingMode, gender, Isverified, BasePrice, FinalPrice, country, bidType }) => {

    const { width, height } = useWindowDimensions()

    const navigation = useNavigation();

    const { userData } = useSelector(state => state.auth)

    const { currentBid, compare, fav, del } = useSelector(state => state.myItems)

    const { favourites } = useSelector(state => state.home)


    const dispatch = useDispatch();
    const toast = useToast()

    const [ heart, setHeart ] = useState(false)


    const RemoveAction = () => {

        setHeart(!heart)
       
        let data = {
            productId: item?._id,
            userId: userData?.id,
        }
        dispatch(deleteFavourite(data, favourites))

        // if(del){
        //     toast.show({ title: del?.msg })
        // }
            
    };

    useEffect(() => {
        if(fav){
            toast.show({ title: 'Success', description: 'Added to favourites' })
        }
        if(del){
            toast.show({ title: 'Success', description: 'Removed from Favourites' })
        }
        dispatch({
            type: RESET_ITEM
        })

    }, [fav,del])

    const AddAction = () => {
        
        setHeart(!heart)
       
        let data = {
            productId: item?._id,
            userId: userData?.id,
            countryId: userData?.Country
        }
        dispatch(addFavourite(data, favourites))

        // if(fav){
        //     toast.show({ title: fav?.msg })
        // }
       
    
    };

    const getSingleProductDetails = () => {

        dispatch({
            type: LOADING,
            payload: true
        })

        let data = {
            id :item?._id,
        }

        customAxios.post(`Front_End/Mob_products/_getproductbyIds`, data)  
        .then(async response => {
            navigation.navigate('ProductDetails', { id: item?._id, productById: response.data });
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {

            toast.show({
                title:'Error',
                description: error,
                backgroundColor: 'error.500'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    // const makeActiveProduct = () => {
    //     // dispatch({
    //     //     type: RESET_PRODUCT        
    //     // })
    //     // let data = {
    //     //     id: item?._id,
    //     // }
    //     dispatch({
    //         type: LOADING,
    //         payload: true
    //     })
    //     navigation.navigate('ProductDetails', { id: item?._id });
    //     //dispatch(getProductById(data))
       


    // }

  return (
    <ImageTextCard 
        width={width/2-30}   
        onPress={getSingleProductDetails} 
        mx={mx}                   
    >
        <Box>
            <Image 
                source={{ uri: image }}
                style={{ height:120, width: width/2, resizeMode: 'stretch', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                alt="pet"
            />
            <Box position={"absolute"} top={0}>
                <Favourite
                    ActionFavourite={favourites?.includes(item._id) ? RemoveAction : AddAction}
                    iconName={SellingMode==2 && 'tag' || SellingMode==1 && 'wrench'}  
                    iconHeart={SellingMode==null ? "" : 'md-heart'}
                    color={favourites.includes(item._id) ? "#D82929" : "#FFFFFF"}
                />
            </Box>
        </Box>
        {/* <ImageBackground 
            source={{ uri: image}} 
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            style={{height:100, width: 200, resizeMode: 'cover'}}>
                {}
        </ImageBackground> */}
        <Box paddingX={2}>
            <HStack alignItems={'center'} mt={2} justifyContent='space-between'>
                <HStack alignItems={'center'}>
                   <Text fontWeight={500} fontFamily="body" fontSize={13} color={'#000'}>{productName}</Text>
                   {gender && <Box>
                        {gender==1 && <Icon as={<Ionicons/>} name={"male"} size={15} color={'green.700'}/> || gender==2 && <Icon as={<Ionicons/>} name={"female"} size={15} color={'red.300'}/>}
                   </Box>}
                </HStack>
            </HStack>
            {SellingMode==1 && bidType == 2 ? <Text fontFamily="body" fontWeight={500} fontSize={10}>{BasePrice} - {FinalPrice}</Text> : <Text fontFamily="body" fontWeight={500} fontSize={10}>{price}</Text>}


            <HStack my={1}>
                <Box  flex={0.3}>
                    <Text fontFamily="body" fontWeight={500} fontSize={11} textAlign="center">{weight}{weightType}</Text>
                </Box>
                
                <Box 
                    flex={0.6}
                    borderColor={'#00000029'} 
                    height={5} alignItems='center' 
                    borderLeftWidth={1} borderRightWidth={1}

                >
                    <Text fontFamily="body" fontWeight={500} fontSize={11}>{age}{ageType}</Text>
                </Box>

                <Box flex={0.3} alignItems='flex-end'>
                    <HStack alignItems='center'>
                        <Icon as={<Ionicons/>} name='ios-star' size={11} color='#F0CB4F' />
                        {rating===null ? <Text fontFamily="body" fontWeight={500} fontSize={11} color='#535353'>0</Text> : <Text fontFamily="body" fontWeight={500} fontSize={11} color='#535353'>{rating}</Text>}
                    </HStack>                
                </Box>                        
            </HStack>
            
            
            <HStack alignItems={'center'}>
                <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                <Text fontFamily="body" fontWeight={500} fontSize={12}>{city}, {country}</Text>
            </HStack>
                
          
            <HStack alignItems={'center'} >
                <Text fontFamily="body" fontWeight={500} fontSize={12} >{vendor}</Text>
                {Isverified ?
                <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/> : "" }
            </HStack>
        </Box>
        


    </ImageTextCard>
  )
}

export default PetsCard

const styles = StyleSheet.create({})