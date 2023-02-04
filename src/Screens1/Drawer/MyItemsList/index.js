import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import { useToast, HStack, ScrollView, FlatList, Spinner } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import { useNavigation } from '@react-navigation/native'
import CommonBackground from '../../../Components/CommonBackground'
import MyItemCard from './MyItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { getMyItemsList } from '../../../Redux/actions/myItemsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";


const MyItemsList = ({}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { myItemList, loading, error } = useSelector(state => state.myItems)
   

    useEffect(() => {
        
        dispatch(getMyItemsList())
    
    }, [])

    useEffect(() => {
        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [error])
    

    const navigation = useNavigation();

    const renderItems = ({item}) => (
        <MyItemCard 
            item={item}
            onPress={()=>navigation.navigate('Item')}
        />
    )
  return (
    <>

        <CommonBackground>
                <Heading label={t("MyItemsList.mItemLst")}/>

                <FlatList 
                    data={myItemList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />

                
        </CommonBackground>
    </>
  )
}

export default MyItemsList

const styles = StyleSheet.create({})