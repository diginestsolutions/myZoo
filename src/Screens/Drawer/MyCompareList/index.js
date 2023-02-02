import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, ScrollView, Text, FlatList, Spinner, useToast, HStack } from 'native-base'
import Heading from '../../../Components/Heading'
import Header from '../../../Components/Header'
import CompareTable from './CompareTable'
import CommonBackground from '../../../Components/CommonBackground'
import CompareListCard from './CompareListCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompareList, getCompareList } from '../../../Redux/actions/myItemsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { RESET_ITEM } from '../../../Redux/constants/myItemsConstant'
import { useTranslation } from "react-i18next";


const MyCompareList = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { compareList, loading, error, deleteCompare } = useSelector(state => state.myItems)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        if(deleteCompare){

            let data = {
                UserId: userData?.id,
                countryId : userData?.Country,
            }
            dispatch(getCompareList(data))

            toast.show({ title: deleteCompare?.msg})

        }
        else{

            let data = {
                UserId: userData?.id,
                countryId : userData?.Country,
            }
            dispatch(getCompareList(data))

        }
     
    }, [deleteCompare])

    useEffect(() => {
        // if(error){
        //     toast.show({ title: 'Error', description: error })
        //     dispatch({ 
        //         type: RESET_ERROR
        //     })
        // }
        
    }, [error])


    const renderItems = ({item}) => (
        <CompareListCard 
            item={item}
            
        />
    )

return (
    <>
  
    <CommonBackground>
    <Heading label={t("CompareItems.compItms")}/>
    <ScrollView p={3}>
        <Box bg={'blue.200'} >
            <Text color={'gray.600'} fontWeight={200} fontSize={16} textAlign='center' p={2}>{t("CompareItems.allTheDiff")}</Text>
        </Box>

        <ScrollView  horizontal={true} mt={5}>

            {compareList===0 ? <Box ><Text >No Items found !!!</Text></Box> : <CompareTable mt={141}/>}

            <FlatList 
                data={compareList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

        </ScrollView>

        </ScrollView>
          
    </CommonBackground>
</>
  )
}

export default MyCompareList

const styles = StyleSheet.create({})