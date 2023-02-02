import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Spinner, ScrollView, useToast } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getPrivacyPolicy } from '../../../Redux/actions/settingsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";


const TermsAndPrivacyPolicy = ({navigation}) => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const toast = useToast()

  const { privacyPolicy, loading, error } = useSelector(state => state.settings)

  useEffect(() => {
    
    dispatch(getPrivacyPolicy())
    
  }, [])
  

  useEffect(() => {

    if(error){
        toast.show({ title: 'Error', description: error })
        dispatch({
        type: RESET_ERROR
        })
    }

  }, [error])

  return (
    <>
  
        <CommonBackground>
            <ScrollView>
            <Heading label={t("TermsPrivacyPolicy.termsNprPol")}/>
            

            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default TermsAndPrivacyPolicy

const styles = StyleSheet.create({})