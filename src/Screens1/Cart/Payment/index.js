import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Box, HStack, ScrollView, Text, Icon, useDisclose } from 'native-base'

import { useTranslation } from "react-i18next";
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import reactotron from 'reactotron-react-native';
import { cartCheckoutResult } from '../../../Redux/actions/cartAction';


const Payment = ({navigation}) => {

  const { t } = useTranslation();
  const { width, height } = useWindowDimensions()
  const { checkoutPayment, addressId } = useSelector(state => state.cart)
  const { userData } = useSelector(state => state.auth)

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
            <script async src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutPayment.id}"></script>
            <form action="https://wordpresshyperpay.docs.oppwa.com/tutorials/integration-guide/customisation" class="paymentWidgets" data-brands="VISA MASTER AMEX MADA STC_PAY PAYPAL GOOGLEPAY"></form>

            
        </html>
  `;

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    reactotron.log({url})
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
        let data = {
            UserId: userData?.id,
            AddressId: addressId,
            id: checkoutPayment?.id,
            resourcePath: decodeURIComponent(params.resourcePath)
        }
        dispatch(cartCheckoutResult(data))
        // open a modal with the PDF viewer
      }
  }

  if(paymentSuccess){
    return(
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