import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { Box, HStack, Icon, ScrollView, Text, Pressable, useToast, Spinner, Image } from 'native-base'
import Button from '../../Components/Button'
import Heading from '../../Components/Heading'
import CommonInput from '../../Components/CommonInput'
import RadioButton from './RadioButton'
import Toggle from './Toggle'
import AddImage from './AddImage'
import SelectInput from '../../Components/SelectInput'
import CommonBackground from '../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import CommonSelectCountry from '../../Components/CommonSelectCountry';
import { useTranslation } from "react-i18next";
import reactotron from '../../ReactotronConfig';
import { getStateList } from '../../Redux/actions/settingsAction';
import DatePicker from 'react-native-date-picker'
import DateAndTimeInput from '../../Components/DateAndTimeInput';
import moment from 'moment'
import NotKnown from './NotKnown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import { LOADING } from '../../Redux/constants/homeConstant';
import customAxios from '../../CustomAxios';
import axios from 'axios';
import { API_URL } from '../../config/Constants';
import SelectNew from '../../Components/SelectNew';
import SwitchInput from '../../Components/SwitchInput';


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

const PostNewItem = ({navigation, route}) => {

    const { NoOfImage, NoOfVideo, ImageSize, VideoSize, VideoTime, MyZooPick  } = route.params


    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const [categoryList, setCategoryList ] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [ageTypeList, setAgeTypeList] = useState([])
    const [weightTypeList, setWeightTypeList] = useState([])
    const [sizeTypeList, setSizeTypeList] = useState([])

    const { savePet, loading, error } = useSelector(state => state.myItems)
    const { selectedCountry, userData } = useSelector(state => state.auth)
    const { stateList } = useSelector(state => state.settings)
    const { latestPets } = useSelector(state => state.home)


    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())


    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);
    const [age, setAge] = useState(true);
    const [weight, setWeight] = useState(true);
    const [size, setSize] = useState(true);


    const [saleType, setSaleType] = useState(2)
    const [bidByType, setBidByType] = useState(1)




    const [catId, setCatId] = useState("")




    genderList = [
        {
            _id:'1',
            Name: 'Male'
        },
        {
            _id:'2',
            Name: 'Female'
        },
        
    ]

    bidBy = [
        {
            _id: 1,
            Name: 'Bid By Date'
        },
        {
            _id: 2,
            Name: 'Bid By Amount'
        },
        
    ]


    useEffect(() => {
        if(selectedCountry?._id){
            let data={
                Country: selectedCountry?._id
            }
            dispatch(getStateList(data))
        }
    }, [selectedCountry?._id])


    useEffect(() => {
        if(age && ageTypeList?.length === 0){
            getAgeTypeList()
        }
    }, [age])

    useEffect(() => {
        if(weight && weightTypeList?.length === 0){
            getWeightTypeList()
        }
    }, [weight])

    useEffect(() => {
        if(size && sizeTypeList?.length === 0){
            getSizeTypeList()
        }
    }, [size])

    const getSizeTypeList = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/pets/_loadSizeType`)  
        .then(async response => {
            setSizeTypeList(response.data)
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

    const getWeightTypeList = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/pets/_loadWeightType`)  
        .then(async response => {
            setWeightTypeList(response.data)
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


    const getAgeTypeList = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/pets/_loadAgeType`)  
        .then(async response => {

            setAgeTypeList(response.data)
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
        
        getAllCategories()
    }, [])


    const getAllCategories = async() => {
        let data = {
            Type: "5fdba02442ef4b45c3a60e4a"
        }
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customer/home/_getcategorybyId`, data)  
        .then(async response => {
            setCategoryList(response.data)
    
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
        if(catId){
            let data = {
                Category: catId
            }
            getAllSubCategories(data)
        }
    }, [catId])

    const getAllSubCategories = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`productManage/subcategory/list`, data)  
        .then(async response => {
            setSubCategoryList(response.data)
    
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

    

  
   



    const schema = yup.object({   
        CategoryName: yup.string().required('Category Required'),
        SubCategory: yup.string().required('Sub Category Required'),
        gender: yup.string().required('Gender Required'),
        Name: yup.string().required("Name Required"),
        ageTypeId: yup.string().when(['enableAge'], {
            is: (enableAge) => 
                enableAge === true,
            then: yup.string().required('Age type required')
        }),
        Age: yup.string().when(['enableAge'], {
            is: (enableAge) => 
                enableAge === true,
            then: yup.string().required('Age  required')
        }),
        weightTypeId: yup.string().when(['enableWeight'], {
            is: (enableWeight) => 
            enableWeight === true,
            then: yup.string().required('Weight type required')
        }),
        Weight: yup.string().when(['enableWeight'], {
            is: (enableWeight) => 
            enableWeight === true,
            then: yup.string().required('Weight  required')
        }),
        sizeTypeId: yup.string().when(['enableSize'], {
            is: (enableSize) => 
            enableSize === true,
            then: yup.string().required('Size type required')
        }),
        Size: yup.string().when(['enableSize'], {
            is: (enableSize) => 
            enableSize === true,
            then: yup.string().required('Size required')
        }),
        stateId: yup.string().required('State Required'),
        PostalCode: yup.number().required('Zip code is a required').positive().integer(),
        saleType: yup.number().required('Sale type required').positive().integer(),
        Price:  yup.string().when(['saleType'], {
            is: (saleType) => 
            saleType === 2,
            then: yup.string().required('Price required')
        }),
        bidByType : yup.string().when(['saleType'], {
            is: (saleType) => 
            saleType === 1,
            then: yup.string().required('Bid Type required')
        }),
        date: yup.string().when(['bidByType'], {
            is: (bidByType) => 
            bidByType === 1,
            then: yup.string().required('Date required')
        }),
        BasePrice: yup.string().when(['saleType'], {
            is: (saleType) => 
            saleType === 1,
            then: yup.string().required('Base price required')
        }),
        FinalPrice: yup.string().when(['bidByType'], {
            is: (bidByType) => 
            bidByType === 2,
            then: yup.string().required('Final price required')
        }),
        MetaDescription: yup.string().required('Description required')

    }).required();

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        resolver : yupResolver(schema),
        defaultValues: {
            saleType: 2,
            enableAge: true,
            enableSize: true,
            enableWeight: true
        }
    });

    const petSave = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`mobile/pets/_save`,data)
        .then(async response => {
            toast.show({
                title: "Success",
                description: "Pet Added successfully",
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

    const onSubmit = data => {

        dispatch({
            type: LOADING,
            payload: true
        })
        let imagesArray = [];
        let videoArray = [];
        const requests = []
        

        let datas = {
            Videos: videoArray,
            Images: imagesArray,
            ImageAlt: data.Name,
            VideoAlt: data.Name,
            Category: data?.CategoryName,
            SubCategory: data?.SubCategory,
            Breed: data?.SubCategory,
            Name: data.Name,
            Gender: data.gender,
            Age: data.Age,
            AgeMessurementId: data?.ageTypeId,
            Weight: data.Weight,
            WeightMessurementId: data?.weightTypeId,
            Size: data.Size,
            SizeMessurementId: data?.sizeTypeId,
            City: data.stateId,
            PostalCode: data.PostalCode,
            Country:  selectedCountry?._id,
            State:  data.stateId,
            color: data.color,
            SellingMode: data?.saleType,
            Description: data?.MetaDescription,
            Price: data?.Price,
            MetaDescription: data?.MetaDescription,
            Accessory: false,
            IsIndividualSellerProduct: true,
            UserId: userData?.id,
            MyZooPick: MyZooPick
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

                if(saleType == 2 ) {
                    datas.Price = data?.Price
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

                petSave(datas)
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
            if(saleType == 2 ) {
                datas.Price = data?.Price
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
            petSave(datas)
        }
    };

    //const onSubmit = data => reactotron.log(data)

    const ChoosePhotoFromLibrary = async() => {

        let options = {
            mediaType: 'mixed',
            selectionLimit: 1
        }

        const result = await launchImageLibrary(options);

        reactotron.log({result})

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
   
            <Heading label={t("PostNewItem.postNwItem")}/>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Box p={3}>
                    
                    <AddImage onPress={ChoosePhotoFromLibrary} image={image} video={video} NoOfImage={NoOfImage} NoOfVideo={NoOfVideo} />
                    <SelectNew 
                        placeholder={t("PostNewItem.selectCat")}
                        options={categoryList}
                        optlabel="CategoryName"
                        optValue={"_id"}
                        control={control}
                        fieldName="CategoryName"
                        error={errors.CategoryName}
                        changeValue={(value) => {
                            setCatId(value)
                        } }
                    />
                    <SelectNew 
                        placeholder={t("PostNewItem.selectsubCat")}
                        options={subCategoryList}
                        optlabel="Text"
                        optValue={"_id"}
                        control={control}
                        fieldName="SubCategory"
                        error={errors.SubCategory}
                    />
                    <SelectNew 
                        placeholder={t("PostNewItem.selectGen")}
                        options={genderList}
                        optlabel="Name"
                        optValue={"_id"}
                        control={control}
                        fieldName="gender"
                        error={errors.gender}
                    />
                    
                    <CommonInput  
                        control={control}
                        error={errors.Name}
                        fieldName="Name" 
                        placeholder={t("PostNewItem.Name")} mt={3}
                    />

                    <SelectNew 
                        placeholder={t("PostNewItem.color")}
                        options={colorList}
                        optlabel="name"
                        optValue={"_id"}
                        control={control}
                        fieldName="color"
                        error={errors.color}
                    />
                    <SwitchInput 
                        control={control}
                        fieldName={"enableAge"}
                        label={t("PostNewItem.age")}
                        changeValue={(value => setAge(value))}
                    />
                    {age === true ? <>
                        <SelectNew 
                            placeholder={t("PostNewItem.selectAgeType")}
                            options={ageTypeList}
                            optlabel="Text"
                            optValue={"_id"}
                            control={control}
                            fieldName="ageTypeId"
                            error={errors.ageTypeId}
                        />

                        <CommonInput  
                            control={control}
                            error={errors.Age}
                            fieldName="Age" 
                            placeholder={t("PostNewItem.age")} mt={3}
                        />
                    </> : <NotKnown /> }
                    <SwitchInput 
                        control={control}
                        fieldName={"enableWeight"}
                        label={t("PostNewItem.weight")}
                        changeValue={(value => setWeight(value))}
                    />
                    {weight === true ? <>
                        <SelectNew 
                            placeholder={t("PostNewItem.selWeightTyp")}
                            options={weightTypeList}
                            optlabel="Text"
                            optValue={"_id"}
                            control={control}
                            fieldName="weightTypeId"
                            error={errors.weightTypeId}
                        />

                        <CommonInput  
                            control={control}
                            error={errors.Weight}
                            fieldName="Weight" 
                            placeholder={t("PostNewItem.weight")}  mt={3}
                        />
                    </> : <NotKnown />}
                    <SwitchInput 
                        control={control}
                        fieldName={"enableSize"}
                        label={t("PostNewItem.size")}
                        changeValue={(value => setSize(value))}
                    />

                    {size === true  ? <>
                        <SelectNew 
                            placeholder={t("PostNewItem.selSizTyp")}
                            options={sizeTypeList}
                            optlabel="Text"
                            optValue={"_id"}
                            control={control}
                            fieldName="sizeTypeId"
                            error={errors.sizeTypeId}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.Size}
                            fieldName="Size" 
                            placeholder={t("PostNewItem.size")} mt={3}
                        />
                    </> : <NotKnown />}

                    <CommonSelectCountry
                        onPress={()=>navigation.navigate('SelectCountry')}    
                    />
                    <SelectNew 
                        placeholder={t("State")}
                        options={stateList}
                        optlabel="StateName"
                        optValue={"_id"}
                        control={control}
                        fieldName="stateId"
                        error={errors.stateId}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.PostalCode}
                        fieldName="PostalCode" 
                        placeholder={t("PostNewItem.zip")} mt={3}
                    />

                    <Box alignSelf={'center'} mt={3}>
                        <RadioButton value={saleType} onChange={nextValue => {
                            setValue("saleType", nextValue);
                            setSaleType(nextValue)
                        }}/>
                                            
                    </Box>

                    {saleType === 2   ? <> 
                    <CommonInput  
                        control={control}
                        error={errors.Price}
                        fieldName="Price" 
                        placeholder={t("PostNewItem.price")} mt={3}
                    /> 
                    </> : 
                    
                    <>
                        <SelectNew 
                            placeholder={"Select Bid Type"}
                            options={bidBy}
                            optlabel="Name"
                            optValue={"_id"}
                            control={control}
                            fieldName="bidByType"
                            error={errors.bidByType}
                            changeValue={value => setBidByType(value)}
                        />

                    {bidByType === 1 &&<DateAndTimeInput
                        openCalendar={() => setOpen(true)}
                        dateAndTime={moment(date).format("DD-MM-YYYY")}
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
                            setValue("date", date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />  
                    {errors?.date && <Text fontSize={12} color="error.500">{errors?.date?.message}</Text>}
                    

                    <CommonInput  
                        control={control}
                        error={errors.BasePrice}
                        fieldName="BasePrice" 
                        placeholder={t("PostNewItem.Bprice")} mt={3}
                    />

                    {bidByType === 2 &&<CommonInput  
                        control={control}
                        error={errors.FinalPrice}
                        fieldName="FinalPrice" 
                        placeholder={t("PostNewItem.Fprice")} mt={3}
                    />}
                    </>}

                    
                    <CommonInput  
                        control={control}
                        error={errors.MetaDescription}
                        fieldName="MetaDescription" 
                        placeholder={t("PostNewItem.abtPet")} mt={3}
                        numLines={5}
                        height={150}
                    />

                    { loading ? <Spinner/> : <Button 
                        onPress={handleSubmit(onSubmit)}
                        label={t("PostNewItem.postItem")} marginTop={6}
                    />}

                </Box>

            </KeyboardAwareScrollView>

        </CommonBackground>
    </>
  )
}

export default PostNewItem

const styles = StyleSheet.create({})