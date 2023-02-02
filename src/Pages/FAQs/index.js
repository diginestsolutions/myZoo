import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Text, ScrollView, useToast } from 'native-base'
import Heading from '../../Components/Heading'
import CommonBackground from '../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getFaqs } from '../../Redux/actions/settingsAction'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import customAxios from '../../CustomAxios'
import { WebView } from 'react-native-webview';


const Faqs = ({ navigation }) => {

	const { width, height } = useWindowDimensions()
	

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const toast = useToast()

	const [faqs, setFaqs] = useState('')

	const { loading, error } = useSelector(state => state.settings)

	useEffect(() => {

		getFaqs()

	}, [])

	const getFaqs = async () => {
		dispatch({
			type: LOADING,
			payload: true
		})

		await customAxios.post(`Front_End/Mob_products/_faq`)
			.then(async response => {
				setFaqs(response.data.data)

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
		<p>${faqs?.[0]?.LanguageData?.[1]?.Content}</p>
		</body>
            
        </html>
  `;


	return (
		<>

			<CommonBackground bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
				<ScrollView>
					<Heading label={t("FAQs.faq")} />
					<WebView
						source={{ html: html }}
						style={{ flex: 1, height: height -200 }}
					/>
				</ScrollView>

			</CommonBackground>
		</>
	)
}

export default Faqs

const styles = StyleSheet.create({})