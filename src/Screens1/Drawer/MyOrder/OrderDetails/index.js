import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Spinner, ScrollView, Text, FlatList, Pressable, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../../Components/Header'
import Heading from '../../../../Components/Heading'
import CommonTextIcon from '../../../Profile/CommonTextIcon'
import Title from '../Title'
import ShipmentDetailsCard from './ShipmentDetailsCard'
import InvoiceCard from './InvoiceCard'
import AddressBox from '../../../Profile/DeliveryAddress/AddressBox'
import PaymentInfoCard from './PaymentInfoCard'
import OrderSummeryCard from './OrderSummeryCard'
import CommonBackground from '../../../../Components/CommonBackground'
import { getOrderedProduct } from '../../../../Redux/actions/orderAction'
import { RESET_ERROR } from '../../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import ShippingAddress from '../ShippingAddress'
import { IMAGE_URL } from '../../../../config/Constants'


const OrderDetails = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()


    const { addressList, loading } = useSelector(state => state.settings)
    const { orderList, error, activeOrder } = useSelector(state => state.order)

    useEffect(() => {
        let data = {
            orderId: activeOrder?._id,
	        ProductId: "6048552b52306d2be0976bf9"
        }
        dispatch(getOrderedProduct(data))
    
    }, [])

    useEffect(() => {
        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [error])


    const renderItems = ({item}) => (
        <AddressBox 
            item={item}
        />
    )

  return (
    <>
        <CommonBackground>
            <ScrollView >

            <Heading label={t("ViewOrderDetails.viewOrdDet")}/>
            <Box px={3}>

                <InvoiceCard
                    orderDate={activeOrder?.orderDate}
                    orderNo={activeOrder?.orderNumber}
                    price={activeOrder?.orderPrice}
                    quantity={activeOrder?.Quantity}

                />

                <Title label={t("ViewOrderDetails.shpmntDet")}/>

                <ShippingAddress/>


                <ShipmentDetailsCard
                    productName={activeOrder?.productName}
                    price={activeOrder?.orderPrice}
                    quantity={activeOrder?.Quantity}
                    sellerName={activeOrder?.sellerName}
                    image={`${IMAGE_URL}${activeOrder?.Images?.[0]?.UploadedFileName}`}
                />            

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('TrackItem')}
                    text={t("ViewOrderDetails.trkShpmnt")} 
                    iconName="right"
                />

                <Title label={t("ViewOrderDetails.paymntInfo")}/>

                <PaymentInfoCard/>

                <Title label={t("ViewOrderDetails.shpngAddr")}/>
                
                <ShippingAddress/>

                <Title label={t("ViewOrderDetails.ordSmmry")}/>

                <OrderSummeryCard/>

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('LeaveSellerFeedback')}
                    text={t("ViewOrderDetails.levSelFedbk")}
                    iconName="right"
                    top={3}
                />
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('LeaveDeliveryFeedback')}
                    text={t("ViewOrderDetails.levDelFedbk")}
                    iconName="right"
                    top={3}
                />
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('WriteProductReview')}
                    text={t("ViewOrderDetails.wrPdtRevw")}
                    iconName="right"
                    top={3}
                />
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('ReturnRequest')}
                    text={t("ViewOrderDetails.retReq")}
                    iconName="right"
                    top={3}
                    mb={20}
                />

            </Box>


            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})