import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, Icon, ScrollView, Text, Pressable, useToast, Spinner } from 'native-base'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import Heading from '../../Components/Heading'
import CommonInput from '../../Components/CommonInput'
import AddImage from './AddImage'
import SelectInput from '../../Components/SelectInput'
import CommonBackground from '../../Components/CommonBackground'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant';
import CommonSelectCountry from '../../Components/CommonSelectCountry';
import { useTranslation } from "react-i18next";
import { addService } from '../../Redux/actions/myItemsAction';
import reactotron from '../../ReactotronConfig';
import { getStateList } from '../../Redux/actions/settingsAction';
import customAxios from '../../CustomAxios';
import {launchImageLibrary} from 'react-native-image-picker';
import CountryPicker from '../../Components/CountryPicker';
import axios from 'axios';


const CreateService = ({navigation, route}) => {

    const { NoOfImage, NoOfVideo, ImageSize, VideoSize, VideoTime, MyZooPick  } = route.params

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const [services, setServices] = useState([])

    const { saveService, loading, error } = useSelector(state => state.myItems)
    const { selectedCountry, userData } = useSelector(state => state.auth)
    const { stateList } = useSelector(state => state.settings)
    
    const [stateId1, setStateId1] = useState("")
    const [stateId2, setStateId2] = useState("")
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const [bread, setBread] = useState('');
    const [countryFrom, setCountryFrom] = useState('');
    const [countryTo, setCountryTo] = useState('');
    const [serviceTypeId, setServiceTypeId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [catId, setCatId] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [weightTypeList, setWeightTypeList] = useState([])
    const [weightTypeId, setWeightTypeId] = useState("")

    const [stateList1, setStateList1] = useState([])
    const [stateList2, setStateList2] = useState([])



    useEffect(() => {
      getServices()
      getAllCategories()
    }, [])

    useEffect(() => {
        if(serviceTypeId === "602d588b331cf629080f78c8"){
            getWeightTypeList()
        }
    }, [serviceTypeId])

    useEffect(() => {
        if(catId){
            let data = {
                Category: catId
            }
            getAllSubCategories(data)
        }
    }, [catId])

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

    const getServices = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/service/_loadServicesType`)
        .then(async response => {
            dispatch({
                type: LOADING,
                payload: false
            })   

            setServices(response.data)
    
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
    

    


    useEffect(() => {

        if(countryFrom){
            let data={
                Country: countryFrom
            }
            getStateList("state1", data)
        }

        if(countryTo){
            let data={
                Country: countryTo
            }
            getStateList("state2", data)
        }
        
    }, [countryFrom, countryTo])


    const getStateList = async(state, data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/states/listStateWithCountryId`,data)  
        .then(async response => {

            if(state === "state1"){
                setStateList1(response.data)
            }
            else{
                setStateList2(response.data)
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

        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }

    }, [error])

  
  useEffect(() => {
        if(error){
            toast.show({
                title: 'Error',
                description : error
            })
        }    
        if(saveService){
            
            toast.show({
                title: 'Service Added Successfully',
            })
            
            // navigation.navigate('DeliveryAddress')
        }
    }, [error, saveService])


    const schema = yup.object({   

        Name: yup.string().required(),
        CategoryName: yup.string().required(),
        Breed: yup.string().required(),
        Quantity: yup.number().required().positive().integer(),
        PostalCode: yup.number().required('Zip code is a required field').positive().integer(),
        Price: yup.number().required().positive().integer(),
        Description: yup.string().required(),
        Title: yup.string().required('Title is a required field'),
        Keyword: yup.string().required('Subtitle is a required field'),
        City: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        let imagesArray = [];
        let videoArray = [];
        const requests = []
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
            }))
            .catch(errors => {
                // react on errors.
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
        }
        let category, state, service, datas, state2, breads;
        switch (serviceTypeId) {
            case "602d5922331cf629080f78cb":    //Grooming
            case "602d596f331cf629080f78cf":    //Hotel
            case "602d5948331cf629080f78cd":    //Vet
            case "62ab0718c2bcc42999b0d2f1":    //Trainer
                category = categoryList.find(cat => cat._id === catId)
                state = stateList1.find(st => st._id === stateId1)
                service = services.find(ser => ser._id === serviceTypeId)
                datas={
                    Category:catId,
                    SubCategory: "",
                    Name:"",
                    City: "",
                    PostalCode:"",
                    Country: countryFrom,
                    State: stateId1,
                    Price: data?.price,
                    Description: data?.description,
                    MetaTitle:"",
                    DescriptionMeta:"",
                    Age:"",
                    AgeUnit:"",
                    Breed:"",
                    Days:"",
                    UserId: userData?.id,
                    Weight: "",
                    WeightMessurementId: "",
                    IsIndividualSellerProduct:true,
                    Images:imagesArray,
                    Videos:videoArray,
                    countryId:countryFrom,
                    BreedName: "",
                    CategoryName:category?.CategoryName,
                    ToCountry:"",
                    ToCity:"",
                    ToState:"",
                    FromCountry:countryFrom,
                    FromCity:state?.StateName,
                    FromState:stateId1,
                    MyZooPick: MyZooPick,
                    ServiceName: service?.Name
                }
            
                addService(datas)
                break;

            case "602d5877331cf629080f78c7":    //Delivery 
                category = categoryList.find(cat => cat._id === catId)
                state = stateList1.find(st => st._id === stateId1)
                service = services.find(ser => ser._id === serviceTypeId)
                state2 = stateList2.find(st => st._id === stateList2)
                datas={
                    Category:catId,
                    SubCategory: "",
                    Name:"",
                    City: "",
                    PostalCode:"",
                    Country: countryFrom,
                    State: stateId1,
                    Price: data?.price,
                    Description: data?.description,
                    MetaTitle:"",
                    DescriptionMeta:"",
                    Age:"",
                    AgeUnit:"",
                    Breed:"",
                    Days:"",
                    UserId: userData?.id,
                    Weight: "",
                    WeightMessurementId: "",
                    IsIndividualSellerProduct:true,
                    Images:imagesArray,
                    Videos:videoArray,
                    countryId:countryFrom,
                    BreedName: "",
                    CategoryName:category?.CategoryName,
                    ToCountry:countryTo,
                    ToCity:state2?.StateName,
                    ToState: stateId2,
                    FromCountry:countryFrom,
                    FromCity:state?.StateName,
                    FromState:stateId1,
                    MyZooPick: MyZooPick,
                    ServiceName: service?.Name
                }
        
            addService(datas)
            break;

            case "602d58fb331cf629080f78ca":    //Mating
            case "602d595f331cf629080f78ce":    //Loast animals
            case "602d5936331cf629080f78cc":    //Requests
            case "602d5849331cf629080f78c6":    //Adoption
            case "602d58c6331cf629080f78c9":    //Found Animals
            case "602d588b331cf629080f78c8":    //Food
            
                category = categoryList.find(cat => cat._id === catId)
                state = stateList1.find(st => st._id === stateId1)
                service = services.find(ser => ser._id === serviceTypeId)
                breads = subCategoryList.find(sub => sub._id === bread)

                datas={
                    Category:catId,
                    SubCategory: bread,
                    Name:"",
                    City: "",
                    PostalCode:"",
                    Country: countryFrom,
                    State: stateId1,
                    Price: serviceTypeId === "602d5849331cf629080f78c6" ? "" : data?.price,
                    Description: data?.description,
                    MetaTitle:"",
                    DescriptionMeta:"",
                    Age:"",
                    AgeUnit:"",
                    Breed:bread,
                    Days:"",
                    UserId: userData?.id,
                    Weight: serviceTypeId === "602d588b331cf629080f78c8" ? data.Weight : "",
                    WeightMessurementId: serviceTypeId === "602d588b331cf629080f78c8" ? weightTypeId : "",
                    IsIndividualSellerProduct:true,
                    Images:imagesArray,
                    Videos:videoArray,
                    countryId:countryFrom,
                    BreedName: breads.Text,
                    CategoryName:category?.CategoryName,
                    ToCountry:"",
                    ToCity:"",
                    ToState: "",
                    FromCountry:countryFrom,
                    FromCity:state?.StateName,
                    FromState:stateId1,
                    MyZooPick: MyZooPick,
                    ServiceName: service?.Name
                }
        
            addService(datas)
            break;
        
            default:
                
                break;
        }
    }

    const addService = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`mobile/service/_save`,data)
        .then(async response => {
            toast.show({
                title: "Success",
                description: "Service Added successfully",
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

    const renderDetailsForm = () => {
        switch(serviceTypeId){
            case "602d5922331cf629080f78cb": //Grooming
            case "602d596f331cf629080f78cf":    //Hotel
            case "602d5948331cf629080f78cd":    //Vet
            case "62ab0718c2bcc42999b0d2f1":    //Trainer
                return(
                    <>
                        <CommonInput  
                            control={control}
                            error={errors.price}
                            fieldName="price" 
                            placeholder={t("CreateService.price")}  
                            mt={3}
                        />
                        <CountryPicker 
                            label={"Country"} 
                            onSelectCountry={(value) => setCountryFrom(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId1}
                            changeValue={(value) => {
                                setStateId1(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList1}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.description}
                            fieldName="description" 
                            placeholder={t("CreateService.description")} mt={3}
                            numLines={5}
                            height={150}
                        />
                    </>
                )
            case "602d5877331cf629080f78c7":    //Delivery
                return(
                    <>
                        <CommonInput  
                            control={control}
                            error={errors.price}
                            fieldName="price" 
                            placeholder={t("CreateService.price")}  
                            mt={3}
                        />
                        <CountryPicker 
                            label={"From"} 
                            onSelectCountry={(value) => setCountryFrom(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId1}
                            changeValue={(value) => {
                                setStateId1(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList1}
                        />
                        <CountryPicker 
                            label={"To"} 
                            onSelectCountry={(value) => setCountryTo(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId2}
                            changeValue={(value) => {
                                setStateId2(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList2}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.description}
                            fieldName="description" 
                            placeholder={t("CreateService.description")} mt={3}
                            numLines={5}
                            height={150}
                        />
                    </>
                )

            case "602d58fb331cf629080f78ca":    //Mating
                return(
                    <>
                        <SelectInput 
                            placeholder={t("PostNewItem.selectsubCat")}
                            selectedValue={bread}
                            changeValue={(value) => {
                                setBread(value)
                            } }
                            optlabel={"Text"}
                            optValue={"_id"}
                            options={subCategoryList}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.price}
                            fieldName="price" 
                            placeholder={t("CreateService.priceperday")}  
                            mt={3}
                        />
                        <CountryPicker 
                            label={""} 
                            onSelectCountry={(value) => setCountryFrom(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId1}
                            changeValue={(value) => {
                                setStateId1(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList1}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.description}
                            fieldName="description" 
                            placeholder={t("CreateService.description")} mt={3}
                            numLines={5}
                            height={150}
                        />
                    </>
                )

            case "602d5849331cf629080f78c6":    //Adoption
                return(
                    <>
                        <SelectInput 
                            placeholder={t("PostNewItem.selectsubCat")}
                            selectedValue={bread}
                            changeValue={(value) => {
                                setBread(value)
                            } }
                            optlabel={"Text"}
                            optValue={"_id"}
                            options={subCategoryList}
                        />
                        <CountryPicker 
                            label={""} 
                            onSelectCountry={(value) => setCountryFrom(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId1}
                            changeValue={(value) => {
                                setStateId1(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList1}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.description}
                            fieldName="description" 
                            placeholder={t("CreateService.description")} mt={3}
                            numLines={5}
                            height={150}
                        />
                    </>
                )

            

            case "602d595f331cf629080f78ce":    //Loast animals
            case "602d5936331cf629080f78cc":    //Requests
            case "602d58c6331cf629080f78c9":    //Found Animals
                return(
                    <>
                        <SelectInput 
                            placeholder={t("PostNewItem.selectsubCat")}
                            selectedValue={bread}
                            changeValue={(value) => {
                                setBread(value)
                            } }
                            optlabel={"Text"}
                            optValue={"_id"}
                            options={subCategoryList}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.price}
                            fieldName="price" 
                            placeholder={t("CreateService.price")}  
                            mt={3}
                        />
                        <CountryPicker 
                            label={""} 
                            onSelectCountry={(value) => setCountryFrom(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId1}
                            changeValue={(value) => {
                                setStateId1(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList1}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.description}
                            fieldName="description" 
                            placeholder={t("CreateService.description")} mt={3}
                            numLines={5}
                            height={150}
                        />
                    </>
                )

            case "602d588b331cf629080f78c8":    //Food
                return(
                    <>
                        <SelectInput 
                            placeholder={t("PostNewItem.selectsubCat")}
                            selectedValue={bread}
                            changeValue={(value) => {
                                setBread(value)
                            } }
                            optlabel={"Text"}
                            optValue={"_id"}
                            options={subCategoryList}
                        />
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
                        <CommonInput  
                            control={control}
                            error={errors.price}
                            fieldName="price" 
                            placeholder={t("CreateService.price")}  
                            mt={3}
                        />
                        <CountryPicker 
                            label={""} 
                            onSelectCountry={(value) => setCountryFrom(value)} 
                        />
                        <SelectInput 
                            placeholder={'State'} 
                            selectedValue={stateId1}
                            changeValue={(value) => {
                                setStateId1(value)
                            } }
                            optlabel={"StateName"}
                            optValue={"_id"}
                            options={stateList1}
                        />
                        <CommonInput  
                            control={control}
                            error={errors.description}
                            fieldName="description" 
                            placeholder={t("CreateService.description")} mt={3}
                            numLines={5}
                            height={150}
                        />
                    </>
                )

            default:
                return null
        }
    }


  return (
    <>

        <CommonBackground>
   
            <Heading label={t("CreateService.createSer")}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box p={3}>

                <AddImage onPress={ChoosePhotoFromLibrary} image={image} video={video} NoOfImage={NoOfImage} NoOfVideo={NoOfVideo} />

                    {/* <SelectInput 
                        placeholder={t("CreateService.selectSerType")}
                    /> */}

                    <SelectInput 
                        placeholder={t("CreateService.selectSerType")}
                        selectedValue={serviceTypeId}
                        changeValue={(value) => {
                            setServiceTypeId(value)
                        } }
                        optlabel={"Name"}
                        optValue={"_id"}
                        options={services}
                    />  
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
                    {renderDetailsForm()}

                         
                    { loading ? <Spinner/> : <Button 
                        onPress={handleSubmit(onSubmit)}
                        label={t("CreateService.postItem")} marginTop={6}
                    />}

                </Box>

            </ScrollView>
            
          
        

        </CommonBackground>
    </>
  )
}

export default CreateService

const styles = StyleSheet.create({})