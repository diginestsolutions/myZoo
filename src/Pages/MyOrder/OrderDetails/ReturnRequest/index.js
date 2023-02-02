import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, useToast, Spinner, HStack, Text, Select } from 'native-base'
import Heading from '../../../../Components/Heading'
import Title from '../../Title'
import SelectInput from '../../../../Components/SelectInput'
import CommonInput from '../../../../Components/CommonInput'
import Button from '../../../../Components/Button'
import CommonBackground from '../../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { RESET_FEEDBACK } from '../../../../Redux/constants/orderConstant'
import { getReturnRequest } from '../../../../Redux/actions/orderAction'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../../config/Constants'
import moment from 'moment'
import customAxios from '../../../../CustomAxios'
import reactotron from 'reactotron-react-native'


const ReturnRequest = ({navigation, route}) => {

    const { t } = useTranslation();

    const [reasons, setReasons] = useState([])
    const [reasonId, setReasonId] = useState([])

    const { order } = route.params
     
    const dispatch = useDispatch();
    const toast = useToast()

    const { returnRequest, loading, error, orderList, activeOrder } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    reactotron.log({activeOrder})

    useLayoutEffect(() => {
        getReasonList()
    }, []);

    const getReasonList = async() => {
        await customAxios.post(`Front_End/Mob_products/listAllReason`)  
        .then(async response => {
            setReasons(response?.data)
        })
        .catch(async error => {
        });
    }

    useEffect(() => {
        if(error){

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(returnRequest){
            dispatch({
                type: RESET_FEEDBACK        
                })
            toast.show({
                title: 'Submitted',
            })
            
            navigation.navigate('MyOrder')
        }
    }, [error, returnRequest])



    const schema = yup.object({   

        Comments: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
        
            Comments:data.Comments,
            OrderId: activeOrder?._id,
            UserId: userData?.id,
            ProductId: activeOrder?.products?._id,
            ReasonId: reasonId,
            
        }

        dispatch(getReturnRequest(datas))
    };


    return (
    <>

        <CommonBackground>
        <ScrollView>
            <Heading label={t("RequestReturn.reqRet")}/>
            <Box p={3}>

            {/* <OrderCard 
                status={'Item'}
            />  */}

                        <HStack
                            borderWidth={1} borderColor={'#B4B4B4'}
                            p={3} alignItems='center' mx={1} my={3} borderRadius={7}
                        >
                            <ImageBackground
                                source={{ uri: `${IMAGE_URL}${order?.products?.Images?.[0]?.UploadedFileName}` }}
                                style={{ height: 110, width: 110 }}>
                            </ImageBackground>
                            <Box w={'80%'}>
                                <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{order?.products?.Name}</Text>
                                <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{moment(order?.orderDate).format("DD-MM-YYYY")}</Text>
                            </Box>

                        </HStack>



            <Title label={t("RequestReturn.reason")}/>

            <SelectInput 
                options={reasons}
                optValue="_id"
                optlabel={"Reason"}
                placeholder={t("RequestReturn.chooseRes")}
                changeValue={(value) => setReasonId(value)}
                selectedValue={reasonId}
            />

            <Title label={t("RequestReturn.wrtCmt")}/>

            <CommonInput 
                control={control}
                error={errors.Comments}
                fieldName="Comments" 
                placeholder={t("RequestReturn.wrtYrRsn")} 
                height={70} mt={3}
            />

            { loading ? <Spinner/> : <Button 
                onPress={handleSubmit(onSubmit)}
                label={t("RequestReturn.proRet")}  
                marginTop={5}
            />}
            </Box>
        

        </ScrollView>
                
        </CommonBackground>
    </>
    )
}

export default ReturnRequest

const styles = StyleSheet.create({})