import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useToast, FlatList, ScrollView, Text } from 'native-base'
import MembershipCard from './MembershipCard'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonBackground from '../../../Components/CommonBackground'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getMembershipList } from '../../../Redux/actions/myItemsAction'
import { IMAGE_URL } from '../../../config/Constants'


const MyMembershipPlans = ({navigation}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toast = useToast()

    const { memshpList, error } = useSelector(state => state.myItems)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        let data = {
            Type: "1",
            UserId: userData?.id,
        }
        dispatch(getMembershipList(data))
    
    }, [])


    const renderItems = ({item}) => {
        
        return(
            <MembershipCard 
                img={{uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}`}}
                title={item?.Name}
                point1={item?.Conditions?.[0]?.Condition}
                point2={item?.Conditions?.[1]?.Condition}
                point3={item?.Conditions?.[2]?.Condition}
                month={item?.Duration}
                type={item?.Price}
                label={item?.IsActive ? "Active" : "Buy Now"}
            />
        )
    }


  return (
    <>
       
        <CommonBackground>
            <Heading label={t("MyMembershipPlans.mMemShpNPlan")} />

            <FlatList 
                p={3}
                data={memshpList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
            />

           
            
        </CommonBackground>
    </>
  )
}

export default MyMembershipPlans

const styles = StyleSheet.create({})