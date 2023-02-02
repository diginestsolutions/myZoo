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
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getAgeTypeList, getSizeTypeList, getWeightTypeList, petSave } from '../../Redux/actions/myItemsAction';
import CommonSelectCountry from '../../Components/CommonSelectCountry';
import { useTranslation } from "react-i18next";
import ImagePicker from 'react-native-image-crop-picker';
import reactotron from '../../ReactotronConfig';
import { getStateList } from '../../Redux/actions/settingsAction';
import { getAllCategories, getAllSubCategories } from '../../Redux/actions/homeAction';
import { useFocusEffect } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import DateAndTimeInput from '../../Components/DateAndTimeInput';
import moment from 'moment'
import NotKnown from './NotKnown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';


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

const PostNewItem = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { savePet, loading, error, ageTypeList, weightTypeList, sizeTypeList } = useSelector(state => state.myItems)
    const { selectedCountry, userData } = useSelector(state => state.auth)
    const { stateList } = useSelector(state => state.settings)
    const { categoryList, latestPets, subCategoryList } = useSelector(state => state.home)


    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())


    const [image, setImage] = useState(null);
    const [age, setAge] = useState(false);
    const [weight, setWeight] = useState(false);
    const [size, setSize] = useState(false);

    const [value, setValue] = useState(2);

    const [gender, setGender] = useState("")

    const [bidByType, setBidByType] = useState("")

    reactotron.log({bidByType})



    const [stateId, setStateId] = useState("")
    const [catId, setCatId] = useState("")
    const [subCatId, setSubCatId] = useState("")
    const [ageTypeId, setAgeTypeId] = useState("")
    const [weightTypeId, setWeightTypeId] = useState("")
    const [sizeTypeId, setSizeTypeId] = useState("")




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
            _id:'1',
            Name: 'Bid By Date'
        },
        {
            _id:'2',
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

    // useEffect(() => {
    //     if(latestPets){

    //         let data = {
    //             Type: latestPets[0]?.Type
    //         }
    //         dispatch(getAllCategories(data))
    //     }
    // }, [latestPets])

    useFocusEffect(
        React.useCallback(() => {
            if(latestPets){

                let data = {
                    Type: latestPets[0]?.Type
                }
                dispatch(getAllCategories(data))
            }
        }, [latestPets])
    );



    useEffect(() => {
        if(catId){
            let data = {
                Category: catId
            }
            dispatch(getAllSubCategories(data))
        }
    }, [catId])

    useEffect(() => {
        dispatch(getAgeTypeList())
    }, [])
    useEffect(() => {
        dispatch(getWeightTypeList())
    }, [])
    useEffect(() => {
        dispatch(getSizeTypeList())
    }, [])

    // useEffect(() => {

    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //         type: RESET_ERROR
    //         })
    //     }
    // }, [error])

  
    useEffect(() => {
        // if(error){
        //     toast.show({
        //         title: 'Error',
        //         description : error
        //     })
        // }    
        if(savePet){
            
            toast.show({
                title: 'Item Posted',
            })
            
            // navigation.navigate('DeliveryAddress')
        }
    }, [error, savePet])



    const schema = yup.object({   
        Name: yup.string().required(),
        color: yup.string().required(),
        // Age: yup.number().required().positive().integer(),
        // Weight: yup.number().required().positive().integer(),
        // Size: yup.number().required().positive().integer(),
        PostalCode: yup.number().required('Zip code is a required field').positive().integer(),
        // Price: yup.number().required().positive().integer(),
        // BasePrice: yup.number().required().positive().integer(),
        // FinalPrice: yup.number().required().positive().integer(),
        // MetaTitle: yup.string().required('Title is a required field'),
        // MetaKeyWord: yup.string().required('Subtitle is a required field'),
        // MetaDescription: yup.string().required('About pet is a required field'),
        Description: yup.string().required(),
        City: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Weight : "",
            Size: "",
            color: "",
            Description: "",
            MetaTitle: "",
            MetaKeyWord: ""
        }
    });

    const onSubmit = data => {

        reactotron.log({data, value})

        if(value ==2 ) {

            let images = 0;
            let videos = 0;

            let formData = new FormData();

            image?.map(img => {
                if(img?.type.includes('video')){
                    formData.append(`Videos[${videos}]`, {
                        uri: img?.uri,
                        type: img?.type,
                        name: img?.fileName
                    });
                    videos +=1;
                }
                else{
                    formData.append(`Images[${images}]`, {
                        uri: img?.uri,
                        type: img?.type,
                        name: img?.fileName
                    });
                    images +=1;
                }
            })

            formData.append("ImageAlt", data.Name)
            formData.append("VideoAlt", data.Name)
            formData.append("Category", catId)
            formData.append("SubCategory", subCatId)
            formData.append("Breed", subCatId)
            formData.append("Name", data.Name)
            formData.append("Gender", gender)
            formData.append("Age", data.Age)
            formData.append("AgeMessurementId", ageTypeId)
            formData.append("Weight", data.Weight)
            formData.append("WeightMessurementId", weightTypeId)
            formData.append("Size", data.Size)
            formData.append("SizeMessurementId", sizeTypeId)
            formData.append("City", data.City)
            formData.append("PostalCode", data.PostalCode)
            formData.append("Country",selectedCountry?._id)
            formData.append("State", stateId)
            formData.append("color", data.color)
            formData.append("SellingMode", value)
            formData.append("Description", data?.MetaDescription)
            formData.append("Price", data?.Price)
            formData.append("MetaDescription", data?.MetaDescription)
            formData.append("MetaTitle", data?.MetaTitle)
            formData.append("MetaKeyWord", data?.MetaKeyWord)
            formData.append("Accessory", false)
            formData.append("IsIndividualSellerProduct", true)
            formData.append("UserId", userData?.id)
            formData.append("MyZooPick", true)
            dispatch(petSave(formData))
        }
        else if(value == 1 ) {
            if(bidByType == 1){
                let datas={

                    Videos: ["admin\/pets\/1625115235070-WIN_20210213_15_58_32_Pro.mp4"],
                    Images:[image.path],
                    SellingMode: value,
                    Name: data.Name,
                    Age: data.Age,
                    Weight: data.Weight,
                    Size: data.Size,
                    Gender: gender,
                    Category: catId,
                    SubCategory: subCatId,
                    Breed: subCatId,
                    City: data.City,
                    PostalCode: data.PostalCode,
                    BasePrice: data.BasePrice,
                    EndDate: moment(date).format("YYYY-MM-DD"),
                    Country:  selectedCountry?._id,
                    State:  stateId,
                    color: data.color,
                    MetaDescription: data.MetaDescription,
                    ImageAlt: "Mauw",
                    VideoAlt: "Mauw",
                    MetaKeyWord: data.MetaKeyWord,
                    AgeMessurementId: ageTypeId,
                    WeightMessurementId: weightTypeId,
                    SizeMessurementId: sizeTypeId,
                    BidType: bidByType,
                    MetaTitle: data.MetaTitle,
                    AccDetails: {
                        Images: [image.path],
                        AccessoryName: "",
                        AccessoryType: "",
                        Description: ""
                    },
                    IsIndividualSellerProduct: true,
                    UserId: userData?.id, 
                    MyZooPick: true,
                }
            dispatch(petSave(datas))
            }

            if(bidByType == 2){
                let datas={

                    Videos: ["admin\/pets\/1625115235070-WIN_20210213_15_58_32_Pro.mp4"],
                    Images:[image.path],
                    SellingMode: value,
                    Name: data.Name,
                    Age: data.Age,
                    Weight: data.Weight,
                    Size: data.Size,
                    Gender: gender,
                    Category: catId,
                    SubCategory: subCatId,
                    Breed: subCatId,
                    City: data.City,
                    PostalCode: data.PostalCode,
                    BasePrice: data.BasePrice,
                    FinalPrice: data.FinalPrice,
                    Country:  selectedCountry?._id,
                    State:  stateId,
                    color: data.color,
                    MetaDescription: data.MetaDescription,
                    ImageAlt: "Mauw",
                    VideoAlt: "Mauw",
                    MetaKeyWord: data.MetaKeyWord,
                    AgeMessurementId: ageTypeId,
                    WeightMessurementId: weightTypeId,
                    SizeMessurementId: sizeTypeId,
                    BidType: bidByType,
                    MetaTitle: data.MetaTitle,
                    AccDetails: {
                        Images: [image.path],
                        AccessoryName: "",
                        AccessoryType: "",
                        Description: ""
                    },
                    IsIndividualSellerProduct: true,
                    UserId: userData?.id, 
                    MyZooPick: true,
                }
            dispatch(petSave(datas))
            }
        }
    };

    const ChoosePhotoFromLibrary = async() => {

        let options = {
            mediaType: 'mixed',
            selectionLimit: 3
        }

        const result = await launchImageLibrary(options);

        reactotron.log({result: result.assets})

        setImage(result.assets)

        // if(image){
        //     setImage([result[0].assets])
        // }
        // else{
        //     setImage([result])
        // }

        //reactotron.log({result})

        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     cropping: false,
        //     multiple: true,
        //     maxFiles: 3,
        //     mediaType: 'any'
        //   }).then(image => {
        //     reactotron.log(image);
        //     setImage(image.slice(0,3))
        // });

    }

   
 

  return (
    <>
       

        <CommonBackground>
   
            <Heading label={t("PostNewItem.postNwItem")}/>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Box p={3}>
                    
                    <AddImage onPress={ChoosePhotoFromLibrary} image={image} />

                    <SelectInput 
                        placeholder={t("PostNewItem.selectCat")}
                        selectedValue={catId}
                        changeValue={(value) => {
                            setCatId(value)
                        } }
                        optlabel={"CategoryName"}
                        optValue={"_id"}
                        options={categoryList}
                    />

                    <SelectInput 
                        placeholder={t("PostNewItem.selectsubCat")}
                        selectedValue={subCatId}
                        changeValue={(value) => {
                            setSubCatId(value)
                        } }
                        optlabel={"Text"}
                        optValue={"_id"}
                        options={subCategoryList}
                    />


                    <SelectInput 
                        placeholder={t("PostNewItem.selectGen")}
                        selectedValue={gender}
                        changeValue={(value) => {
                            setGender(value)
                        } }
                        optlabel={"Name"}
                        optValue={"_id"}
                        options={genderList}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.Name}
                        fieldName="Name" 
                        placeholder={t("PostNewItem.Name")} mt={3}
                    />
                    <SelectInput 
                        placeholder={t("PostNewItem.color")}
                        selectedValue={gender}
                        changeValue={(value) => {
                            setGender(value)
                        } }s
                        optlabel={"name"}
                        optValue={"_id"}
                        options={colorList}
                    />

                    <Toggle
                        value={age} 
                        onValueChange={()=>setAge(!age)}
                        label={t("PostNewItem.age")}
                    />
                    {age ? <>
                        <SelectInput 
                            placeholder={t("PostNewItem.selectAgeType")}
                            selectedValue={ageTypeId}
                            changeValue={(value) => {
                                setAgeTypeId(value)
                            } }
                            optlabel={"Text"}
                            optValue={"_id"}
                            options={ageTypeList}
                        />

                        <CommonInput  
                            control={control}
                            error={errors.Age}
                            fieldName="Age" 
                            placeholder={t("PostNewItem.age")} mt={3}
                        />
                    </> : <NotKnown /> }
                    <Toggle
                        value={weight} 
                        onValueChange={()=>setWeight(!weight)} 
                        label={t("PostNewItem.weight")}
                    />
                    {weight ? <>
                    <SelectInput 
                        placeholder={t("PostNewItem.selWeightTyp")}
                        selectedValue={weightTypeId}
                        changeValue={(value) => {
                            setWeightTypeId(value)
                        } }
                        optlabel={"Text"}
                        optValue={"_id"}
                        options={weightTypeList}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.Weight}
                        fieldName="Weight" 
                        placeholder={t("PostNewItem.weight")}  mt={3}
                    />
                    </> : <NotKnown />}
                    <Toggle 
                        value={size} 
                        onValueChange={()=>setSize(!size)} 
                        label={t("PostNewItem.size")} mb={2}
                    />

                    {size ? <>
                    <SelectInput 
                        placeholder={t("PostNewItem.selSizTyp")}
                        selectedValue={sizeTypeId}
                        changeValue={(value) => {
                            setSizeTypeId(value)
                        } }
                        optlabel={"Text"}
                        optValue={"_id"}
                        options={sizeTypeList}
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
                        placeholder={t("PostNewItem.zip")} mt={3}
                    />

                    <Box alignSelf={'center'} mt={3}>

                        <RadioButton value={value} onChange={nextValue => {
                            setValue(nextValue);
                        }}/>
                                            
                    </Box>

                    {value==2 ? <> 
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

                    
                    <CommonInput  
                        control={control}
                        error={errors.MetaDescription}
                        fieldName="MetaDescription" 
                        placeholder={t("PostNewItem.abtPet")} mt={3}
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