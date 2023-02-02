import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, useToast, Text, Icon, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Favourite from '../../Components/Favourite'
import { addFavourite, deleteFavourite, deleteWishlist } from '../../Redux/actions/myItemsAction'
import { useNavigation } from '@react-navigation/native'
import { IMAGE_URL } from '../../config/Constants'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'



const WishlistCard = ({item, onPress, SellingMode, deleteWishList}) => {

    const { width, height } = useWindowDimensions()
    const { favourites } = useSelector(state => state.home)



    const navigation = useNavigation();

    const [ heart, setHeart ] = useState(false)
    const dispatch = useDispatch();
    const toast = useToast()

    
    const { userData } = useSelector(state => state.auth)

   
    const RemoveAction = () => {
        
        setHeart(!heart)
       
        let data = {
            productId: item?.product?._id,
            userId: userData?.id
        }
        deleteFavourite(data)
            
    };

    const AddAction = () => {
        
        setHeart(!heart)
       
        let data = {
            productId: item?.product?._id,
            userId: userData?.id,
            countryId: userData?.Country
        }
        addFavourite(data)
    
    };

    const addFavourite = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/Mob_products/_savefavorite`, data)  
        .then(async response => {

            toast.show({
                title: 'Success',
                description: 'Added to favourites successfully',
                backgroundColor: 'success.400'
            })
    
            dispatch({
                type: FAVOURITE_ARRAY,
                payload: [...favourites, data?.productId]
            })
            dispatch({
                type: LOADING,
                payload: false
            })
            
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
    
           
        });
    }

    const deleteFavourite = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/accounts/_deletefavorite`, data)  
        .then(async response => {
    
            dispatch({
                type: FAVOURITE_ARRAY,
                payload: favourites.filter(fav => fav !== data?.productId)
            })
    
            toast.show({
                title: 'Success',
                description: 'deleted from favourites successfully',
                backgroundColor: 'success.400'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
           
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
    
        });
    }

    


    const makeActiveProduct = () => {
        // dispatch({
        //     type: RESET_PRODUCT        
        // })
        // let data = {
        //     id: item?.product?._id,
        // }
        // dispatch(getProductById(data))
        //navigation.navigate('ProductDetails');
        navigation.navigate('ProductDetails', { id: item?.product?._id });
    }

  return (
    <Pressable onPress={makeActiveProduct}>
    <HStack m={3} borderBottomWidth={0.5} pb={2} borderColor={'#B4B4B4'}>
        <ImageBackground 
            source={{ uri: `${IMAGE_URL}${item?.product?.Images?.[0]?.UploadedFileName}`}} 
            
            style={{height:110, width:110}}>
                <Favourite 
                    ActionFavourite={heart ? RemoveAction : AddAction}
                    color={heart ? "#D82929" : "#FFFFFF"}
                    iconName={SellingMode==2 ? 'tag' : 'wrench'} 
                    iconHeart={'md-heart'}/>
        </ImageBackground>
        <Box ml={2} w='50%' justifyContent='space-evenly'>
            <HStack>
                <Text fontFamily="body" fontWeight={500} fontSize={13}>{item.product.Name}</Text>
                <Icon as={<Ionicons/>} name='male' size={17} color='#009794' ml={1}/>
            </HStack>
            
            <Text fontFamily="body" fontWeight={500} fontSize={10}>{item.product.Price}</Text>

            {item?.product?.Type === "5fdba02442ef4b45c3a60e4a" && <HStack my={1}>
                <Box  flex={0.3}>
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.product.Weight} {item.weighttype[0]?.Type}</Text>
                </Box>
                
                <Box 
                    flex={0.4}
                    borderColor={'#00000029'} 
                    height={5} alignItems='center' 
                    borderLeftWidth={1} borderRightWidth={1}

                >
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.product.Age} {item.agetype[0]?.Type}</Text>
                </Box>

                <HStack alignItems='center' justifyContent='flex-end' flex={0.2}>
                    <Icon as={<Ionicons/>} name='ios-star' size={13} color='#F0CB4F'/>
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.rating ? item.rating : "0.0"}</Text>
                </HStack>
                                
            </HStack>}

            <HStack alignItems={'center'} justifyContent='space-between' w={width/1.7}>

                <HStack alignItems={'center'}>
                    <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.product.City}</Text>
                </HStack>

                <Icon as={<Ionicons/>} name='trash' size={17} color={'#B4B4B4'} onPress={() => deleteWishList(item?.product?._id)}/>

            </HStack>

            

        </Box>
    </HStack>
    </Pressable>
  )
}

export default WishlistCard

const styles = StyleSheet.create({})