import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, ScrollView, Text, FlatList, Spinner, HStack } from 'native-base'
import Header from '../../Components/Header'
import CommonBackground from '../../Components/CommonBackground'
import Heading from '../../Components/Heading'
import Button from '../../Components/Button'
import AddressBox from '../Profile/DeliveryAddress/AddressBox'
import EditButton from '../../Components/EditButton'
import CommonTextIcon from '../Profile/CommonTextIcon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Timeline from '../../Components/Timeline'
import { useDispatch, useSelector } from 'react-redux'
import { listAddress } from '../../Redux/actions/settingsAction'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../config/Constants'
import { cartCheckoutResult } from '../../Redux/actions/cartAction'
import { CART_INPUT } from '../../Redux/constants/cartConstant'


const labels = ["Shipping","Payment","Place order"];

const Checkout = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const [selected, setSelected] = useState(null)

    const { addressList, loading, error } = useSelector(state => state.settings)
    const { checkoutPayment } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.auth)


    const { productById } = useSelector(state => state.home)


    useEffect(() => {
        let data = {
            UserId: userData?.id,
        }
        dispatch(listAddress(data))
    }, [])


    const renderItems = ({item}) => (
        <AddressBox 
            item={item}
            selected={selected}
            onChanged={() => setSelected(item?._id)}
        />
    )

    Checkouts = () => {

        if(selected){
            dispatch({
                type: CART_INPUT,
                payload: {
                    prop: 'addressId',
                    value: selected
                }
            })
            navigation.navigate('Payment')
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
        <ScrollView>
            <Heading label={t("Checkout.checkout")}/>
            <Box px={3}>

                <Timeline 
                    labels={labels} 
                    stepCount={3} 
                    mt={5}
                />

                <Box borderBottomWidth={1} pb={1.5} mt={5} borderColor='#B4B4B4'>
                    <Text textAlign={'center'} fontWeight={400} color='#000' fontSize={15}fontFamily='body'>{t("Checkout.selAShpAddr")}</Text>
                </Box>


                {loading ? <Spinner/> : <FlatList 
                    data={addressList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />}
                
                <Button 
                    onPress={Checkouts}
                    label={t("Checkout.delToThisAddr")} marginTop={6}
                />

                <EditButton 
                    onPress={()=>navigation.navigate('EditAddress')}
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


            </Box>
            

            
            
        </ScrollView>        
    </CommonBackground>
    </>
  )
}

export default Checkout

const styles = StyleSheet.create({})