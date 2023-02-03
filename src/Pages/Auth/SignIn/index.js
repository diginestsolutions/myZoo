import { StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Box, HStack, StatusBar, Spinner, CheckIcon, useToast, } from 'native-base'
import CommonInput from '../../../Components/CommonInput'
import CommonSingnInButton from './CommonSingnInButton'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CommonButton from '../../../Components/CommonButton'
import Divider from 'react-native-divider';
import LinkForgotpswd from './LinkForgotpswd'
import CommonTitle from '../CommonTitle'
import CommonSubtitle from '../CommonSubtitle'
import Logo from '../../../Components/Logo'
import CommonLink from '../CommonLink'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { RESET_AUTH } from '../../../Redux/constants/authConstant'
import { loginUser } from '../../../Redux/actions/authAction'
import { useTranslation } from "react-i18next";
import { getDashboardDatas } from '../../../Redux/actions/homeAction'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import reactotron from 'reactotron-react-native'
import LoadingContext from '../../../context/loading'
import customAxios from '../../../CustomAxios'
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';


const SignIn = ({ navigation }) => {

    const { t } = useTranslation();
    GoogleSignin.configure();

    const dispatch = useDispatch();
    const toast = useToast()

    const context = useContext(LoadingContext)

    const { loginSuccess, loading, error, userData } = useSelector(state => state.auth)

    const googlesignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            reactotron.log(userInfo)
            registerGoogleUser(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };



    const registerGoogleUser = async (userInfo) => {
        context.setLoading(true)
        let data = {
            "tokenId": userInfo?.idToken
        }
        await customAxios.post(`/mobileapp/googleAuth`, data)
            .then(async response => {
                context.setLoading(false)
            })
            .catch(async error => {
                context.setLoading(false)
                toast.show({
                    title: "Error",
                    description: error,
                    backgroundColor: "error.500"
                })


            });
    }

    const loginWithFacebook = () => {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login.isCancelled) {
                    reactotron.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        reactotron.log({accessToken});
                    });
                }
            },
            error => {
                console.log('Login fail with error: ' + error);
            },
        );
    };


    useEffect(() => {
        if (error) {
            toast.show({
                title: 'Error',
                description: error
            })
            dispatch({
                type: RESET_AUTH
            })
        }
        if (loginSuccess) {

            toast.show({
                title: 'Success',
                description: "Login Success"
            })
            dispatch(getDashboardDatas(userData?.Country))

            dispatch({
                type: RESET_AUTH
            })

            navigation.navigate('Menu')
        }
    }, [error, loginSuccess])


    const schema = yup.object({
        username: yup.string().required("Email/Phone number required"),
        password: yup.string().required("Password is required"),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        let datas = {
            ...data
        }
        dispatch(loginUser(data))
    };

    return (
        <>
            <StatusBar hidden={true} />

            <Box bg='#fff' flex={1} px={3}>
                <KeyboardAwareScrollView>

                    <Box alignItems='center'>
                        <Logo />
                        <CommonTitle label={t("Login.welcome")} />
                        <CommonSubtitle label={t("Login.signInYrAcc")} />
                    </Box>

                    <CommonInput

                        control={control}
                        error={errors.username}
                        fieldName="username"
                        placeholder={t("Login.emailOrPh")} mt={5}
                        height={45}
                    />

                    <CommonInput
                        control={control}
                        error={errors.password}
                        fieldName="password"
                        placeholder={t("Login.pswd")}
                        inputType={'password'} mt={2}
                        height={45}
                    />

                    <LinkForgotpswd
                        onPress={() => navigation.navigate('ForgotPassword')}
                        label={t("Login.fgtPswd")}
                    />

                    <CommonButton
                        label={t("Login.signIn")}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <Divider borderColor="#D9D8D8" color="#008ECC" orientation="center" >
                        {t("Login.or")}
                    </Divider>

                    <CommonSingnInButton
                        onPress={googlesignIn}
                        label={t("Login.signGoogle")}
                        labelColor='#34A853'
                        icon={<Ionicons name={'logo-google'} />}
                    />
                    <CommonSingnInButton
                        onPress={loginWithFacebook}
                        label={t("Login.signFb")}
                        labelColor='#3972AA' ml={1}
                        icon={<Fontisto name={'facebook'} />}
                    />

                    <CommonSingnInButton
                        // onPress={}
                        label={t("Login.signTwitter")}
                        labelColor='#1FA1F1'
                        icon={<Ionicons name={'logo-twitter'} />}
                    />

                    <CommonLink
                        onPress={() => navigation.navigate('Register')}
                        text={t("Login.dntHaveAcc")}
                        label={t("Login.sgnUpHere")}
                        alignSelf={'center'}
                    />

                </KeyboardAwareScrollView>
            </Box>



        </>

    )
}

export default SignIn

const styles = StyleSheet.create({})