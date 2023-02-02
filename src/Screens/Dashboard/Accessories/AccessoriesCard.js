import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import ImageTextCard from '../../../Components/ImageTextCard'
import Favourite from '../../../Components/Favourite'
import { Box, HStack, Icon, Text, useToast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, deleteFavourite } from '../../../Redux/actions/myItemsAction'
import { getProductById } from '../../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { RESET_PRODUCT } from '../../../Redux/constants/homeConstant'
import { IMAGE_URL } from '../../../config/Constants'
import { RESET_ITEM } from '../../../Redux/constants/myItemsConstant'


const AccessoriesCard = ({item, onPress, mx, productName, price, city, userName, SellingMode, BasePrice, FinalPrice, Isverified, country }) => {

    const { width, height } = useWindowDimensions()

    const navigation = useNavigation();

    const { userData } = useSelector(state => state.auth)
    const { currentBid, compare, fav, del } = useSelector(state => state.myItems)


    const dispatch = useDispatch();
    const toast = useToast()


    const [ heart, setHeart ] = useState(false)

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

    useEffect(() => {
        if(fav){
            toast.show({ title: fav?.msg })
        }
        if(del){
            toast.show({ title: del?.msg })
        }
        dispatch({
            type: RESET_ITEM
        })
    }, [fav,del])

    const makeActiveProduct = () => {
        dispatch({
            type: RESET_PRODUCT        
        })
        let data = {
            id: item?._id,
        }
        dispatch(getProductById(data))
        navigation.navigate('ProductDetails');
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
            style={{height:100}}
        >
            <Favourite 
                ActionFavourite={heart ? RemoveAction : AddAction}
                color={heart ? "#D82929" : "#FFFFFF"}
                iconName={SellingMode==2 && 'tag' || SellingMode==1 && 'wrench'}  
                iconHeart={'md-heart'}
            />
        </ImageBackground>
        <Box paddingX={2}>
        
            <Text fontWeight={500} fontFamily="body" fontSize={13}>{productName}</Text>
            

            {SellingMode==1 ? <Text fontFamily="body" fontWeight={500} fontSize={10}>{BasePrice} - {FinalPrice}</Text> : <Text fontFamily="body" fontWeight={500} fontSize={10}>{price}</Text>}


            
            <HStack alignItems={'center'}>
                <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                <Text fontFamily="body" fontWeight={500} fontSize={12}>{city}, {country}</Text>
            </HStack>

            <HStack alignItems={'center'} my={2}>
                <Text fontFamily="body" fontWeight={500} fontSize={12} >{userName}</Text>
                {Isverified ?
                <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/> : "" }
            </HStack>
        </Box>   


    </ImageTextCard>
  )
}

export default AccessoriesCard

const styles = StyleSheet.create({})