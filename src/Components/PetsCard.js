import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import ImageTextCard from './ImageTextCard'
import { Box, HStack, Icon, Image, Text, useToast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Favourite from './Favourite'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FAVOURITE_ARRAY, LOADING } from '../Redux/constants/homeConstant'
import { RESET_ITEM } from '../Redux/constants/myItemsConstant'
import customAxios from '../CustomAxios'
import { IMAGE_URL } from '../config/Constants'


const PetsCard = ({item, mx, country }) => {

    const { width } = useWindowDimensions()

    const navigation = useNavigation();

    const { userData } = useSelector(state => state.auth)

    const { favourites } = useSelector(state => state.home)


    const dispatch = useDispatch();
    const toast = useToast()

    const [ heart, setHeart ] = useState(false)


    const RemoveAction = () => {

        if(userData.id){
            setHeart(!heart)
       
            let data = {
                productId: item?._id,
                userId: userData?.id,
            }
    
            deleteFavourite(data)
        }
        else{
            navigation.navigate("SignIn")
        }
        
            
    };


    const AddAction = () => {
        if(userData.id){
        
            setHeart(!heart)
        
            let data = {
                productId: item?._id,
                userId: userData?.id,
                countryId: userData?.Country
            }
            addFavourite(data)
        }
        else{
            navigation.navigate("SignIn")
        }
    
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


    const getSingleProductDetails = () => {
        navigation.navigate('ProductDetails', { id: item?._id });
    }


    const renderUserName = () => {
        if(item?.user?.UserType === 4){
            return <Text numberOfLines={1} fontSize={12}>{item?.UserProfile?.length > 0 ? `${item?.UserProfile?.[0]?.FirstName} ${item?.UserProfile?.[0]?.LastName}` : item?.user?.Name}</Text>
        }
        else if(item?.user?.UserType === 2){
            return <Text numberOfLines={1} fontSize={12}>{item?.VenderDetails?.length > 0 ? `${item?.VenderDetails?.[0]?.FirstName} ${item?.VenderDetails?.[0]?.LastName}` : item?.user?.Name}</Text>
        }
    }

  return (
    <ImageTextCard 
        width={width/2-30}   
        onPress={getSingleProductDetails} 
        mx={mx}                   
    >
        <Box>
            <Image 
                source={{ uri: `${IMAGE_URL}${item?.Images[0]?.UploadedFileName}` }}
                style={{ height:120, width: width/2, resizeMode: 'stretch', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                alt="pet"
            />
            <Box position={"absolute"} top={0}>
                <Favourite
                    ActionFavourite={favourites?.includes(item._id) ? RemoveAction : AddAction}
                    iconName={item?.SellingMode===2 && 'tag' || item.SellingMode===1 && 'wrench'}  
                    iconHeart={item.SellingMode==null ? "" : 'md-heart'}
                    color={favourites?.includes(item._id) ? "#D82929" : "#FFFFFF"}
                />
            </Box>
        </Box>
        <Box paddingX={2}>
            <HStack alignItems={'center'} mt={2} justifyContent='space-between'>
                <HStack alignItems={'center'}>
                   <Text fontWeight={500} fontFamily="body" fontSize={13} color={'#000'} numberOfLines={1}>{item?.Name}</Text>
                   {item?.Gender && <Box>
                        {item?.Gender==1 && <Icon as={<Ionicons name={"male-outline"} />}  size={15} color={'green.700'}/> || item?.Gender==2 && <Icon as={<Ionicons/>} name={"female"} size={15} color={'red.300'}/>}
                   </Box>}
                </HStack>
            </HStack>
            {item.SellingMode == 1 && item?.BidType == 2 ? <Text fontFamily="body" fontWeight={500} fontSize={10}>{item?.BasePrice} - {item?.FinalPrice}</Text> : <Text fontFamily="body" fontWeight={500} fontSize={10}>{item?.Price}</Text>}


            {item?.Type === "5fdba02442ef4b45c3a60e4a" && <HStack my={1}>
                <Box  flex={0.3}>
                    <Text fontFamily="body" fontWeight={500} fontSize={11} textAlign="center">{item?.Weight}{item?.weighttype?.[0]?.Type}</Text>
                </Box>
                
                <Box 
                    flex={0.6}
                    borderColor={'#00000029'} 
                    height={5} alignItems='center' 
                    borderLeftWidth={1} borderRightWidth={1}

                >
                    <Text fontFamily="body" fontWeight={500} fontSize={11}>{item?.Age}{item?.agetype?.[0]?.Type}</Text>
                </Box>

                <Box flex={0.3} alignItems='flex-end'>
                    <HStack alignItems='center'>
                        <Icon as={<Ionicons/>} name='ios-star' size={11} color='#F0CB4F' />
                        {item?.rating===null ? <Text fontFamily="body" fontWeight={500} fontSize={11} color='#535353'>0</Text> : <Text fontFamily="body" fontWeight={500} fontSize={11} color='#535353'>{item?.rating}</Text>}
                    </HStack>                
                </Box>                        
            </HStack>}
            
            
            <HStack alignItems={'center'}>
                <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                <Text fontFamily="body" fontWeight={500} fontSize={12}>{item?.City}, {item?.country?.[0]?.Country}</Text>
            </HStack>
                
          
            <HStack alignItems={'center'} >
                {renderUserName()}
                
                {item?.Isverified ?
                <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/> : "" }
            </HStack>
        </Box>
        


    </ImageTextCard>
  )
}

export default PetsCard

const styles = StyleSheet.create({})