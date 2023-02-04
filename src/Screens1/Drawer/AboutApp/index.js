import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, useToast, ScrollView, Spinner } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutUs } from '../../../Redux/actions/settingsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";


const AboutApp = ({navigation}) => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const toast = useToast()

  const { aboutUs, loading, error } = useSelector(state => state.settings)

  useEffect(() => {
    
    dispatch(getAboutUs())
    
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
        <Heading label={t("AboutUs.abtUs")}/>
        

        </ScrollView>            
    </CommonBackground>
    </>
  )
}

export default AboutApp

const styles = StyleSheet.create({})