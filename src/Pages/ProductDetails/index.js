import { StyleSheet, ImageBackground, useWindowDimensions, Share } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import { Box, HStack, ScrollView, Text, Icon, Input, FlatList, useToast } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useDispatch, useSelector } from 'react-redux'
import TopButtons from './TopButtons'
import ItemDetails from './ItemDetails'
import Table from './Table'
import CustomButton from './CustomButton'
import Button from '../../Components/Button'
import Ratings from './Ratings'
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IMAGE_URL } from '../../config/Constants'
import RatingsViewer from './RatingsViewer'
import ReviewList from './ReviewList'
import { FAVOURITE_ARRAY, LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import PetsCard from '../../Components/PetsCard'
import CardTitle from '../../Components/CardTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import customAxios from '../../CustomAxios'
import { PET_ADDTOCART_SUCCESS } from '../../Redux/constants/cartConstant'
import { isObject } from 'lodash'


const ProductDetails = ({navigation, route}) => {

    const [ rating, setRating ] = useState('')
    const [ feedback, setFeedback ] = useState('')

    const [productById, setProductId] = useState(null)
    const [recentPost, setRecentPost] = useState([])

    const { id } = route.params



    const { t } = useTranslation();

    const flat = useRef(null)

    const { width, height } = useWindowDimensions()

    const dispatch = useDispatch();
    const toast = useToast()

    const { favourites } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)



    const [ heart, setHeart ] = useState(false)


    useEffect(() => {
        if(id){
            getSingleProductDetails()
        }
        
    }, [id])

    const getSingleProductDetails = () => {

        dispatch({
            type: LOADING,
            payload: true
        })

        let data = {
            id
        }

        customAxios.post(`Front_End/Mob_products/_getproductbyIds`, data)  
        .then(async response => {
            setProductId(response.data)
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


   
    
    


   

// remove fav
    const RemoveAction = async() => {

        if(userData?.id){
            setHeart(!heart)
       
            let data = {
                productId: productById?._id,
                userId: userData?.id,
            }
    
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`admin/accounts/_deletefavorite`, data)  
            .then(async response => {
        
                //reactotron.log({ favourites, data})
        
                dispatch({
                    type: FAVOURITE_ARRAY,
                    payload: favourites.filter(fav => fav !== data?.productId)
                })
    
                toast.show({
                    title: 'Success',
                    description: 'Favourites deleted successfully',
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
        else{
            navigation.navigate("SignIn")
        }
        
            
    };
    
//add fav
    const AddAction = async() => {

        if(userData?.id){
            setHeart(!heart)
       
            let data = {
                productId: productById?._id,
                userId: userData?.id,
                countryId: userData?.Country
            }
    
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`Front_End/Mob_products/_savefavorite`, data)  
            .then(async response => {
                toast.show({
                    title: 'Success',
                    description: 'Added to Favourites successfully',
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
        else{
            navigation.navigate("SignIn")
        }
        
    
    };


// Add to Compare
    const HandleCompare = async() => {
        if(userData?.id){
            let data = {
                productId: productById?._id,
                userId: userData?.id,
                countryId: userData?.Country
            }
    
            await customAxios.post(`Front_End/Mob_products/_savecomparelist`, data)  
            .then(async response => {
                toast.show({
                    title: 'Success',
                    description: 'Added to comparelist',
                    background: 'success.400'
                })
                
            })
            .catch(async error => {
                toast.show({
                    title: 'Error',
                    description: error,
                    background: 'error.400'
                })
    
            
            });
        }
        else{
            navigation.navigate("SignIn")
        }

     
    }

// add to cart PET
    const PetAddToCart = async() => {
        if(userData?.id){
            let datas={
                UserId: userData?.id,
                setpets: productById
            }
    
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`Front_End/CartMob/_addtocart`, datas)  
            .then(async response => {
                dispatch({
                    type: PET_ADDTOCART_SUCCESS
                })
                toast.show({
                    title: 'Success',
                    description: 'Added to cart successfully',
                    background: 'success.400'
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
                    background: 'error.400'
                })
        
                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
        }
        else{
            navigation.navigate("SignIn")
        }

      
    };

// add to cart accessories

    const AccessoriesAddToCart = async() => {
        if(userData?.id){
            let datas={
                UserId: userData?.id,
                setpets:productById
            }
    
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`Front_End/CartMob/_addtocart`, datas)  
            .then(async response => {
                dispatch({
                    type: PET_ADDTOCART_SUCCESS
                })
                toast.show({
                    title: 'Success',
                    description: 'Added to cart successfully',
                    background: 'success.400'
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
                    background: 'error.400'
                })
        
                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
        }
        else{
            navigation.navigate("SignIn")
        }

        
    };


    //recent posts
    useEffect(() => {
        if(productById?.type?.[0]?.Type){
            let data = {
                Type: productById?.type?.[0]?.Type==="Pets" ? 1 : 2,
                countryId : userData?.Country
            }
            getRecentPost(data)
        }
    }, [productById?.type?.[0]?.Type])


    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   
        />
    )


    const getRecentPost = async( data ) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        let url = "";
    
        if(data?.Type === 1){
            url = "customer/home/latestpets"
        }
        else if(data?.Type === 2){
            url="customer/home/latestaccessories"
        }
        else if(data?.Type === 3){
            url="customer/home/latestservices"
        }
    
        await customAxios.post(url, data)  
        .then(async response => {

            setRecentPost(response.data)
    
            dispatch({
                type: LOADING,
                payload: false
            })
    
        })
        .catch(async error => {
    
            setRecentPost([])
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    


    

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const schema = yup.object({   
        feedback: yup.string().required(),
    }).required();


    const onSubmit = async data => {
        if(userData?.id){
            let datas ={
                ProductId: productById?._id,
                Comment: feedback,
                Rating : rating,
                UserId: userData.id
            }
    
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`admin/Productchat/_saveproductreview`, datas)  
            .then(async response => {
                toast.show({
                    title: 'Success',
                    description: 'Feedback submitted successfully',
                    background: 'success.400'
                })
                getSingleProductDetails()
            })
            .catch(async error => {
        
                toast.show({
                    title: 'Error',
                    description: error,
                    background: 'error.400'
                })
        
                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
        }
        else{
            navigation.navigate("SignIn")
        }
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "Simply Share Anything across all social media platforms, isn't it awesome",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
          alert(error.message);
        }
    };


    let ratings = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    }


    productById?.productrRating?.map(rat => {
        if(rat?.Rating === 5){
            ratings.five += 1
        }
        else if(rat?.Rating === 4){
            ratings.four += 1
        }
        else if(rat?.Rating === 3){
            ratings.three += 1
        }
        else if(rat?.Rating === 2){
            ratings.two += 1
        }
        else if(rat?.Rating === 1){
            ratings.one += 1
        }
    })


    const chatWithUser = async() => {
        if(userData?.id){
            let data = {
                body: {
                    id: productById?._id,
                    name: productById?.Name,
                    image: `${IMAGE_URL}${productById?.Images?.[0]?.UploadedFileName}`
                },
                isLink: true,
                loggedInUserId: userData?.id,
                to: productById?.user?.[0]?._id
            }
    
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`api/profile/chat/messages/conversations/create`, data)  
            .then(async response => {
    
                let user = {
                    UserID: productById?.user?.[0]?._id,
                    Name: productById?.user?.[0]?.Name,
                }
                navigation.navigate('ChatNav', { screen:'ChatScreen', params: { item: user }})
    
    
                dispatch({
                    type: LOADING,
                    payload: false
                })
        
            })
            .catch(async error => {
        
                
                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
        }
        else{
            navigation.navigate("SignIn")
        }
    }

    

  return ( 
    <>
                                 
       
        <KeyboardAwareScrollView  
            showsVerticalScrollIndicator={false}
        >
            <Box bg='#fff' flex={1}>

                <Box 
                    width={width} height={25} 
                    bg={{
                        linearGradient: {
                            colors: ['#005EAA', '#008BFC'],
                            start: [0, 0],
                            end: [1, 0],
                        },
                    }}
                />
                <Box width={width} height={300} borderTopRadius={20} mt={-5}>
                    <FlatList 
                        ref={flat}
                        data={productById?.Images}
                        horizontal
                        // keyExtractor={item => item.id.toString()}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem = { ({item}) => {
                        return(
                            <ImageBackground 
                                source={{ uri: `${IMAGE_URL}${item?.UploadedFileName}`}} 
                                borderTopLeftRadius={20}
                                borderTopRightRadius={20}
                                style={{height:'100%', width: width}}
                            >

                                <Icon as={<Ionicons/>} name='chevron-back-sharp' size={35} color='#fff' ml={4} mt={5} onPress={()=>navigation.goBack()}/>

                                
                            </ImageBackground>
                            )
                        }}
                    />
                </Box>

                
                { productById?.type?.[0]?.Type=='Services' ? "" : <TopButtons 
                    ActionFavourite={favourites?.includes(productById?._id) ? RemoveAction : AddAction}
                    color={favourites?.includes(productById?._id) ? "#D82929" : "#FFFFFF"}
                    ActionCompare={HandleCompare}
                    share={onShare}
                />}            

                <Box 
                    width={'95%'} bg='#fff' alignSelf='center' 
                    borderRadius={10} mt={-10} p={3} shadow={2}
                >


                    {productById?.type?.[0]?.Type==="Pets" ?   <Text fontSize={16} fontWeight={500} color='#000000'>{productById?.breed?.[0]?.BreedName}</Text> : <Text fontSize={16} fontWeight={500} color='#000000'>{productById?.Name}</Text>}

                    <HStack justifyContent={'space-between'}>
                        <HStack>
                            <Icon as={<Ionicons/>} name='ios-star' size={23} color='yellow.500' />
                            {productById?.rating ? <Text fontWeight={500} fontSize={16} ml={2} color={'#535353'}>{productById?.rating}</Text> : <Text fontWeight={500} fontSize={16} ml={2} color={'#535353'}>0.0</Text>}
                        </HStack>
                                
                        {( parseInt(productById?.SellingMode) === 1 && parseInt(productById?.BidType) === 2) ? <Text fontWeight={400} fontSize={16} color={'#1A73BA'}>{`${productById?.BasePrice}-${productById?.FinalPrice}`}</Text> : <Text fontWeight={400} fontSize={16} color={'#1A73BA'}>{productById?.Price}</Text>}
                    </HStack>

                    {productById?.SellingMode==1 &&
                    <HStack>
                        <Text fontWeight={500} fontSize={16} color={'gray.700'}>{t("ProductDetails.crntBid")} </Text>
                        <Text fontWeight={400} fontSize={16} color={'blue.600'}>{productById?.productBid[productById?.productBid?.length-1]?.Amount}</Text>
                    </HStack>}

                    <HStack>
                        {productById?.City && <Text fontWeight={400} fontSize={14} color={'#535353'}>{productById?.City}, </Text>}
                        <Text fontWeight={400} fontSize={14} color={'#535353'}>{productById?.country?.[0]?.Country}</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                    <Text fontWeight={700} fontSize={14} color={'#535353'}>{productById?.user?.Name}</Text>
                    
                    { productById?.type?.[0]?.Type=='Services' ? "" : <Box bg={'#94AA39'} borderRadius={5} alignItems={'center'} alignSelf={'flex-end'}>
                        <Text color={'#fff'} px={1}>{productById?.SellingMode==1 ? t("ProductDetails.forAuct") : t("ProductDetails.forSale")}</Text>
                    </Box>}
                    </HStack>

                    <Text fontSize={14} fontWeight={400} mt={-4} color='#535353'>{productById?.user?.[0]?.Name}</Text>

                    {productById?.type?.[0]?.Type==="Pets" ? <ItemDetails
                        age={productById?.Age}
                        ageType={productById?.agetype[0]?.Type}
                        weight={productById?.Weight}
                        weightType={productById?.weighttype[0]?.Type}
                        size={productById?.Size}
                        sizeType={productById?.sizetype[0]?.Type}
                        gender={productById?.Gender}
                    /> : ""}

                </Box> 

                { isObject(productById) && productById?._id && <Box mt={5} p={3}>
                    <Text fontWeight={700} fontSize={16} color={'#008ECC'}>{t("ProductDetails.abtPet")}</Text>
                    <Text color={'gray.500'} mt={2}>{productById?.MetaDescription}</Text>
                    <Text fontWeight={700} fontSize={16}  mt={2} color={'#008ECC'}>{t("ProductDetails.specs")}</Text>

                    <Table
                        Type={productById?.type?.[0]?.Type}
                        Category={productById?.cat?.[0]?.CategoryName}
                        Breed={productById?.breed?.[0]?.BreedName}
                        Price={productById?.Price}
                        Age={productById?.Age}
                        City={productById?.City}
                        ZipCode={productById?.PostalCode}
                        Country={productById?.country?.[0]?.Country}
                        ageType={productById?.agetype?.[0]?.Type}
                        Gender={productById?.Gender}
                        Colors={productById?.Color}
                        Size={productById?.Size}
                        sizeType={productById?.sizetype?.[0]?.Type}
                    />

                    { productById?.type?.[0]?.Type=='Services' ? "" : <Box>
                    
                        {productById?.SellingMode==1 ?
                        <>
                            {productById?.productBid?.length > 0 && <HStack alignSelf={'center'}>
                                <Text fontWeight={500} fontSize={16} color={'gray.700'}>{t("ProductDetails.crntBid")} </Text>
                                <Text fontWeight={500} fontSize={16} color={'blue.600'}>{productById?.productBid[productById?.productBid?.length-1]?.Amount}</Text>
                            </HStack>}

                            {productById?.user?.[0]?.UserType=='1' || productById?.user?.[0]?.UserType=='2'?
                            <HStack  alignItems={'center'} justifyContent='space-between'>
                                <Button 
                                    onPress={()=>navigation.navigate('BidForItem', { productId: productById?._id })}                        
                                    label={t("ProductDetails.bidNow")}  
                                    icon={<SimpleLineIcons name ='wrench'/> }
                                    width={'47%'} 
                                />
                                <Button 
                                    onPress={()=>navigation.navigate('Checkout')}                        
                                    label={t("ProductDetails.buyfor")}  
                                    price={productById?.FinalPrice}
                                    icon={<FontAwesome name ='shopping-cart'/> }
                                    width={'47%'} 
                                /> 
                            </HStack> :
                            <>
                                <CustomButton 
                                    onPress={()=>chatWithUser()}
                                    label={t("ProductDetails.chatWthSeller")} 
                                    icon={<Ionicons name ='chatbubble-ellipses'/> } 
                                /> 
                                <Button 
                                    onPress={()=>navigation.navigate('BidForItem', { productId: productById?._id })}                        
                                    label={t("ProductDetails.bidNow")}  
                                    icon={<SimpleLineIcons name ='wrench'/> }
                                    marginTop={2}
                                /> 
                            </>
                            }
                        </> :
                        <HStack justifyContent={'space-between'} marginTop={3}>    
                            
                            {productById?.user?.[0]?.UserType=='4' ? 
                            <>
                                
                                <CustomButton 
                                    onPress={chatWithUser}
                                    width={'47%'} 
                                    label={t("ProductDetails.chatwithsell")}  icon={<Ionicons name ='ios-chatbubble-ellipses'/> } 
                                />
                                <Button
                                    // onPress={productById?.type?.[0]?.Type==="Accessories" ? AccessoriesAddToCart : PetAddToCart}                         
                                    width={'47%'} 
                                    label={t("ProductDetails.callwithsell")} 
                                    icon={<Ionicons name ='logo-whatsapp'/> }
                                />
                            </> : 
                            <>          
                            <Button
                                onPress={productById?.type?.[0]?.Type==="Accessories" ? AccessoriesAddToCart : PetAddToCart}                         
                                width={'47%'} 
                                label={t("ProductDetails.addCart")} 
                                icon={<FontAwesome name ='shopping-cart'/> }
                            />
                            <CustomButton 
                                onPress={()=>navigation.navigate('Checkout', { productId: productById?._id })}
                                width={'47%'} 
                                label={t("ProductDetails.buyNow")}  icon={<FontAwesome name ='dollar'/> } 
                            />
                            </>}    
                        </HStack> }
                    </Box>}                

                    {productById?.type?.[0]?.Type=='Services'? "" :<>
                    <CardTitle label={productById?.type?.[0]?.Type=='Pets' ? t("ProductDetails.recentpetPost") : t("ProductDetails.recentPost")}/>

                    <FlatList 
                        data={recentPost}
                        // keyExtractor={(item) => item?.id}
                        renderItem={renderItems}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    </>}
                    <HStack justifyContent={'space-between'} px={10}>
                        <Box alignItems={'center'} justifyContent="center">
                            <Text fontSize={50} color={'gray.600'}>{productById?.rating}</Text>
                            <Ratings imageSize={16} defaultRating={parseFloat(productById?.rating)} readonly={true} />
                            <Text fontSize={16} color={'gray.500'}>{productById?.productrRating?.length} ratings</Text>
                        </Box>
                        <Box width={width/2-40}>
                            <RatingsViewer ratings={ratings} />
                        </Box>
                    </HStack>

                    <Box alignSelf={'flex-start'} mt={4} mb={3}>
                        <Text fontWeight={300} fontSize={16} color={'#008ECC'} >{t("ProductDetails.revRateItem")}</Text>
                        <Ratings onFinishRating={setRating} defaultRating={0}  imageSize={25}/>
                    </Box>

                    
                    
                    <Input 
                        value={feedback}
                        placeholder="Write your review here"
                        onChangeText={(value) => setFeedback(value)}
                        numberOfLines={5}
                        height={100}
                    />

                    <Button 
                        onPress={onSubmit}
                        label={t("ProductDetails.subFed")} marginTop={4}
                    />
                    <ReviewList productId={productById?._id} />
                </Box>}

            </Box>
        
            
        </KeyboardAwareScrollView>
    </>
   
  )
}

export default ProductDetails

const styles = StyleSheet.create({})