import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Spinner, ScrollView, useToast } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getFaqs } from '../../../Redux/actions/settingsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";

const Faqs = ({navigation}) => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const toast = useToast()

  const { faqs, loading, error } = useSelector(state => state.settings)

  useEffect(() => {
    
    dispatch(getFaqs())
    
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

        <CommonBackground bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
            <ScrollView>
            <Heading label={t("FAQs.faq")}/>
            

            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default Faqs

const styles = StyleSheet.create({})