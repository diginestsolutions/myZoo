import { ImageBackground, StyleSheet, useWindowDimensions, Share } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from '../../../Redux/constants/homeConstant'
import customAxios from '../../../CustomAxios'
import { useState } from 'react'
import { Box, Button, FlatList, HStack, Icon, ScrollView, Text, useToast } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { IMAGE_URL } from '../../../config/Constants'
import reactotron from 'reactotron-react-native'
import TopButtons from './TopButtons'
import { addCompare, addFavourite, deleteFavourite } from '../../../Redux/actions/myItemsAction'
import { useTranslation } from 'react-i18next'
import ItemDetails from '../Item/ItemDetails'
import Table from '../Item/Table'
import CustomButton from '../Item/CustomButton'
import CardTitle from '../CardTitle'
import Ratings from '../Item/Ratings'
import TextAreaInput from '../../../Components/TextAreaInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";




const ProductDetails = ({ navigation, route }) => {

    const { id, product } = route.params
    const toast = useToast()
    //const [product, setProduct] = useState([])
    const dispatch = useDispatch();
    const flat = useRef(null)

    const { width, height } = useWindowDimensions()
    const [ heart, setHeart ] = useState(false)
    const [ rating, setRating ] = useState('')


    const { t } = useTranslation();
    const { userData } = useSelector(state => state.auth)

    const schema = yup.object({   
        feedback: yup.string().required(),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });


    // remove fav
    const RemoveAction = () => {

        setHeart(!heart)
       
        let data = {
            productId: productById?._id,
            userId: userData?.id,
        }
        dispatch(deleteFavourite(data))

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
        dispatch(addFavourite(data))

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

    const AccessoriesAddToCart = () => {
        let datas={

            UserId: userData?.id,
	
            setpets:{
                _id: product?._id,
                Category: product?.Category,
                City: product?.City,
                Images: [{ClientFileName: product?.Images[0]?.ClientFileName, UploadedFileName: product?.Images[0]?.UploadedFileName, AltText: "Lorem Ipsum "}],
                BasePrice: product?.BasePrice,
                BidUser: product?.BidUser,
                Bidding: product?.Bidding,
                Country: product?.Country,
                Description: product?.Description,
                DescriptionMeta: product?.MetaDescription,
                EndDate: "",
                FinalPrice: product?.FinalPrice,
                InsertBy: product?.InsertBy,
                InsertTimestamp: product?.InsertTimestamp,
                IsActive: product?.IsActive,
                IsAdminProduct: true,
                Name: product?.Name,
                PostalCode: product?.PostalCode,
                Price: product?.Price,
                SellerReview: product?.SellerReview,
                SellingMode: product?.SellingMode,
                Type: product?.Type,
                UserProfile: product?.UserProfile,
                UserProfiles: product?.UserProfiles,
                UserType: product?.user[0]?.UserType,
                VenderDetails: product?.VenderDetails,
                agetype: [{Type: product?.agetype[0]?.Type}],
                breed: [{BreedName: product?.breed[0]?.BreedName}],
                cat: [{CategoryName: product?.cat[0]?.CategoryName}],
                country: [{Country: product?.country[0]?.Country}],
                productBid: product?.productBid,
                productrRating: product?.productrRating,
                rating: product?.rating,
                sizetype: [{Type: product?.sizetype[0]?.Type}],
                subcat: product?.subcat,
                type: [{Type: product?.type[0]?.Type}],
                user: [{_id: product?.user[0]?._id,
                Email: product?.user[0]?.Email,
                Name: product?.user[0]?.Name,
                Phone: product?.user[0]?.Phone,
                UserType: product?.user[0]?.UserType}],
                weighttype: product?.weighttype
                
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

    const PetAddToCart = () => {
        let datas={

            UserId: userData?.id,
	
            setpets:{
                _id: product?._id,
                Images: [{ClientFileName: product?.Images[0]?.ClientFileName, UploadedFileName: product?.Images[0]?.UploadedFileName}],
                Accessories: product?.Accessories,
                Age: product?.Age,
                BasePrice: product?.BasePrice,
                BidUser: product?.BidUser,
                Bidding: product?.Bidding,
                Breed: product?.breed[0]?._id,
                Category: product?.Category,
                City: product?.City,
                Color: product?.Color,
                Country: product?.Country,
                FinalPrice: product?.FinalPrice,
                Gender: product?.Gender,
                ImageAlt: product?.ImageAlt,
                InsertBy: product?.InsertBy,
                InsertTimestamp: product?.InsertTimestamp,
                IsActive: product?.IsActive,
                IsAdminProduct: true,
                Name: product?.Name,
                PostalCode: product?.PostalCode,
                Price: product?.Price,
                SellerReview: product?.SellerReview,
                SellingMode: product?.SellingMode,
                Size: product?.Size,
                Type: product?.Type,
                UserProfile: product?.UserProfile,
                UserProfiles: product?.UserProfiles,
                UserType: product?.user[0]?.UserType,
                VenderDetails: [{Name: "MY SHOP", AppUserId: "607ff466292391224476772b",logo: [{ClientFileName: "Pet ban 1.jpg", UploadedFileName: "vendor/logo/1618998834431-Pet ban 1.jpg"}]}],
                Weight: product?.Weight,
                agetype: [{Type: product?.agetype[0]?.Type}],
                breed: [{BreedName: product?.breed[0]?.BreedName}],
                cat: [{CategoryName: product?.cat[0]?.CategoryName}],
                country: [{Country: product?.country[0]?.Country}],
                productBid: product?.productBid,
                productrRating: product?.productrRating,
                rating: product?.rating,
                sizetype: [{Type: product?.sizetype[0]?.Type}],
                subcat: product?.subcat,
                type: [{Type: product?.type[0]?.Type}],
                user: [{_id: product?.user[0]?._id,
                        Email: product?.user[0]?.Email,
                        Name: product?.user[0]?.Name,
                        Phone: product?.user[0]?.Phone,
                        UserType: product?.user[0]?.UserType,}],
                weighttype: [{Type: product?.weighttype[0]?.Type, Name: product?.weighttype[0]?.Name}]
                
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

    const ProductDescription = () => (
        <Box 
            width={'95%'} bg='#fff' alignSelf='center' 
            borderRadius={10} mt={-10} p={3} shadow={2}
        >


            {product?.type?.[0]?.Type==="Pets" ?   <Text fontSize={16} fontWeight={500} color='#000000'>{product?.breed?.[0]?.BreedName}</Text> : <Text fontSize={16} fontWeight={500} color='#000000'>{product?.Name}</Text>}

            <HStack justifyContent={'space-between'}>
                <HStack>
                    <Icon as={<Ionicons/>} name='ios-star' size={23} color='yellow.500' />
                    {product?.rating ? <Text fontWeight={500} fontSize={16} ml={2} color={'#535353'}>{product?.rating}</Text> : <Text fontWeight={500} fontSize={16} ml={2} color={'#535353'}>0.0</Text>}
                </HStack>
                        
                {product?.SellingMode==1 ? <Text fontWeight={400} fontSize={16} color={'#1A73BA'}>{product?.BasePrice}-{product?.FinalPrice}</Text> : <Text fontWeight={400} fontSize={16} color={'#1A73BA'}>{product?.Price}</Text>}
            </HStack>

            {product?.SellingMode==1 &&
            <HStack>
                <Text fontWeight={500} fontSize={16} color={'gray.700'}>{t("ProductDetails.crntBid")} </Text>
                <Text fontWeight={400} fontSize={16} color={'blue.600'}>{currentBid?.[0]?.bid}</Text>
            </HStack>}

            <HStack>
                {product?.City && <Text fontWeight={400} fontSize={14} color={'#535353'}>{product?.City}, </Text>}
                <Text fontWeight={400} fontSize={14} color={'#535353'}>{product?.country?.[0]?.Country}</Text>
            </HStack>

            {/* <Text fontWeight={400} fontSize={14} color={'#535353'}>{productById?.user?.[0]?.Name}</Text> */}
            
            { product?.type?.[0]?.Type=='Services' ? "" : <Box bg={'#94AA39'} borderRadius={5} alignItems={'center'} alignSelf={'flex-end'}>
                <Text color={'#fff'} px={1}>{product?.SellingMode==1 ? t("ProductDetails.forAuct") : t("ProductDetails.forSale")}</Text>
            </Box>}

            <Text fontSize={14} fontWeight={400} mt={-4} color='#535353'>{product?.user?.[0]?.Name}</Text>

            {product?.type?.[0]?.Type==="Pets" ? <ItemDetails
                age={product?.Age}
                ageType={product?.agetype[0]?.Type}
                weight={product?.Weight}
                weightType={product?.weighttype[0]?.Type}
                size={product?.Size}
                sizeType={product?.sizetype[0]?.Type}
                gender={product?.Gender}
            /> : ""}

        </Box>
    )

    const onSubmit = data => {

        let datas ={
            feedback: data.feedback,
            rating : rating
        }

        // dispatch(loginUser(datas))
    };


    const ProductSpecification = () => (
        <Box mt={5} p={3}>
            <Text fontWeight={700} fontSize={16} color={'#008ECC'}>{t("ProductDetails.abtPet")}</Text>
            <Text color={'gray.500'} mt={2}>{product?.MetaDescription}</Text>
            <Text fontWeight={700} fontSize={16}  mt={2} color={'#008ECC'}>{t("ProductDetails.specs")}</Text>

            <Table
                Category={product?.cat?.[0]?.CategoryName}
                Breed={product?.breed?.[0]?.BreedName}
                Price={product?.Price}
                Age={product?.Age}
                City={product?.City}
                ZipCode={product?.PostalCode}
                Country={product?.country?.[0]?.Country}
                ageType={product?.agetype?.[0]?.Type}
                Gender={product?.Gender}
                Colors={product?.Color}
                Size={product?.Size}
                sizeType={product?.sizetype?.[0]?.Type}
            />

            { product?.type?.[0]?.Type=='Services' ? "" : <Box>
            
                {product?.SellingMode==1 ?
                <>
                    {product?.productBid?.[0]?.bid && <HStack alignSelf={'center'}>
                        <Text fontWeight={500} fontSize={16} color={'gray.700'}>{t("ProductDetails.crntBid")} </Text>
                        <Text fontWeight={500} fontSize={16} color={'blue.600'}>{product?.productBid?.[0]?.bid}</Text>
                    </HStack>}

                    {product?.user?.[0]?.UserType=='1' || product?.user?.[0]?.UserType=='2'?
                    <HStack  alignItems={'center'} justifyContent='space-between'>
                        <Button 
                            onPress={()=>navigation.navigate('BidForItem', { productId: product?._id })}                        
                            label={t("ProductDetails.bidNow")}  
                            icon={<SimpleLineIcons name ='wrench'/> }
                            width={'47%'} 
                        />
                        <Button 
                            onPress={()=>navigation.navigate('Checkout')}                        
                            label={t("ProductDetails.buyfor")}  
                            price={product?.FinalPrice}
                            icon={<FontAwesome name ='shopping-cart'/> }
                            width={'47%'} 
                        /> 
                    </HStack> :
                    <>
                        <CustomButton 
                            onPress={()=>navigation.navigate('ChatNav', {screen:'ChatScreen'})}
                            label={t("ProductDetails.chatWthSeller")} 
                            icon={<Ionicons name ='chatbubble-ellipses'/> } 
                        /> 
                        <Button 
                            onPress={()=>navigation.navigate('BidForItem', { productId: product?._id })}                        
                            label={t("ProductDetails.bidNow")}  
                            icon={<SimpleLineIcons name ='wrench'/> }
                            marginTop={2}
                        /> 
                    </>
                    }
                </> :
                <HStack justifyContent={'space-between'} marginTop={3}>    
                    
                    {product?.user?.[0]?.UserType=='4' ? 
                    <>
                        
                        <CustomButton 
                            onPress={()=>navigation.navigate('ChatNav', {screen:'ChatScreen'})}
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
                        onPress={product?.type?.[0]?.Type==="Accessories" ? AccessoriesAddToCart : PetAddToCart}                         
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

            {product?.type?.[0]?.Type=='Services'? "" :<>
            <CardTitle label={product?.type?.[0]?.Type=='Pets' ? t("ProductDetails.recentpetPost") : t("ProductDetails.recentPost")}/>

            {/* <FlatList 
                data={recentPost}
                // keyExtractor={(item) => item?.id}
                renderItem={renderItems}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            /> */}
            </>}

            <HStack justifyContent={'space-between'} px={10}>
                <Box alignItems={'center'}>
                    <Text fontSize={50} color={'gray.600'}>{product?.rating}.0</Text>
                    <Ratings imageSize={16} defaultRating={product?.rating}/>
                    <Text fontSize={16} color={'gray.500'}>{product?.rating} ratings</Text>
                </Box>
                <Box alignItems={'center'} justifyContent='center'>
                    <Ratings imageSize={16} defaultRating={product?.rating}/>
                    <Text fontSize={16} color={'gray.500'}>{product?.rating} ratings</Text>
                </Box>
            </HStack>

            <Box alignSelf={'flex-start'} mt={4}>
                <Text fontWeight={300} fontSize={16} color={'#008ECC'} mb={-8}>{t("ProductDetails.revRateItem")}</Text>
                <Ratings onFinishRating={setRating} defaultRating={0}/>
            </Box>

            
            

            {/* <CommonInput 
                control={control}
                error={errors.feedback}
                fieldName="feedback" 
                placeholder={t("ProductDetails.wrYrRevHere")}
                height={55}  
                mt={5}
            /> */}

            

            <TextAreaInput 
                placeholder={t("ProductDetails.wrYrRevHere")}
                control={control}
                error={errors.feedback}
                fieldName="feedback" 
            />

            <Button 
                onPress={handleSubmit(onSubmit)}
                label={t("ProductDetails.subFed")} marginTop={4}
            />

        </Box>
    )
    


    return (
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
                        data={product?.Images}
                        horizontal
                        // keyExtractor={item => item.id.toString()}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem = { ({item}) => {
                            reactotron.log({img: `${IMAGE_URL}${item.UploadedFileName}`})
                        return(
                            <ImageBackground 
                                source={{ uri: `${IMAGE_URL}${item.UploadedFileName}`}} 
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
                { product?.type?.[0]?.Type=='Services' ? "" : <TopButtons 
                    ActionFavourite={heart ? RemoveAction : AddAction}
                    color={heart ? "#D82929" : "#FFFFFF"}
                    ActionCompare={HandleCompare}
                    share={onShare}
                />}
                <ProductDescription />
                <ProductSpecification />
            </Box>
        </ScrollView>
    )
}

export default ProductDetails

const styles = StyleSheet.create({})