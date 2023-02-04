import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, ScrollView, Text, useToast, Image } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonTextIcon from './CommonTextIcon'
import CommonBackground from '../../Components/CommonBackground'
import ProfileDp from './ProfileDp'
import { useTranslation } from "react-i18next";
import { getUserProfile } from '../../Redux/actions/settingsAction'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../config/Constants'
import reactotron from 'reactotron-react-native'


const Profile = ({navigation}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { userData, userProfile, profileSuccess } = useSelector(state => state.auth)

    reactotron.log({userProfile})

    // useEffect(() => {

        
    // }, [profileSuccess, userProfile])

  const { t } = useTranslation();

  return (
    <>
    <CommonBackground>
        <ScrollView>
            <Box alignItems={'center'} borderBottomColor='#B4B4B4' borderBottomWidth={0.5} pb={5}>
                <Text color={'#008ECC'} mt={5} fontSize={19} fontWeight={500}>{t("Profile.profile")}</Text>
                <ProfileDp 
                    fName={userProfile?.FirstName} lName={userProfile?.LastName}
                >
                    <Image                
                        source={{uri: userProfile?.Image?.[0]?.UploadedFileName }} 
                        h={100} w={100} alt="image" borderRadius={50} mt={2}
                    />
                </ProfileDp>
            </Box> 

            <Box p={4}>
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('EditProfile')}
                    text={t("Profile.editProfile")}
                    icon={<FontAwesome name="user-circle-o"/>} 
                    topRad={5} top={2} iconName="right"
                    boderBottomWidh={0}
                />

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('DeliveryAddress')}
                    text={t("Profile.delAddr")}
                    icon={<MaterialCommunityIcons name="note-text-outline"/>}
                    iconName="right"
                    boderBottomWidh={0}
                />

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('ChangePassword')}                    
                    text={t("Profile.changePswd")}
                    icon={<MaterialCommunityIcons name="lock" />}
                    iconName="right"
                    boderBottomWidh={0}

                />

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('PublicProfile')}
                    text={t("Profile.pubPro")}
                    icon={<FontAwesome name="user-circle-o"/>} 
                    bottomRad={5}
                    iconName="right"

                />

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('Faqs')}                 
                    text={t("Profile.faq")}
                    icon={<Octicons name="question"/>}
                    topRad={5} top={4}
                    iconName="right"
                    boderBottomWidh={0}
                /> 

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('ContactUs')}
                    text={t("Profile.contact")}
                    icon={<MaterialIcons name="perm-phone-msg"/>} 
                    bottomRad={5}
                    iconName="right"
                /> 
                
                <CommonTextIcon 
                    onPress={()=>navigation.navigate('TermsAndPrivacyPolicy')}                
                    text={t("Profile.termsNprivacy")}
                    icon={<FontAwesome5  name="clipboard-check"/>} 
                    topRad={5} top={4}
                    iconName="right"
                    boderBottomWidh={0}
                /> 

                <CommonTextIcon                
                    onPress={()=>navigation.navigate('AboutApp')}                
                    text={t("Profile.abtApp")}
                    icon={<MaterialCommunityIcons  
                    name="information-outline"/>} 
                    bottomRad={5}
                    iconName="right"
                />
               
            </Box>    



        </ScrollView>        
    </CommonBackground>


    </>
  )
}



export default Profile

const styles = StyleSheet.create({})