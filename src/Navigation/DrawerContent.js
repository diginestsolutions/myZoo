import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Box, ScrollView, Select, Center, HStack, Icon } from 'native-base'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ListItem from '../Components/ListItem'
import { useDispatch, useSelector } from 'react-redux'
import SelectInput from '../Components/SelectInput'
import { useTranslation } from "react-i18next";
import Logo from '../Components/Logo'
import SelectLanguage from '../Pages/Language/SelectLanguage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGOUT, RESET_USER } from '../Redux/constants/authConstant'
import ConfirmationModal from '../Components/ConfirmationModal'
import { CommonActions, DrawerActions } from '@react-navigation/native';


const DrawerContent = ({navigation}) => {

const [showModal, setShowModal] = useState(false);

const { userData } = useSelector(state => state.auth)



const [language, setLanguage] = useState("");

const { t } = useTranslation();

const { selectedCurrency } = useSelector(state => state.myItems)


const dispatch = useDispatch();


const logout = async() =>{
    navigation.dispatch(DrawerActions.toggleDrawer())
    CommonActions.reset()

    navigation.navigate('HomeNav')
    
    await AsyncStorage.clear()

    dispatch({
        type: RESET_USER
    })
    

}


    return (
        <ScrollView paddingBottom={10} showsVerticalScrollIndicator={false}>
            <HStack alignItems='center' mt={-8}  px={4} mb={-5}>
                <Icon as={<Fontisto />} name={"angle-left"} color="#B4B4B4" size={7} flex={0.6} onPress={()=>navigation.goBack()}/> 
                <Logo/>
            </HStack>
            <ListItem 
                text={t("Drawer.mOrder")}  
                icon={<Octicons/>} 
                iconName='stack' 
                onPress={userData?.id ? ()=>navigation.navigate('MyOrder') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.mWishlist")} 
                icon={<MaterialIcons/>} 
                iconName='list-alt' 
                onPress={userData?.id ? ()=>navigation.navigate('MyWishlist') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.mFav")} 
                icon={<Octicons/>} 
                iconName='heart-fill'
                onPress={userData?.id ? ()=>navigation.navigate('MyFavourites') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.mBid")}  
                icon={<FontAwesome/>} 
                iconName='circle'
                onPress={userData?.id ? ()=>navigation.navigate('MyBidding') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.mItemLst")}  
                icon={<MaterialCommunityIcons/>} 
                iconName='note-text-outline'
                onPress={userData?.id ? ()=>navigation.navigate('MyItemsList') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.mCompLst")}   
                icon={<MaterialCommunityIcons/>} 
                iconName='note-text-outline'
                onPress={userData?.id ? ()=>navigation.navigate('MyCompareList') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.mMemShpPln")}  
                marginTop={8} 
                icon={<MaterialCommunityIcons/>} 
                iconName='wallet-membership'
                onPress={userData?.id ? ()=>navigation.navigate('MyMembershipPlans') : () => navigation.navigate("SignIn")}
            />            
            <ListItem 
                text={t("Drawer.currency")}  
                marginTop={8} 
                rightText={selectedCurrency?.CurrencyCode}
                icon={<FontAwesome/>} 
                iconName='dollar'
                onPress={()=>navigation.navigate('Currency')}
            />
            {/* <ListItem 
                text={t("Drawer.lang")} 
                rightText='ENG' 
                icon={<FontAwesome5/>} 
                iconName='language'
            /> */}

            <SelectLanguage
                text={t("Drawer.lang")} 
                rightText='ENG' 
                icon={<FontAwesome5/>} 
                iconName='language'
            /> 


            <ListItem 
                text={t("Drawer.faq")} 
                icon={<Ionicons/>} 
                iconName='ios-help-circle'
                onPress={()=>navigation.navigate('Faqs')}
            />
            <ListItem 
                text={t("Drawer.contact")}
                icon={<MaterialIcons/>} 
                iconName='perm-phone-msg'
                onPress={()=>navigation.navigate('ContactUs')}
            />
            <ListItem 
                text={t("Drawer.profile")}
                icon={<FontAwesome5/>} 
                iconName='user-alt'
                onPress={userData?.id ? ()=>navigation.navigate('Profile') : () => navigation.navigate("SignIn")}
            />
            <ListItem 
                text={t("Drawer.termsNprivacy")} 
                icon={<MaterialCommunityIcons/>} 
                iconName='clipboard-check-outline'
                onPress={()=>navigation.navigate('TermsAndPrivacyPolicy')}
            />
            <ListItem 
                text={t("Drawer.abtApp")}
                icon={<MaterialIcons/>} 
                iconName='info'
                onPress={()=>navigation.navigate('AboutApp')}
            />           
            
            <ListItem 
                text={userData?.id ? t("Drawer.signOut") : t("Drawer.signin")}
                icon={<FontAwesome/>} 
                iconName='sign-out'
                // onPress={()=>logout()}
                onPress={ userData?.id ? ()=>setShowModal(true) : () => navigation.navigate('SignIn')}
                mb={8}
            />

            <ConfirmationModal 
                yes={()=> {
                    logout()
                    setShowModal(false)
                }}
                no={()=> setShowModal(false)}
                isVisible={showModal} 
                onClose={() => setShowModal(false)}
            />

            
        </ScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({})