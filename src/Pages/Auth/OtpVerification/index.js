import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, StatusBar, useToast, Spinner } from 'native-base'
import CommonButton from '../../../Components/CommonButton'
import CommonTitle from '../CommonTitle'
import CommonSubtitle from '../CommonSubtitle'
import Logo from '../../../Components/Logo'
import CommonLink from '../CommonLink'
import OtpInput from './OtpInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LOADING, RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../../Redux/actions/authAction'
import { useTranslation } from "react-i18next";
import customAxios from '../../../CustomAxios'


const OtpVerification = ({ navigation, route }) => {

	const { t } = useTranslation();

	const { email, phone, otpType, PhoneNumber } = route.params


	const dispatch = useDispatch();
	const toast = useToast();

	const { verifySuccess, error, loading, user } = useSelector(state => state.auth)



	useEffect(() => {
		if (verifySuccess) {
			toast.show({
				title: 'Success',
			})
			navigation.navigate('ResetPassword')
			dispatch({
				type: RESET_ERROR
			})
		}

		if (error) {
			toast.show({
				title: 'Error',
				description: error,
			})

			dispatch({
				type: RESET_ERROR
			})
		}
	}, [verifySuccess, error])


	const schema = yup.object({
	}).required();
	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = data => {
		let datas = {
			Email: email,
			Phone: PhoneNumber,
			otpType: otpType,
            otp: data.otp
		}
		verifyOTP(datas)
	};

	const verifyOTP = async(datas) => {
		dispatch({
			type: LOADING,
			payload: true
		})
		await customAxios.post(`verify-all-codes`, datas)
		.then(async response => {
			if(response.data === true){
				toast.show({
                    title : "Success",
                    description: "Registration success please login again to continue",
                    backgroundColor: "success.500"
                })
				navigation.navigate("SignIn")
	
			}
			else{
				toast.show({
                    title : "Error",
                    description: response.data,
                    backgroundColor: "error.500"
                })
			}
			dispatch({
				type: LOADING,
				payload: false
			})
		})
		.catch(async error => {
			toast.show({
				title : "Error",
				description: error,
				backgroundColor: "error.500"
			})
			dispatch({
				type: LOADING,
				payload: false
			})
		})
	}

	const resendOTP = async() => {
		let data = {
			Email: email,
			Phone: phone
		}

		let url = otpType === "Email" ? "resend-email-otps" : "resend-otps"

		dispatch({
			type: LOADING,
			payload: true
		})
		await customAxios.post(url, data)
		.then(async response => {
			
			dispatch({
				type: LOADING,
				payload: false
			})
		})
		.catch(async error => {
			toast.show({
				title : "Error",
				description: error,
				backgroundColor: "error.500"
			})
			dispatch({
				type: LOADING,
				payload: false
			})
		})
	}

	return (
		<>
			<StatusBar hidden={true} />

			<Box bg='#fff' flex={1} px={3}>
				<KeyboardAwareScrollView>
					<Box alignItems='center' mb={10}>
						<Logo />
						<CommonTitle label={t("OtpVerification.otpVer")} />
						<CommonSubtitle label={t("OtpVerification.enterOtp")} mt={2} />
					</Box>

					<OtpInput onchange={(text) => setValue("otp", text)} />

					<CommonLink
						onPress={resendOTP}
						text={t("OtpVerification.didntReceiv")}
						label={t("OtpVerification.resend")}
					/>

					{loading ? <Spinner /> : <CommonButton
						onPress={handleSubmit(onSubmit)}
						label={t("OtpVerification.verify")}
						mt={5}
					/>}
				</KeyboardAwareScrollView>
			</Box>

		</>

	)
}

export default OtpVerification

const styles = StyleSheet.create({})