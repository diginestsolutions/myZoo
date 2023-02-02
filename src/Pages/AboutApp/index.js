import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, useToast, ScrollView, Spinner } from 'native-base'
import Heading from '../../Components/Heading'
import CommonBackground from '../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutUs } from '../../Redux/actions/settingsAction'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import { WebView } from 'react-native-webview';
import customAxios from '../../CustomAxios'


const AboutApp = ({ navigation }) => {

	const { t } = useTranslation();
	const { width, height } = useWindowDimensions()


	const dispatch = useDispatch();
	const toast = useToast()

	const [aboutUs, setAboutUs] = useState(null)

	useEffect(() => {

		getAboutUs();

	}, [])

	const getAboutUs = async() => {
		dispatch({
			type: LOADING,
			payload: true
		})
	
		await customAxios.post(`Front_End/Mob_products/_aboutUs`)  
		.then(async response => {

			setAboutUs(response.data.data)
	
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
		<p>${aboutUs?.[0]?.LanguageData?.[1]?.Content}</p>
		</body>
            
        </html>
  `;


	return (
		<>

			<CommonBackground>
				<ScrollView>
					<Heading label={t("AboutUs.abtUs")} />
					<WebView
						source={{ html: html }}
						style={{ flex: 1, height: height -200 }}
					/>

				</ScrollView>
			</CommonBackground>
		</>
	)
}

export default AboutApp

const styles = StyleSheet.create({})