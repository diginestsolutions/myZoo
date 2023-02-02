import { StyleSheet, ImageBackground, useWindowDimensions, Share } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import { Box, HStack, ScrollView, Text, Icon, Input, FlatList, useToast, InputGroup, TextArea, Progress } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addCompare, addFavourite, deleteFavourite, getLastBiddingAmount } from '../../../Redux/actions/myItemsAction'
import { addAccessoryToCart, addPetToCart, addProductReview } from '../../../Redux/actions/cartAction'
import TopButtons from './TopButtons'
import ItemDetails from './ItemDetails'
import Table from './Table'
import CustomButton from './CustomButton'
import Button from '../../../Components/Button'
import RecentPosts from './RecentPosts.js/index.js'
import Ratings from './Ratings'
import { useTranslation } from "react-i18next";
import CommonInput from '../../../Components/CommonInput'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IMAGE_URL } from '../../../config/Constants'
import { RESET } from '../../../Redux/constants/settingsConstant'
import { getProductById, getRecentPost } from '../../../Redux/actions/homeAction'
import PetsCard from '../PetsCard'
import CardTitle from '../CardTitle'
import reactotron from '../../../ReactotronConfig'
import TextAreaInput from '../../../Components/TextAreaInput'
import RatingsViewer from './RatingsViewer'
import ReviewList from './ReviewList'
import { sendMessage } from '../../../Redux/actions/chatAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'


const ProductDetails = ({navigation, route}) => {

    const [ rating, setRating ] = useState('')
    const [ feedback, setFeedback ] = useState('')

    const { id, productById } = route.params



    const { t } = useTranslation();

    const flat = useRef(null)

    const { width, height } = useWindowDimensions()

    const dispatch = useDispatch();
    const toast = useToast()

    const { recentPost, favourites } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)
    const { productChatSuccess } = useSelector(state => state.chat)
    const { currentBid, compare, fav, del } = useSelector(state => state.myItems)

    const { count, error, addPets, addAccessories, feedbackSuccess } = useSelector(state => state.cart)



    const [ heart, setHeart ] = useState(false)


    // useEffect(() => {
    //   if(id){
    //     let data = {
    //         id,
    //     }
    //     dispatch(getProductById(data))
    //   }
    // }, [id])


    useEffect(() => {
      if(feedbackSuccess){
        setRating('')
        setFeedback('')
        dispatch({
            type: RESET_ERROR
        })
        let data = {
            id: productById._id,
        }
        dispatch(getProductById(data))
      }
    }, [feedbackSuccess])
    
    



//CURRENT BID
    // useEffect(() => {
    //     if(productById?._id){
    //         let data ={
    //             _id : productById?._id,
    //             countryId: userData?.Country
    //         }
    //         dispatch(getLastBiddingAmount(data))
    //     }
        
    
    // }, [productById?._id])
   

// remove fav
    const RemoveAction = () => {

        setHeart(!heart)
       
        let data = {
            productId: productById?._id,
            userId: userData?.id,
        }
        dispatch(deleteFavourite(data, favourites))

        if(del){
            toast.show({ title: del?.msg })
        }
            
    };
    
//add fav
    const AddAction = () => {
        
        setHeart(!heart)
       
        let data = {
            productId: productById?._id,
            userId: userData?.id,
            countryId: userData?.Country
        }
        dispatch(addFavourite(data, favourites))

        if(fav){
            toast.show({ title: fav?.msg })
        }
    
    };


// Add to Compare
    const HandleCompare = () => {
        let data = {
            productId: productById?._id,
            userId: userData?.id,
            countryId: userData?.Country
        }
        dispatch(addCompare(data))


        if(compare){
            toast.show({ title: compare?.msg })
        }

        reactotron.log({compare})

     
    }

