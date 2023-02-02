import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Box, HStack, ScrollView, Text, Icon, useDisclose, useToast } from 'native-base'

import { useTranslation } from "react-i18next";
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import reactotron from 'reactotron-react-native';
import { cartCheckoutResult, directBuyResult } from '../../../Redux/actions/cartAction';
import { LOADING } from '../../../Redux/constants/homeConstant';
import customAxios from '../../../CustomAxios';
import { UPDATE_CART } from '../../../Redux/constants/cartConstant';


const Payment = ({ navigation, route }) => {

    const { t } = useTranslation();
    const { width, height } = useWindowDimensions()
    const { checkoutPayment, addressId } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.auth)

    const toast = useToast()

    const { id, mode } = route.params

    const dispatch = useDispatch()


    const webView = useRef(null)

    const [paymentSuccess, setPaymentSuccess] = useState(false)




    var html = `
        <html>
        <head>
        <style>
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        </head>
        <script>
            var wpwlOptions = {
                style: "card",
                applePay: {
                    displayName: "MyStore",
                    total: { label: "COMPANY, INC." }
                  }
            }

            function setAction(form) {
                form.action = "register.html";
                alert(form.action);
                return false;
            }
        </script>
            <script async src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${id}"></script>
            <form action="https://wordpresshyperpay.docs.oppwa.com/tutorials/integration-guide/customisation" class="paymentWidgets" data-brands="VISA MASTER AMEX MADA STC_PAY PAYPAL GOOGLEPAY"></form>

            
        </html>
  `;

    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        reactotron.log({ url })
        if (!url) return;

        // handle certain doctypes
        if (url.includes('customisation')) {
            var regex = /[?&]([^=#]+)=([^&#]*)/g,
                params = {},
                match;
            while (match = regex.exec(url)) {
                params[match[1]] = match[2];
            }
            //reactotron.log(decodeURIComponent(params.resourcePath))
            webView.current.stopLoading();
            setPaymentSuccess(true)

            if (mode === "cart") {
                let data = {
                    UserId: userData?.id,
                    AddressId: addressId?._id,
                    id: id,
                    resourcePath: decodeURIComponent(params.resourcePath)
                }
                cartCheckoutResult(data)
            }
            else if (mode === "membership") {
                let data = {
                    UserId: userData?.id,
                    MembershipId: route?.params?.membershipId,
                    id: id,
                    resourcePath: decodeURIComponent(params.resourcePath)
                }
                membershipCheckoutResult(data)
            }
            else if (mode === "product") {
                let data = {
                    UserId: userData?.id,
                    ProductId: route?.params?.productId,
                    AddressId: addressId?._id,
                    id: id,
                    resourcePath: decodeURIComponent(params.resourcePath)
                }

                directBuyResult(data)
            }
            // open a modal with the PDF viewer
        }
    }

    const directBuyResult = async (data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/CartMob/hyper_directbuy/result`, data)
            .then(async response => {

                dispatch({
                    type: UPDATE_CART,
                    payload: 0
                })

                navigation.navigate("OrderSuccess")

                dispatch({
                    type: LOADING,
                    payload: false
                })

            })
            .catch(async error => {

                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: "error.500"
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
    }

    const membershipCheckoutResult = async (data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/CartMob/hyper_membership/result`, data)
            .then(async response => {

                dispatch({
                    type: LOADING,
                    payload: false
                })

            })
            .catch(async error => {

                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: "error.500"
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
    }

    const cartCheckoutResult = async (data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/CartMob/hyper_checkout/result`, data)
            .then(async response => {

                dispatch({
                    type: UPDATE_CART,
                    payload: 0
                })

                navigation.navigate("OrderSuccess")

                dispatch({
                    type: LOADING,
                    payload: false
                })

            })
            .catch(async error => {

                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: "error.500"
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
    }

    if (paymentSuccess) {
        return (
            <Box h={500} justifyContent="center" alignItems={"center"}>
                <Text>Payment Success</Text>
            </Box>
        )
    }

    return (
        <>

            <CommonBackground>
                <WebView
                    ref={webView}
                    originWhitelist={['*']}
                    source={{ html: html }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            </CommonBackground>
        </>
    )
}

export default Payment

const styles = StyleSheet.create({})