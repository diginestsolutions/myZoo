import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import { useToast, HStack, ScrollView, FlatList, Spinner } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import FavCard from './FavCard'
import { useNavigation } from '@react-navigation/native'
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { getMyFavourite } from '../../../Redux/actions/myItemsAction'
import { useTranslation } from "react-i18next";
import reactotron from 'reactotron-react-native'


const MyFavourites = ({}) => {

    const { t } = useTranslation();

    const navigation = useNavigation();


    const dispatch = useDispatch();
    const toast = useToast()

    const { myFavourite, loading, error } = useSelector(state => state.myItems)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        reactotron.log({userData})
        let data = {
            UserId: userData?.id,
	        countryId: userData?.Country
        }
        dispatch(getMyFavourite(data))
    
    }, [])

    // useEffect(() => {
    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //             type: RESET_ERROR
    //         })
    //     }
    // }, [error])
    

    const renderItems = ({item}) => (
        <FavCard 
            item={item}
        />
    )

  return (
    <>
    
            <CommonBackground>
                <Heading label={t("MyFavourites.mFav")}/>

                <FlatList 
                    data={myFavourite}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />

                
        </CommonBackground>
    </>
  )
}

export default MyFavourites

const styles = StyleSheet.create({})