// add to cart PET
    const PetAddToCart = () => {
        let datas={

            UserId: userData?.id,
	
            setpets:{
                _id: productById?._id,
                Images: [{ClientFileName: productById?.Images[0]?.ClientFileName, UploadedFileName: productById?.Images[0]?.UploadedFileName}],
                Accessories: productById?.Accessories,
                Age: productById?.Age,
                BasePrice: productById?.BasePrice,
                BidUser: productById?.BidUser,
                Bidding: productById?.Bidding,
                Breed: productById?.breed[0]?._id,
                Category: productById?.Category,
                City: productById?.City,
                Color: productById?.Color,
                Country: productById?.Country,
                FinalPrice: productById?.FinalPrice,
                Gender: productById?.Gender,
                ImageAlt: productById?.ImageAlt,
                InsertBy: productById?.InsertBy,
                InsertTimestamp: productById?.InsertTimestamp,
                IsActive: productById?.IsActive,
                IsAdminProduct: true,
                Name: productById?.Name,
                PostalCode: productById?.PostalCode,
                Price: productById?.Price,
                SellerReview: productById?.SellerReview,
                SellingMode: productById?.SellingMode,
                Size: productById?.Size,
                Type: productById?.Type,
                UserProfile: productById?.UserProfile,
                UserProfiles: productById?.UserProfiles,
                UserType: productById?.user[0]?.UserType,
                VenderDetails: [{Name: "MY SHOP", AppUserId: "607ff466292391224476772b",logo: [{ClientFileName: "Pet ban 1.jpg", UploadedFileName: "vendor/logo/1618998834431-Pet ban 1.jpg"}]}],
                Weight: productById?.Weight,
                agetype: [{Type: productById?.agetype[0]?.Type}],
                breed: [{BreedName: productById?.breed[0]?.BreedName}],
                cat: [{CategoryName: productById?.cat[0]?.CategoryName}],
                country: [{Country: productById?.country[0]?.Country}],
                productBid: productById?.productBid,
                productrRating: productById?.productrRating,
                rating: productById?.rating,
                sizetype: [{Type: productById?.sizetype[0]?.Type}],
                subcat: productById?.subcat,
                type: [{Type: productById?.type[0]?.Type}],
                user: [{_id: productById?.user[0]?._id,
                        Email: productById?.user[0]?.Email,
                        Name: productById?.user[0]?.Name,
                        Phone: productById?.user[0]?.Phone,
                        UserType: productById?.user[0]?.UserType,}],
                weighttype: [{Type: productById?.weighttype[0]?.Type, Name: productById?.weighttype[0]?.Name}]
                
            }
            
        }

        dispatch(addPetToCart(datas))

        dispatch({
            type: RESET        
        })

        // if(addPets){
        //     toast.show({
        //         title: 'Item added to cart',
        //     })
        // }
      
    };

// add to cart accessories

    const AccessoriesAddToCart = () => {
        let datas={

            UserId: userData?.id,
	
            setpets:{
                _id: productById?._id,
                Category: productById?.Category,
                City: productById?.City,
                Images: [{ClientFileName: productById?.Images[0]?.ClientFileName, UploadedFileName: productById?.Images[0]?.UploadedFileName, AltText: "Lorem Ipsum "}],
                BasePrice: productById?.BasePrice,
                BidUser: productById?.BidUser,
                Bidding: productById?.Bidding,
                Country: productById?.Country,
                Description: productById?.Description,
                DescriptionMeta: productById?.MetaDescription,
                EndDate: "",
                FinalPrice: productById?.FinalPrice,
                InsertBy: productById?.InsertBy,
                InsertTimestamp: productById?.InsertTimestamp,
                IsActive: productById?.IsActive,
                IsAdminProduct: true,
                Name: productById?.Name,
                PostalCode: productById?.PostalCode,
                Price: productById?.Price,
                SellerReview: productById?.SellerReview,
                SellingMode: productById?.SellingMode,
                Type: productById?.Type,
                UserProfile: productById?.UserProfile,
                UserProfiles: productById?.UserProfiles,
                UserType: productById?.user[0]?.UserType,
                VenderDetails: productById?.VenderDetails,
                agetype: [{Type: productById?.agetype[0]?.Type}],
                breed: [{BreedName: productById?.breed[0]?.BreedName}],
                cat: [{CategoryName: productById?.cat[0]?.CategoryName}],
                country: [{Country: productById?.country[0]?.Country}],
                productBid: productById?.productBid,
                productrRating: productById?.productrRating,
                rating: productById?.rating,
                sizetype: [{Type: productById?.sizetype[0]?.Type}],
                subcat: productById?.subcat,
                type: [{Type: productById?.type[0]?.Type}],
                user: [{_id: productById?.user[0]?._id,
                Email: productById?.user[0]?.Email,
                Name: productById?.user[0]?.Name,
                Phone: productById?.user[0]?.Phone,
                UserType: productById?.user[0]?.UserType}],
                weighttype: productById?.weighttype
                
            }
            
        }

        dispatch(addAccessoryToCart(datas))

        dispatch({
            type: RESET        
        })

        // if(addAccessories){
        //     toast.show({
        //         title: 'Item added to cart',
        //     })
        // }
    };

    useEffect(() => {
        if(addAccessories){
            toast.show({
                title: 'Item added to cart',
            })
        }
        if(addPets){
            toast.show({
                title: 'Item added to cart',
            })
        }
        dispatch({
            type: RESET        
        })
    }, [addAccessories, addPets])


    const type = productById?.type?.[0]?.Type==="Pets" ? 1 : 2


