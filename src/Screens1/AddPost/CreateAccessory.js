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
import { RESET_ERROR } from '../../Redux/constants/homeConstant'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { accessoriesSave } from '../../Redux/actions/myItemsAction'
import CommonSelectCountry from '../../Components/CommonSelectCountry'
import { useTranslation } from "react-i18next";
import ImagePicker from 'react-native-image-crop-picker';
import { getAllCategories } from '../../Redux/actions/homeAction'
import { getStateList } from '../../Redux/actions/settingsAction'
import reactotron from '../../ReactotronConfig'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import DateAndTimeInput from '../../Components/DateAndTimeInput'


const CreateAccessory = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  

    const { saveAccessories, loading, error } = useSelector(state => state.myItems)
    const { selectedCountry, userData } = useSelector(state => state.auth)
    const { latestAccessories, categoryList } = useSelector(state => state.home)
    const { stateList } = useSelector(state => state.settings)


    const [value, setValue] = useState('2');
    const [image, setImage] = useState('');
    const [accTypeId, setAccTypeID] = useState('');
    const [stateId, setStateId] = useState("")


    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    const [bidByType, setBidByType] = useState("")

    reactotron.log({bidByType})


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

        if(latestAccessories){
            let data = {
                Type: latestAccessories[0]?.Type
            }
            dispatch(getAllCategories(data))
        }

    }, [latestAccessories])

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
        if(saveAccessories){
            
            toast.show({
                title: 'Accessory Added Successfully',
            })
            
            // navigation.navigate('DeliveryAddress')
        }
    }, [error, saveAccessories])


    const schema = yup.object({   

        Name: yup.string().required(),
        color: yup.string().required(),
        Quantity: yup.number().required().positive().integer(),
        PostalCode: yup.number().required().positive().integer('Zip code is a required field'),
        Price: yup.number().required().positive().integer(),
        BasePrice: yup.number().required().positive().integer(),
        FinalPrice: yup.number().required().positive().integer(),
        MetaTitle: yup.string().required('Title is a required field'),
        Description: yup.string().required('About accessory is a required field'),
        City: yup.string().required(),


    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {

        if(value == 2){
            let datas={
                Images: [image.path],
                Category: accTypeId,
                Name: data.Name,
                Stoke: data.Quantity,
                City: data.City,
                PostalCode: data.PostalCode,
                Country: selectedCountry,
                State: stateId,
                color: data.color,
                SellingMode: value,
                Price: data.Price,
                Description: data.Description,
                MetaTitle: data.MetaTitle,
                DescriptionMeta: data.Description,
                UserId: userData?.id,
                IsIndividualSellerProduct: true,
                MyZooPick: true,
                stock: 10,
            }

            dispatch(accessoriesSave(datas))
        }
        if(value == 1){
            if(bidByType == 1){
                let datas={
                    Images: [image.path],
                    SellingMode: value,
                    Name: data.Name,
                    Category: accTypeId,
                    City: data.City,
                    PostalCode: data.PostalCode,
                    BasePrice: data.BasePrice,
                    EndDate: moment(date).format("YYYY-MM-DD"),
                    Description: data.Description,
                    Country: selectedCountry,
                    color: data.color,
                    DescriptionMeta: data.Description,
                    Stoke: data.Quantity,
                    BidType: bidByType,
                    MetaTitle: data.MetaTitle,
                    UserId: userData?.id,
                    IsIndividualSellerProduct: true,
                    MyZooPick: true,
                    State: stateId,
                }

                dispatch(accessoriesSave(datas))
            }
            if(bidByType == 2){
                let datas={
                    Images: [image.path],
                    SellingMode: value,
                    Name: data.Name,
                    Category: accTypeId,
                    City: data.City,
                    PostalCode: data.PostalCode,
                    BasePrice: data.BasePrice,
                    FinalPrice: data.FinalPrice,
                    Description: data.Description,
                    Country: selectedCountry,
                    color: data.color,
                    DescriptionMeta: data.Description,
                    Stoke: data.Quantity,
                    BidType: bidByType,
                    MetaTitle: data.MetaTitle,
                    UserId: userData?.id,
                    IsIndividualSellerProduct: true,
                    MyZooPick: true,
                    State: stateId,
                }

                dispatch(accessoriesSave(datas))
            }
        }
    };

    const ChoosePhotoFromLibrary = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setImage(image)
        });

    }
  return (
    <>
        
        <CommonBackground>
   
            <Heading label={t("CreateAccessory.createAcc")}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box p={3}>

                    <AddImage onPress={ChoosePhotoFromLibrary}/>

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
                    
                    <CommonInput 
                        control={control}
                        error={errors.color}
                        fieldName="color" 
                        placeholder={t("PostNewItem.color")} mt={3}
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
                        error={errors.MetaTitle}
                        fieldName="MetaTitle" 
                        placeholder={t("PostNewItem.title")} mt={3}
                    />

                    <CommonInput  
                        control={control}
                        error={errors.Description}
                        fieldName="Description"  
                        placeholder={t("CreateAccessory.abtAcc")} mt={3}
                    />
                        
                    { loading ? <Spinner/> : <Button 
                        onPress={handleSubmit(onSubmit)}
                        label={t("CreateAccessory.postItem")} marginTop={6}
                    />}

                </Box>
            </ScrollView>

        </CommonBackground>
    </>
  )
}

export default CreateAccessory

const styles = StyleSheet.create({})