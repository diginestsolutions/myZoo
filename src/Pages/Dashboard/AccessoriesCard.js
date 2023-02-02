import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import ImageTextCard from '../../Components/ImageTextCard'
import Favourite from '../../Components/Favourite'
import { Box, HStack, Icon, Text, useToast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, deleteFavourite } from '../../Redux/actions/myItemsAction'
import { getProductById } from '../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { FAVOURITE_ARRAY, LOADING, RESET_PRODUCT } from '../../Redux/constants/homeConstant'
import { IMAGE_URL } from '../../config/Constants'
import { RESET_ITEM } from '../../Redux/constants/myItemsConstant'
import customAxios from '../../CustomAxios'
import reactotron from 'reactotron-react-native'


const AccessoriesCard = ({item, mx }) => {

    const { width, height } = useWindowDimensions()

    const navigation = useNavigation();

    const { userData } = useSelector(state => state.auth)
    const { currentBid, compare, fav, del } = useSelector(state => state.myItems)
    const { favourites } = useSelector(state => state.home)


    const dispatch = useDispatch();
    const toast = useToast()


    const [ heart, setHeart ] = useState(false)

    const RemoveAction = () => {

        if(userData?.id){
            setHeart(!heart)
       
            let data = {
                productId: item?._id,
                userId: userData?.id
            }
            deleteFavourite(data)
        }
        else{
            navigation.navigate("SignIn")
        }
        
            
    };

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

    const AddAction = () => {

        if(userData?.id){
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

   

    const makeActiveProduct = () => {

        reactotron.log({id: item?._id })
        // dispatch({
        //     type: RESET_PRODUCT        
        // })
        // let data = {
        //     id: item?._id,
        // }
        // dispatch(getProductById(data))
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
        onPress={makeActiveProduct} 
        mx={mx}                   
    >
        <ImageBackground 
            source={{ uri: `${IMAGE_URL}${item?.Images[0]?.UploadedFileName}` }} 
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            style={{height:200}}
        >
            <Favourite 
                ActionFavourite={heart ? RemoveAction : AddAction}
                color={heart ? "#D82929" : "#FFFFFF"}
                iconName={item?.SellingMode == 2 && 'tag' || item?.SellingMode ==1 && 'wrench'}  
                iconHeart={'md-heart'}
            />
        </ImageBackground>
        <Box paddingX={2}>
        
            <Text fontWeight={500} fontFamily="body" fontSize={13} numberOfLines={1}>{item?.Name}</Text>
            

            {item?.SellingMode==1 ? <Text fontFamily="body" fontWeight={500} fontSize={10}>{item?.BasePrice} - {item?.FinalPrice}</Text> : <Text fontFamily="body" fontWeight={500} fontSize={10}>{item?.Price}</Text>}


            
            <HStack alignItems={'center'}>
                <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                <Text fontFamily="body" fontWeight={500} fontSize={12} numberOfLines={1}>{item?.City}, {item?.country?.[0]?.Country}</Text>
            </HStack>

            <HStack alignItems={'center'} my={2}>
                {renderUserName()}
                {item?.user?.Isverified ?
                <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/> : "" }
            </HStack>
        </Box>   


    </ImageTextCard>
  )
}

export default AccessoriesCard

const styles = StyleSheet.create({})