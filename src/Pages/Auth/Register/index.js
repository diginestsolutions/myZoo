import { Alert, StyleSheet, useWindowDimensions } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import { Box, HStack, StatusBar, Checkbox, useToast, Spinner, Image, Pressable, Icon, Text } from 'native-base'
import CommonInput from '../../../Components/CommonInput'
import CommonButton from '../../../Components/CommonButton'
import CommonTitle from '../CommonTitle'
import CommonSubtitle from '../CommonSubtitle'
import Logo from '../../../Components/Logo'
import CommonLink from '../CommonLink'
import PhoneInput from 'react-native-phone-number-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { RESET_AUTH } from '../../../Redux/constants/authConstant'
import { getSettings, registerUser } from '../../../Redux/actions/authAction'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../config/Constants'
import reactotron from '../../../ReactotronConfig'
import { LOADING } from '../../../Redux/constants/homeConstant'
import customAxios from '../../../CustomAxios'

const Register = ({navigation}) => {

    const { t } = useTranslation();

    const [toggleCheckBox, setToggleCheckBox] = useState('');


    const phoneInput = useRef(null);

    const { width, height } = useWindowDimensions()


  const dispatch = useDispatch();
  const toast = useToast()  
  
  const { registerSuccess, loading, error, selectedCountry, userData } = useSelector(state => state.auth)
  const { count } = useSelector(state => state.cart)


//   reactotron.log({userData})

  useEffect(() => {
        if(error){

            toast.show({
                title: error,
                // description : error
            })
            dispatch({
                type: RESET_AUTH        
            })
        
        }    
        if(registerSuccess){
            
            toast.show({
                title: 'Success',
                description: "Registered Successfully"
            })
            dispatch({
                type: RESET_AUTH        
            })
            navigation.navigate('SignIn')
        }
    }, [error, registerSuccess])

    // useEffect(() => {

    //     let data ={
    //         UserId: '605cf56583e7ee5991568835'
    //     }

    //     dispatch(getSettings(data))
    // }, [])


    const schema = yup.object({   
        Name: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.number().required(),
        password: yup.string().required('New Password is required'),
        ConfirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords does not match'),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        if(toggleCheckBox){
            
            let datas={
                PhoneNumber: `${selectedCountry?._id ? selectedCountry?.CountryCode : '+966'}${data.Phone}`,
                Name: data.Name,
                Phone: data.Phone,
                Email: data.Email,
                ConfirmPassword: data.ConfirmPassword,
                countryId: selectedCountry?._id ? selectedCountry?._id : "5fe321d2e9ce6f4494dd8b81",
            }

            if(count?.RegistrationOtp){
                datas.otpType= "Email"
            }

            reactotron.log({datas})
            registerUser(datas)
        }else{

            toast.show({
                title: 'check',
                // description : error
            })

        }
        
    };

    const registerUser = async(datas) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`mobile_register`, datas)
        .then(async response => {
            if(response?.data?.status){
                navigation.navigate("OtpVerification", { 
                    email: datas?.Email, 
                    phone: datas?.Phone, 
                    otpType: datas?.otpType, 
                    PhoneNumber: datas?.PhoneNumber 
                })
            }
            else{
                toast.show({
                    title : "Error",
                    description: response.data.msg,
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

  return (
    <>
    <StatusBar hidden={true}/> 

        <Box bg='#fff' flex={1} px={3}>
            <KeyboardAwareScrollView> 

            <Box alignItems='center'>
                <Logo/>
                <CommonTitle label={t("SignUp.signUp")}/>
                <CommonSubtitle label={t("SignUp.letsCrtAcc")}/>
            </Box>
            
            <CommonInput 
                control={control}
                error={errors.Name}
                fieldName="Name" 
                placeholder={t("SignUp.name")} mt={5}
                height={45}

            />

            {/* <Box mt={3}>

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    containerStyle={styles.phoneContainer}
                    countryPickerButtonStyle={styles.flagContainer}
                    textContainerStyle={styles.textInput}
                    onChangeFormattedText={text => {
                        setPhoneNumber(text);
                    }}
                    defaultCode="IN"
                    layout='first'
                    // autoFocus
                />

            </Box> */}

            <Box flex={1} justifyContent='space-between' mt={5}>
                
                <Pressable 
                    onPress={()=>navigation.navigate('SelectCountry')}
                    borderWidth={1} borderColor='#00000035'
                    justifyContent={'center'} width={120}
                    flexDir='row' alignItems={'center'}
                    borderRadius={4}
                    minH={45}
                >   
                <>
                {selectedCountry ? <Image source={{ uri: `${IMAGE_URL}${selectedCountry?.Flag?.UploadedFileName}` }} size={10} alt='name' resizeMode='contain'/> : <Image source={require('../../../Images/sa.png')} size={10} alt='name' resizeMode='contain'/>}
                {selectedCountry ? <Text fontWeight={400} fontSize={14}  color='#B4B4B4' px={1}> {selectedCountry?.CountryCode}</Text> : <Text fontWeight={400} fontSize={14}  color='#B4B4B4' mx={1} >+966</Text>}
                    <Icon as={<Ionicons />} name={'chevron-down'} color="#535353" size={5} />
                </>
                    
                
                </Pressable>
                <CommonInput 
                    control={control}
                    error={errors.Phone}
                    fieldName="Phone" 
                    placeholder={t("SignUp.phNo")}
                    width={width-151}
                    height={45}
                    mt={-45} ml={127}
                />
            </Box>

            <CommonInput 
                control={control}
                error={errors.Email}
                fieldName="Email" 
                placeholder={t("SignUp.EmailAddr")}
                keyboardType='email-address'
                mt={3}
                height={45}

            />

            <CommonInput 
                control={control}
                error={errors.password}
                fieldName="password" 
                placeholder={t("SignUp.pswd")}
                iconName='eye-outline' 
                inputType='password' 
                mt={3}
                height={45}
            />

            <CommonInput 
                control={control}
                error={errors.ConfirmPassword}
                fieldName="ConfirmPassword" 
                placeholder={t("SignUp.cnfrmPswd")}
                iconName='eye-outline' 
                inputType='password' 
                mt={3}
                height={45}
            />

            <HStack mt={8} justifyContent='space-between' >
                <Checkbox value={toggleCheckBox} colorScheme="info" onChange={(newValue) => setToggleCheckBox(newValue)}>
                <Box w={'90%'} mt={-1}>
                    <CommonSubtitle label={t("SignUp.agreeTrmsCndtn")}/>
                </Box>
                </Checkbox>
                
            </HStack>

            {loading? <Spinner/> : <CommonButton 
                onPress={toggleCheckBox ?  handleSubmit(onSubmit) : null}
                label={t("SignUp.snUp")}
                mt={2}
                bg={toggleCheckBox ? {
                    linearGradient: {
                      colors: ['#008ECC', '#00B2FF'],
                      start: [0, 0],
                      end: [1, 0],
                    },
                  } : 'gray.100'}
            />}

            <CommonLink 
                onPress={()=>navigation.navigate('SignIn')}
                text={t("SignUp.alrdyAcc")}
                label={t("SignUp.lgHere")}
                alignSelf={'center'}
            />
            </KeyboardAwareScrollView>
        </Box>

    
    </>
    
  )
}

export default Register

const styles = StyleSheet.create({
    phoneContainer: {
        width: '99.5%',
        height: 47,
        backgroundColor: 'white',
        
        borderColor: '#bfbfbf',
        marginLeft:1.8,
        
    },
    textInput: {
        paddingVertical: 0,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor:'#bfbfbf',
        marginRight:1
    },
    flagContainer: {
        borderWidth: 0.5,
        borderColor:'#bfbfbf',
        marginRight:10
    }
})