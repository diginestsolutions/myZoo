import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Spinner, ScrollView, Text, FlatList, Pressable, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../../../Components/Heading'
import CommonTextIcon from '../../Profile/CommonTextIcon'
import Title from '../Title'
import ShipmentDetailsCard from './ShipmentDetailsCard'
import InvoiceCard from './InvoiceCard'
import AddressBox from '../../Profile/DeliveryAddress/AddressBox'
import PaymentInfoCard from './PaymentInfoCard'
import OrderSummeryCard from './OrderSummeryCard'
import CommonBackground from '../../../Components/CommonBackground'
import { getOrderedProduct } from '../../../Redux/actions/orderAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import ShippingAddress from '../ShippingAddress'
import { IMAGE_URL } from '../../../config/Constants'
import moment from 'moment'


const OrderDetails = ({navigation, route}) => {

    const { productId, orderId, item } = route.params

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()


    const { addressList, loading } = useSelector(state => state.settings)
    const { orderList, error, activeOrder, orderedProduct } = useSelector(state => state.order)

    useEffect(() => {
        let data = {
            orderId: orderId,
	        ProductId: productId
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
                    orderDate={moment(activeOrder?.orderDate).format("DD-MM-YYYY") }
                    orderNo={activeOrder?.orderNumber}
                    price={orderedProduct?.orderAmount}
                    quantity={orderedProduct?.orderdetails?.Quantity}

                />

                <Title label={t("ViewOrderDetails.shpmntDet")}/>

                <ShippingAddress address={orderedProduct?.address}/>


                <ShipmentDetailsCard
                    orderStatus={orderedProduct?.orderstatus.status}
                    productName={orderedProduct?.products?.Name}
                    price={orderedProduct?.products?.Price}
                    quantity={orderedProduct?.orderdetails?.Quantity}
                    sellerName={orderedProduct?.orderdetails?.sellerName}
                    image={`${IMAGE_URL}${orderedProduct?.products?.Images?.[0]?.UploadedFileName}`}
                />            

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('TrackItem', { item: item })}
                    text={t("ViewOrderDetails.trkShpmnt")} 
                    iconName="right"
                />

                {/* <Title label={t("ViewOrderDetails.paymntInfo")}/>

                <PaymentInfoCard/> */}

                {/* <Title label={t("ViewOrderDetails.shpngAddr")}/>
                
                <ShippingAddress/> */}

                <Title label={t("ViewOrderDetails.ordSmmry")}/>

                <OrderSummeryCard 
                    productPrice={orderedProduct?.products?.Price} 
                    deliveryCharges={orderedProduct?.delivercharge} 
                    total={orderedProduct?.orderAmount} 
                />

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('LeaveSellerFeedback', { productId: orderedProduct?.orderdetails?.productId, orderId: orderedProduct?._id, sellerId: orderedProduct?.orderdetails?.sellerId })}
                    text={t("ViewOrderDetails.levSelFedbk")}
                    iconName="right"
                    top={3}
                />
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('LeaveDeliveryFeedback', { order: orderedProduct })}
                    text={t("ViewOrderDetails.levDelFedbk")}
                    iconName="right"
                    top={3}
                />
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('WriteProductReview', { order: orderedProduct })}
                    text={t("ViewOrderDetails.wrPdtRevw")}
                    iconName="right"
                    top={3}
                />
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('ReturnRequest', { order: orderedProduct })}
                    text={t("ViewOrderDetails.retReq")}
                    iconName="right"
                    top={3}
                    mb={20}
                    color={"red.600"}
                />

            </Box>


            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})