//recent posts
    useEffect(() => {
        if(type){
            let data = {
                Type: type,
                countryId : userData?.Country
            }
            dispatch(getRecentPost(data))
        }
    }, [type])


    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   
            image={`${IMAGE_URL}${item?.Images[0]?.UploadedFileName}`}
            productName={item?.Name}
            gender={item?.Gender}
            price={item.Price}
            weight={item.Weight}
            weightType={item?.weighttype?.[0]?.Type}
            age={item.Age}
            ageType={item.agetype?.[0]?.Type ? item.agetype?.[0]?.Type : `${item?.Age} days`}
            rating={item.rating}
            city={item.City}
            vendor={item.user.Name}
            SellingMode={item.SellingMode}
            Isverified={item.Isverified}
            BasePrice={item.BasePrice}
            FinalPrice={item.FinalPrice}
            bidType={item?.BidType}
        />
    )

    


    

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const schema = yup.object({   
        feedback: yup.string().required(),
    }).required();


    const onSubmit = data => {
        reactotron.log({data})
        let datas ={
            ProductId: productById?._id,
            Comment: feedback,
            Rating : rating,
            UserId: userData.id
        }

        dispatch(addProductReview(datas))

        // dispatch(loginUser(datas))
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


    const chatWithUser = () => {
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
        dispatch(sendMessage(data))

        
    }


    useEffect(() => {
        if(productChatSuccess){
            dispatch({
                type: RESET_ERROR
            })
            let user = {
                UserID: productById?.user?.[0]?._id,
                Name: productById?.user?.[0]?.Name,
            }
            navigation.navigate('ChatNav', { screen:'ChatScreen', params: { item: user }})
        }
    }, [productChatSuccess])
    

  return ( 
    <>
                                 
       
        <ScrollView  
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
                    ActionFavourite={favourites.includes(productById?._id) ? RemoveAction : AddAction}
                    color={favourites.includes(productById?._id) ? "#D82929" : "#FFFFFF"}
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

                    {/* <Text fontWeight={400} fontSize={14} color={'#535353'}>{productById?.user?.[0]?.Name}</Text> */}
                    
                    { productById?.type?.[0]?.Type=='Services' ? "" : <Box bg={'#94AA39'} borderRadius={5} alignItems={'center'} alignSelf={'flex-end'}>
                        <Text color={'#fff'} px={1}>{productById?.SellingMode==1 ? t("ProductDetails.forAuct") : t("ProductDetails.forSale")}</Text>
                    </Box>}

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

                <Box mt={5} p={3}>
                    <Text fontWeight={700} fontSize={16} color={'#008ECC'}>{t("ProductDetails.abtPet")}</Text>
                    <Text color={'gray.500'} mt={2}>{productById?.MetaDescription}</Text>
                    <Text fontWeight={700} fontSize={16}  mt={2} color={'#008ECC'}>{t("ProductDetails.specs")}</Text>

                    <Table
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
                            {currentBid?.[0]?.bid && <HStack alignSelf={'center'}>
                                <Text fontWeight={500} fontSize={16} color={'gray.700'}>{t("ProductDetails.crntBid")} </Text>
                                <Text fontWeight={500} fontSize={16} color={'blue.600'}>{currentBid?.[0]?.bid}</Text>
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
                                onPress={()=>navigation.navigate('Checkout')}
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
                            <Text fontSize={16} color={'gray.500'}>{productById?.rating} ratings</Text>
                        </Box>
                        <Box width={width/2-40}>
                            <RatingsViewer ratings={ratings} />
                        </Box>
                    </HStack>

                    <Box alignSelf={'flex-start'} mt={4} mb={3}>
                        <Text fontWeight={300} fontSize={16} color={'#008ECC'} >{t("ProductDetails.revRateItem")}</Text>
                        <Ratings onFinishRating={setRating} defaultRating={0}  imageSize={25}/>
                    </Box>

                    
                    

                    {/* <CommonInput 
                        control={control}
                        error={errors.feedback}
                        fieldName="feedback" 
                        placeholder={t("ProductDetails.wrYrRevHere")}
                        height={55}  
                        mt={5}
                    /> */}

                   

                    {/* <TextAreaInput 
                        placeholder={t("ProductDetails.wrYrRevHere")}
                        control={control}
                        error={errors.feedback}
                        fieldName="feedback" 
                    /> */}
                    <Input 
                        value={feedback}
                        onChangeText={(value) => setFeedback(value)}
                        numberOfLines={5}
                        height={100}
                    />

                    <Button 
                        onPress={onSubmit}
                        label={t("ProductDetails.subFed")} marginTop={4}
                    />
                    <ReviewList reviews={productById?.productrRating} />
                </Box>

            </Box>
        
            
        </ScrollView>
    </>
   
  )
}

export default ProductDetails

const styles = StyleSheet.create({})