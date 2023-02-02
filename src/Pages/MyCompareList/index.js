import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, ScrollView, Text, FlatList, Spinner, useToast, HStack } from 'native-base'
import Heading from '../../Components/Heading'
import CompareTable from './CompareTable'
import CommonBackground from '../../Components/CommonBackground'
import CompareListCard from './CompareListCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompareList, getCompareList } from '../../Redux/actions/myItemsAction'
import { useTranslation } from "react-i18next";
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'


const MyCompareList = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const [compareList, setCompareList] = useState([])

    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        getompareList()
    }, [])

    const getompareList = async() => {

        let data = {
            UserId: userData?.id,
            countryId : userData?.Country,
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`home/comparisonlist`, data)  
        .then(async response => {

            setCompareList(response.data);
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.500' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }


    const deleteItem = async (data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/Mob_products/_deletecomparelist`, data)  
        .then(async response => {
            
            getompareList();
            toast.show({
                title: 'Success',
                description: 'Deleted successfully',
                backgroundColor: 'success.400'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.500' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    


    const renderItems = ({item}) => (
        <CompareListCard 
            item={item}
            deleteProduct={(data) => deleteItem(data)}
        />
    )

return (
    <>
  
    <CommonBackground>
        <Heading label={t("CompareItems.compItms")}/>
        <Box bg={'blue.200'} >
            <Text color={'gray.600'} fontWeight={200} fontSize={16} textAlign='center' p={2}>{t("CompareItems.allTheDiff")}</Text>
        </Box>
        <ScrollView>   

            <FlatList 
                data={compareList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <>
                
                <CompareTable mt={141}/>
                </>}
            />
         </ScrollView>  
    </CommonBackground>
</>
  )
}

export default MyCompareList

const styles = StyleSheet.create({})