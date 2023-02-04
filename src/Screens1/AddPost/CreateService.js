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
import { RESET_ERROR } from '../../Redux/constants/homeConstant';
import CommonSelectCountry from '../../Components/CommonSelectCountry';
import { useTranslation } from "react-i18next";
import { addService } from '../../Redux/actions/myItemsAction';
import ImagePicker from 'react-native-image-crop-picker';
import reactotron from '../../ReactotronConfig';
import { getStateList } from '../../Redux/actions/settingsAction';


const CreateService = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { saveService, loading, error } = useSelector(state => state.myItems)
    const { selectedCountry, userData } = useSelector(state => state.auth)
    const { services } = useSelector(state => state.home)
    const { stateList } = useSelector(state => state.settings)
    
    const [stateId, setStateId] = useState("")
    const [image, setImage] = useState('');
    const [serviceTypeId, setServiceTypeId] = useState("")

    useEffect(() => {
        if(selectedCountry?._id){
            let data={
                Country: selectedCountry?._id
            }
            dispatch(getStateList(data))
        }
    }, [selectedCountry?._id])



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

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={

            Category: serviceTypeId,
            SubCategory:"605c2d8e3f9d422e2451e0cf",
            Name:data.Name,
            City: data.City,
            PostalCode: data.PostalCode,
            Country: selectedCountry?._id,
            State: stateId,
            Price:"",
            Description: data.Description,
            MetaTitle: data.Title,
            DescriptionMeta: data.Keyword,
            Age:"",
            AgeUnit:"",
            Breed:"",
            Days:"",
            UserId: userData?.id,
            Weight:"",
            WeightMessurementId:"",
            IsIndividualSellerProduct:true,
            Images: image.path,
            Videos:[],
            countryId: userData?.Country,
            userId: userData?.id,
            BreedName: data.Breed,
            CategoryName: data.CategoryName,
            ToCountry:"5fe321d2e9ce6f4494dd8b81",
            ToCity:"",
            ToState:"",
            FromCountry:"5fe321d2e9ce6f4494dd8b81",
            FromCity:"Eastern",
            FromState:"60abb138c60b6b3ae47bafe9",
            ServiceName: data.Name,
    
              
        }

        dispatch(addService(datas))
    };

    const ChoosePhotoFromLibrary = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            reactotron.log({image});
            setImage(image)
        });

    }
  return (
    <>

        <CommonBackground>
   
            <Heading label={t("CreateService.createSer")}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box p={3}>

                    <AddImage onPress={ChoosePhotoFromLibrary}/>

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
                        placeholder={t("CreateService.selectCat")}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.Name}
                        fieldName="Name" 
                        placeholder={t("CreateService.serName")} mt={3}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.CategoryName}
                        fieldName="CategoryName" 
                        placeholder={t("CreateService.catName")} mt={3}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.Breed}
                        fieldName="Breed" 
                        placeholder={t("ProductDetails.breed")} mt={3}
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
                        placeholder={t("CreateService.zip")} mt={3}
                    />
                    <CommonInput
                        control={control}
                        error={errors.Description}
                        fieldName="Description"   
                        placeholder={t("CreateService.description")} mt={3}
                    />
                    <CommonInput  
                        control={control}
                        error={errors.Title}
                        fieldName="Title"  
                        placeholder={t("CreateService.metaTitle")} mt={3}
                    />
                    <CommonInput  
                        control={control}
                        error={errors.Keyword}
                        fieldName="Keyword" 
                        placeholder={t("CreateService.metaKey")} mt={3}
                    />                        
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