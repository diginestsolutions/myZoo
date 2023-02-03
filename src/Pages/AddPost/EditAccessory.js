import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, HStack, Icon, ScrollView, Text, Pressable, useToast, Spinner } from 'native-base'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import Heading from '../../Components/Heading'
import CommonInput from '../../Components/CommonInput'
import RadioButton from './RadioButton'
import Toggle from './Toggle'
import AddImage from './AddImage'
import SelectInput from '../../Components/SelectInput'
import CommonBackground from '../../Components/CommonBackground'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { accessoriesSave } from '../../Redux/actions/myItemsAction'
import CommonSelectCountry from '../../Components/CommonSelectCountry'
import { useTranslation } from "react-i18next";
import { getAllCategories } from '../../Redux/actions/homeAction'
import { getStateList } from '../../Redux/actions/settingsAction'
import reactotron from '../../ReactotronConfig'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import DateAndTimeInput from '../../Components/DateAndTimeInput'
import customAxios from '../../CustomAxios'
import {launchImageLibrary} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { API_URL } from '../../config/Constants'
import { countriesList } from '../../Redux/actions/authAction'
import { AUTH_INPUT } from '../../Redux/constants/authConstant'



let colorList = [
    { _id: 'Black', name: 'Black' },
    { _id: 'White', name: 'White' },
    { _id: 'Brown', name: 'Brown' },
    { _id: 'Red', name: 'Red' },
    { _id: 'Orange', name: 'Orange' },
    { _id: 'Yellow', name: 'Yellow' },
    { _id: 'Green', name: 'Green' },
    { _id: 'Golden', name: 'Golden' },
    { _id: 'Gray', name: 'Gray' },
    { _id: 'Tan', name: 'Tan' },
]


