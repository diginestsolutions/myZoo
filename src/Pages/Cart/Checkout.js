import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, ScrollView, Text, FlatList, Spinner, HStack, useToast } from 'native-base'
import Header from '../../Components/Header'
import Heading from '../../Components/Heading'
import Button from '../../Components/Button'
import AddressBox from '../Profile/DeliveryAddress/AddressBox'
import EditButton from '../../Components/EditButton'
import CommonTextIcon from '../Profile/CommonTextIcon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Timeline from '../../Components/Timeline'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { CART_INPUT } from '../../Redux/constants/cartConstant'
import CommonBackground from '../../Components/CommonBackground'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import { useFocusEffect } from '@react-navigation/native';


const labels = ["Shipping","Payment","Place order"];

const Checkout = ({navigation, route}) => {

    

    const { t } = useTranslation();

    const toast = useToast()

    const [addressList, setAddressList ] = useState([])

    const dispatch = useDispatch();
    const [selected, setSelected] = useState(null)

    const { loading, error } = useSelector(state => state.settings)
    const { userData } = useSelector(state => state.auth)


    useFocusEffect(
        React.useCallback(() => {
            getSavedAddress()
        }, [])
      );

    // useEffect(() => {
    //     getSavedAddress()
    // }, [])

    const getSavedAddress = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })

        let data = {
            UserId: userData?.id,
        }
    
        await customAxios.post(`customeraddress/_loadAddressOfUser`, data)  
        .then(async response => {
            setAddressList(response.data.data)

            let defaults = response.data.data.find(add => add.IsDefaultAddress === true)

            setSelected(defaults)
    
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


    const renderItems = ({item}) => (
        <AddressBox 
            item={item}
            selected={selected?._id}
            onChanged={() => setSelected(item)}
        />
    )

    const Checkouts = async() => {

        if(selected){
            dispatch({
                type: CART_INPUT,
                payload: {
                    prop: 'addressId',
                    value: selected
                }
            })

            dispatch({
                type: LOADING,
                payload: true
            })
            let url = ""
            let data = {};
            if(route?.params?.productId){
                data = {
                    UserId: userData?.id,
                    ProductId: route?.params?.productId
                }
                url = "Front_End/CartMob/hyper_directbuy";

            }
            else{
                data = {
                    UserId: userData?.id
                }
                url="Front_End/CartMob/hyper_checkout"
            }
            await customAxios.post(url, data)  
            .then(async response => {
                // dispatch({
                //     type: CART_CHECKOUT_PAYMENT_SUCCESS,
                //     payload: response.data
                // })
                navigation.navigate('Payment', { 
                    id: response.data.id, 
                    mode: route?.params?.productId ? 'product' : 'cart', 
                    productId: route?.params?.productId 
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


            //navigation.navigate('Payment')
        }
        // let data = {
        //     UserId: userData?.id,
        //     AddressId: selected,
        //     id: checkoutPayment?.id,
        //     resourcePath: `/v1/checkouts/${checkoutPayment?.ndc}/payment`
        // }
        // dispatch(cartCheckoutResult(data))
        // //navigation.navigate('Payment')

    }
   
  

  return (
    <>
    
    <CommonBackground>


                {loading ? <Spinner/> : <FlatList 
                    data={addressList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    style={{ padding: 5, margin: 5 }}
                    ListHeaderComponent={() => <>
                        <Heading label={t("Checkout.checkout")}/>

                        <Timeline 
                            labels={labels} 
                            stepCount={3} 
                            mt={5}
                        />

                        <Box borderBottomWidth={1} pb={1.5} mt={5} borderColor='#B4B4B4'>
                            <Text textAlign={'center'} fontWeight={400} color='#000' fontSize={15}fontFamily='body'>{t("Checkout.selAShpAddr")}</Text>
                        </Box>
                    </>}

                    ListFooterComponent={() => <>
                        <Button 
                            onPress={Checkouts}
                            label={t("Checkout.delToThisAddr")} marginTop={6}
                        />

                        <EditButton 
                            onPress={()=>navigation.navigate('EditAddress', { address: selected })}
                            label={t("Checkout.editAddr")}
                            mt={5}
                            color='#707070'
                        />

                        <CommonTextIcon 
                            onPress={()=>navigation.navigate('AddANewAddress')}
                            text={t("Checkout.addNewAddr")}
                            icon={<MaterialCommunityIcons name="note-text-outline"/>}
                            bottomRad={5}
                            topRad={5}
                            iconName="right"
                            top={4}
                        />
                    </>}
                />}       
    </CommonBackground>
    </>
  )
}

export default Checkout

const styles = StyleSheet.create({})