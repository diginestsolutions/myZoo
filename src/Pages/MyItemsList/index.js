import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useToast, HStack, ScrollView, FlatList, Spinner } from 'native-base'
import Heading from '../../Components/Heading'
import { useNavigation } from '@react-navigation/native'
import CommonBackground from '../../Components/CommonBackground'
import MyItemCard from './MyItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { getMyItemsList } from '../../Redux/actions/myItemsAction'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import customAxios from '../../CustomAxios'
import reactotron from 'reactotron-react-native'
import { isEmpty } from 'lodash'


const MyItemsList = ({}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { userData, loading } = useSelector(state => state.auth)
    const [itemsList, setItemsList] = useState([])

    reactotron.log({userData})
   

    useEffect(() => {
        
        getMyItemsList()
    
    }, [])

    const getMyItemsList = async() => {
        // let data = {
        //     IsAdminProduct : true,
        //     IsVendorProduct: false,
        //     IsIndividualSellerProduct: false,
        //     countryId: !isEmpty(userData?.Country) ? userData?.Country : '5fe321d2e9ce6f4494dd8b81'
        // }

        let data = {}

        if(userData?.UserType === 4){
            data = {
                IsIndividualSellerProduct : true,
                UserId: userData?.id
            }
        }
        else if(userData?.UserType === 2){
            data = {
                IsVendorProduct : true,
                UserId: userData?.id
            }
        }
        else{
            data = {
                IsAdminProduct : true
            }
        }

        reactotron.log({data})
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`user/items/_list_new`, data)  
        .then(async response => {
            setItemsList(response.data.data)
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: "Error",
                description: error,
                backgroundColor: "error.500"
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    

    const navigation = useNavigation();

    const renderItems = ({item}) => (
        <MyItemCard 
            item={item}
            onPress={()=>navigation.navigate('Item')}
            onRefresh={getMyItemsList}
        />
    )
  return (
    <>

        <CommonBackground>
                <Heading label={t("MyItemsList.mItemLst")}/>

                <FlatList 
                    data={itemsList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    refreshing={loading}
                    onRefresh={getMyItemsList}
                />

                
        </CommonBackground>
    </>
  )
}

export default MyItemsList

const styles = StyleSheet.create({})