const EditAccessory = ({navigation, route}) => {

    const { t } = useTranslation();

    const [NoOfImage, setNoOfImage] = useState(0)
    const [NoOfVideo, setNoOfVideo] = useState(0)
    const [ImageSize, setImageSize] = useState(0)
    const [VideoSize, setVideoSize] = useState(0)
    const [VideoTime, setVideoTime] = useState(0)
    const [MyZooPick, setMyZooPick] = useState(false)

    const { item  } = route.params

    reactotron.log({ item })

    const dispatch = useDispatch();
    const toast = useToast()  

    const [categoryList, setCategoryList] = useState([])

    const { saveAccessories, loading, error } = useSelector(state => state.myItems)
    const { selectedCountry, userData, countryList } = useSelector(state => state.auth)
    const { latestAccessories } = useSelector(state => state.home)
    const [stateList, setStateList] = useState([])
    
    const [video, setVideo] = useState([]);


    const [saleType, setSaleType] = useState(2)
    const [color, setColor] = useState(null);
    const [image, setImage] = useState('');
    const [accTypeId, setAccTypeID] = useState('');
    const [stateId, setStateId] = useState("")


    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    const [bidByType, setBidByType] = useState("")


    bidBy = [
        {
            _id:'1',
            Name: 'Bid By Date'
        },
        {
            _id:'2',
            Name: 'Bid By Amount'
        },
        
    ]


    

    


    
  
  


    const schema = yup.object({   

        Name: yup.string().required(),
        color: yup.string().required(),
        Quantity: yup.number().required().positive().integer(),
        PostalCode: yup.number().required().positive().integer('Zip code is a required field'),
       // MetaTitle: yup.string().required('Title is a required field'),
        Description: yup.string().required('About accessory is a required field'),
        City: yup.string().required(),


    }).required();

    const { control, handleSubmit, formState: { errors }, setValue: setValues } = useForm({
        resolver : yupResolver(schema),
        defaultValues: {
            Name: item?.Name,
            City: item?.City,
            PostalCode: `${item?.PostalCode}`
            
        }
    });

    useEffect(() => {

        getAllCategories()
        dispatch(countriesList())
        getAccessoryLimit()

    }, [])

    const getAccessoryLimit = async() => {
        let data = {
            "UserId": userData.id
        }
        await customAxios.post(`user/membership/_planaccsdetails`, data)  
        .then(async response => {

            let details = response?.data?.data;

            if(details?.membership_status === true){
                setNoOfImage(parseInt(details?.NoOfImage)-item?.Images?.length);
                setNoOfVideo(parseInt(details?.NoOfVideo)-item?.Videos?.length);
                setImageSize(parseFloat(details?.ImageSize)*1000000);
                setVideoSize(parseFloat(details?.VideoSize)*1000000);
                setVideoTime(parseFloat(details?.VideoTime));
                setMyZooPick(details?.Eligibleformyzoo ? true : false );
                
            }
            
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
    
           
        });
    }

    useEffect(() => {
        if(countryList){
            let selectedCountry = countryList?.find(country => country?._id === item?.Country)
            if(selectedCountry){
                dispatch({
                    type: AUTH_INPUT,
                    payload: {
                        prop: 'selectedCountry',
                        value: selectedCountry
                    }
                })
            }
        }
    }, [countryList])

    

    const getAllCategories = async() => {
        let data = {
            Type: "5fdba00742ef4b45c3a60e49"
        }
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customer/home/_getcategorybyId`, data)  
        .then(async response => {
            setCategoryList(response.data)
            setAccTypeID(item?.Category)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: "Error",
                description: error,
                backgroundColor: "error.500"
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    useEffect(() => {
        if(selectedCountry?._id){
            getStateList()
        }
    }, [selectedCountry?._id])

    const getStateList = async() => {
        let data={
            Country: selectedCountry?._id
        }
        await customAxios.post(`admin/states/listStateWithCountryId`,data)  
        .then(async response => {
            let states = response?.data?.find(state => state?._id === item?.City)
            setStateList(response.data)
            if(states){
                setStateId(states?._id)
                setValue("stateId", states?._id)
            }
            dispatch({
                type: LOADING,
                payload: false
            })
           
        })
        .catch(async error => {
    
            dispatch({
                type: STATE_LIST_FAIL,
                payload: error
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }


    useEffect(() => {
        if(item){
            setValues("Name", item?.Name)
            setSaleType(item?.SellingMode)
            setBidByType(item?.BidType)
            //setDate(new Date(item?.EndDate))
            setValues("BasePrice", item?.BasePrice?.replace("SR", ""))
            setValues("FinalPrice", item?.FinalPrice?.replace("SR", ""))
            setValues("Description", item?.Description)
        }
    }, [item])
    

    //reactotron.log({errors})

    const onSubmit = data => {

        dispatch({
            type: LOADING,
            payload: true
        })
        let imagesArray = [];
        let videoArray = [];
        const requests = []

        let datas = {
            _id: item?._id,
            Category: accTypeId,
            Name: data.Name,
            Stoke: data.Quantity,
            City: data.City,
            PostalCode: data.PostalCode,
            Country: selectedCountry?._id,
            State: stateId,
            color: color,
            SellingMode: saleType,
            Description: data.Description,
            UserId: userData?.id,
            IsIndividualSellerProduct: true,
            MyZooPick: MyZooPick,
            stock: data.Quantity
        }

        if(saleType === 2){
            datas.Price= data.Price
        }
        else if(saleType === 1){
            datas.BidType = bidByType
            if(bidByType === 1){
                datas.BasePrice = data?.BasePrice
                datas.EndDate = moment(date).format("YYYY-MM-DD")
            }
            else{
                datas.BasePrice =  data?.BasePrice
                datas.FinalPrice = data?.FinalPrice
            }
        }

        if(image.length > 0){
            image?.map((img) => {
                let formData = new FormData()
                formData.append("file", {
                    uri: img.uri,
                    type: img.type,
                    name: img.fileName
                }) 

                let request =  axios.post(`${API_URL}admin/uploadpet`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                requests.push(request)
            })
        }

        if(video.length > 0){
            video?.map((img) => {
                let formData = new FormData()
                formData.append("file", {
                    uri: img.uri,
                    type: img.type,
                    name: img.fileName
                }) 

                let request =  axios.post(`${API_URL}admin/uploadpet`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                requests.push(request)
            })
        }

        if(image.length > 0 || video.length > 0){
            axios.all(requests).then(axios.spread((...responses) => {
            
                if(image.length > 0){
                    image.map((img, index) => {
                        imagesArray.push(responses[index].data)
                    })
                }

                if(video.length > 0){
                    video.map((img, index) => {
                        videoArray.push(responses[ image.length-1 + index].data)
                    })
                }

                datas.Videos = videoArray;
                datas.Images = imagesArray
                accessorySave(datas)
            }))
            .catch(errors => {
                // react on errors.
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
        }
        else{
            accessorySave(datas)
        }

        
    };


    const accessorySave = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`mobile/accessories/_save`,data)
        .then(async response => {
            toast.show({
                title: "Success",
                description: "Accessory Added successfully",
                backgroundColor: "success.500"
            }) 
            navigation.goBack()
            dispatch({
                type: LOADING,
                payload: false
            })   
    
        })
        .catch(async error => {
            toast.show({
                title: "Error",
                description: error,
                backgroundColor: "error.500"
            })
            dispatch({
                type: LOADING,
                payload: false
            })  
        })
    }

    const ChoosePhotoFromLibrary = async() => {

        let options = {
            mediaType: 'mixed',
            selectionLimit: 1
        }

        const result = await launchImageLibrary(options);

        //reactotron.log({result})

        if(result.assets[0]?.type.includes("image")){
            if(image.length >= NoOfImage){
                toast.show({
                    title: 'Warning',
                    description: `You are allowed to add upto ${NoOfImage}`,
                    backgroundColor: "warning.500"
                })
            }
            else if(result.assets[0]?.fileSize > ImageSize){
                toast.show({
                    title: 'Warning',
                    description: `Image size should not be exceed ${ImageSize/1000} kb. Uploaded image size ${(result.assets[0]?.fileSize/1000).toFixed(0)} kb`,
                    backgroundColor: "warning.500"
                })
            }
            else{
                setImage((prev) => [...prev, result.assets[0]] )
            }
        }
        else if(result.assets[0]?.type.includes("video")){
            if(NoOfVideo === 0){
                toast.show({
                    title: 'Warning',
                    description: `You are not allowed to Upload Video`,
                    backgroundColor: "warning.500"
                })
            }
            else if(video.length >= NoOfVideo){
                toast.show({
                    title: 'Warning',
                    description: `You are allowed to add upto ${NoOfVideo} Videos`,
                    backgroundColor: "warning.500"
                })
            }
            else if(result.assets[0]?.fileSize > VideoSize){
                toast.show({
                    title: 'Warning',
                    description: `Video size should not be exceed ${VideoSize/1000} kb. Uploaded video size ${(result.assets[0]?.fileSize/1000).toFixed(0)} kb`,
                    backgroundColor: "warning.500"
                })
            }
            else if(result.assets[0]?.duration > VideoTime){
                toast.show({
                    title: 'Warning',
                    description: `Video duration should not be exceed ${VideoTime} min. Uploaded video duration ${(result.assets[0]?.duration).toFixed(2)} min`,
                    backgroundColor: "warning.500"
                })
            }
            else{
                setVideo((prev) => [...prev, result.assets[0]] )
            }
        }

    }


  return (
    <>
        
        <CommonBackground>
   
            <Heading label={t("CreateAccessory.editAcc")}/>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                <Box p={3} mb={50}>

                <AddImage 
                    onPress={ChoosePhotoFromLibrary} 
                    image={image} 
                    video={video} 
                    NoOfImage={NoOfImage} 
                    NoOfVideo={NoOfVideo} 
                />

                    <SelectInput 
                        placeholder={t("CreateAccessory.selectAccType")}
                        selectedValue={accTypeId}
                        changeValue={(value) => {
                            setAccTypeID(value)
                        } }
                        optlabel={"CategoryName"}
                        optValue={"_id"}
                        options={categoryList}
                        
                    />

                    <CommonInput 
                        control={control}
                        error={errors.Name}
                        fieldName="Name" 
                        placeholder={t("CreateAccessory.acc")} mt={3}
                    />

                    <SelectInput 
                        placeholder={t("CreateAccessory.color")}
                        selectedValue={color}
                        changeValue={(value) => {
                            setValues("color", value)
                            setColor(value)
                        }}
                        optlabel={"name"}
                        optValue={"_id"}
                        options={colorList}
                    />

                    <CommonInput 
                        control={control}
                        error={errors.Quantity}
                        fieldName="Quantity" 
                        placeholder={t("CreateAccessory.quantity")} mt={3}
                    />
                    
                    <CommonSelectCountry
                        onPress={()=>navigation.navigate('SelectCountry')}    
                    />
                    <SelectInput 
                        placeholder={'State'} 
                        selectedValue={stateId}
                        changeValue={(value) => {
                            setStateId(value)
                        } }
                        optlabel={"StateName"}
                        optValue={"_id"}
                        options={stateList}
                    />
                    <CommonInput  
                        control={control}
                        error={errors.City}
                        fieldName="City" 
                        placeholder={t("ProductDetails.city")}  mt={3}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.PostalCode}
                        fieldName="PostalCode" 
                        placeholder={t("CreateAccessory.zip")} mt={3}
                    />

                    <Box alignSelf={'center'} mt={3}>

                    <RadioButton value={saleType} onChange={nextValue => {
                        setSaleType(nextValue);
                    }}/>
                                        
                    </Box>
                    
                    {saleType === 2 ? <> 
                    <CommonInput  
                        control={control}
                        error={errors.Price}
                        fieldName="Price" 
                        placeholder={t("PostNewItem.price")} mt={3}
                    /> 
                    </> : 
                    
                    <>

                    <SelectInput 
                        placeholder={'Select Bid Type'}
                        selectedValue={bidByType}
                        changeValue={(value) => {
                            setBidByType(value)
                        }}
                        optlabel={"Name"}
                        optValue={"_id"}
                        options={bidBy}
                    />

                    {bidByType == 1 &&<DateAndTimeInput
                        openCalendar={() => setOpen(true)}
                        dateAndTime={moment(date).format("YYYY-MM-DD")}
                        label={'Pick Up Date & Time'}
                    />}

                    <DatePicker
                        mode='date'
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />  

                    

                    <CommonInput  
                        control={control}
                        error={errors.BasePrice}
                        fieldName="BasePrice" 
                        placeholder={t("PostNewItem.Bprice")} mt={3}
                    />

                    {bidByType == 2 &&<CommonInput  
                        control={control}
                        error={errors.FinalPrice}
                        fieldName="FinalPrice" 
                        placeholder={t("PostNewItem.Fprice")} mt={3}
                    />}
                    </>}

                    {/* <CommonInput  
                        control={control}
                        error={errors.MetaTitle}
                        fieldName="MetaTitle" 
                        placeholder={t("PostNewItem.title")} mt={3}
                    /> */}

                    <CommonInput  
                        control={control}
                        error={errors.Description}
                        fieldName="Description"  
                        numLines={5}
                        height={150}
                        placeholder={t("CreateAccessory.abtAcc")} mt={3}
                    />
                        
                    { loading ? <Spinner/> : <Button 
                        onPress={handleSubmit(onSubmit)}
                        label={t("CreateAccessory.postItem")} marginTop={6}
                    />}

                </Box>
            </KeyboardAwareScrollView>

        </CommonBackground>
    </>
  )
}

export default EditAccessory

const styles = StyleSheet.create({})