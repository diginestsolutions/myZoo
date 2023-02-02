import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, useToast, FlatList, Spinner } from 'native-base'
import BiddingCard from './BiddingCard'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getMyBidding } from '../../Redux/actions/myItemsAction'
import { RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import CommonBackground from '../../Components/CommonBackground'
import Heading from '../../Components/Heading'


const MyBidding = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { myBidding, loading, error } = useSelector(state => state.myItems)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
        let data = {
            UserId: userData?.id,
        }
        dispatch(getMyBidding(data))
    
    }, [])

    // useEffect(() => {
    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //             type: RESET_ERROR
    //         })
    //     }
    // }, [error])
    
  const navigation = useNavigation();

   

    const renderItems = ({item}) => (
        <BiddingCard 
            item={item}
            onPress={()=>navigation.navigate('BidForItem',{ productId: item?.productid })}
        />
    )

  return (
    <>
   

        <CommonBackground>
                <Heading label={t("MyBidding.mBidding")}/>
                <FlatList 
                    data={myBidding}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />
                
        </CommonBackground>
    </>
  )
}

export default MyBidding

const styles = StyleSheet.create({})