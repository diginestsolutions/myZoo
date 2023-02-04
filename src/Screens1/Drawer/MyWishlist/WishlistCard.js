import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, useToast, Text, Icon, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Favourite from '../../../Components/Favourite'
import { addFavourite, deleteFavourite, deleteWishlist } from '../../../Redux/actions/myItemsAction'
import { RESET_PRODUCT } from '../../../Redux/constants/homeConstant'
import { getProductById } from '../../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { IMAGE_URL } from '../../../config/Constants'
import { RESET_ITEM } from '../../../Redux/constants/myItemsConstant'



const WishlistCard = ({item, onPress, SellingMode}) => {

    const { width, height } = useWindowDimensions()


    const navigation = useNavigation();

    const [ heart, setHeart ] = useState(false)
    const dispatch = useDispatch();
    const toast = useToast()

    
    const { userData } = useSelector(state => state.auth)

   
    const RemoveAction = () => {
        
        setHeart(!heart)
       
        let data = {
            productId: item?._id,
            userId: userData?.id
        }
        dispatch(deleteFavourite(data))
            
    };

    const AddAction = () => {
        
        setHeart(!heart)
       
        let data = {
            productId: item?._id,
            userId: userData?.id,
            countryId: userData?.Country
        }
        dispatch(addFavourite(data))
    
    };

    const DeleteWishlist = () => {
        
        let data = {
            productId: item?.product?._id,
            userId: userData?.id,
        }
        dispatch(deleteWishlist(data))

        dispatch({
            type: RESET_ITEM        
        })

        
    }


    const makeActiveProduct = () => {
        dispatch({
            type: RESET_PRODUCT        
        })
        let data = {
            id: item?.product?._id,
        }
        dispatch(getProductById(data))
        navigation.navigate('ProductDetails');
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

            <HStack my={1}>
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
                                
            </HStack>

            <HStack alignItems={'center'} justifyContent='space-between' w={width/1.7}>

                <HStack alignItems={'center'}>
                    <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.product.City}</Text>
                </HStack>

                <Icon as={<Ionicons/>} name='trash' size={17} color={'#B4B4B4'} onPress={DeleteWishlist}/>

            </HStack>

            

        </Box>
    </HStack>
    </Pressable>
  )
}

export default WishlistCard

const styles = StyleSheet.create({})