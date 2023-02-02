import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Spinner, ScrollView, useToast } from 'native-base'
import Heading from '../../Components/Heading'
import CommonBackground from '../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getPrivacyPolicy } from '../../Redux/actions/settingsAction'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import { WebView } from 'react-native-webview';
import customAxios from '../../CustomAxios'


const TermsAndPrivacyPolicy = ({ navigation }) => {

	const { t } = useTranslation();
	const { width, height } = useWindowDimensions()


	const dispatch = useDispatch();
	const toast = useToast()
	const [privacyPolicy, setPrivacyPolicy] = useState(null)

	useEffect(() => {

		getPrivacyPolicy()

	}, [])

	const getPrivacyPolicy = async() => {
		dispatch({
			type: LOADING,
			payload: true
		})

		await customAxios.post(`Front_End/Mob_products/_privacy`)
			.then(async response => {

				setPrivacyPolicy(response.data.data)

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

	var html = `
        <html>
        <head>
        <style>
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        </head>
		<body>
		<p>${privacyPolicy?.[0]?.LanguageData?.[1]?.Content}</p>
		</body>
            
        </html>
  `;



	return (
		<>

			<CommonBackground>
				<ScrollView>
					<Heading label={t("TermsPrivacyPolicy.termsNprPol")} />
					<WebView
						source={{ html: html }}
						style={{ flex: 1, height: height -200 }}
					/>

				</ScrollView>

			</CommonBackground>
		</>
	)
}

export default TermsAndPrivacyPolicy

const styles = StyleSheet.create({})