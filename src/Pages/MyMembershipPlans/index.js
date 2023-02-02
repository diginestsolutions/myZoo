import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useToast, FlatList } from 'native-base'
import MembershipCard from './MembershipCard'
import Heading from '../../Components/Heading'
import CommonBackground from '../../Components/CommonBackground'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getMembershipList } from '../../Redux/actions/myItemsAction'
import { IMAGE_URL } from '../../config/Constants'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'


const MyMembershipPlans = ({ navigation }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toast = useToast()

    const [memshpList, setMemshpList] = useState([])
    const [userMemberShip, setUserMemberShip] = useState(null)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {

        getMemberShipLists()
        getCurrentUserMemberShipDetails()
    }, [])


    const getMemberShipLists = async () => {

        let data = {
            Type: "1",
            UserId: userData?.id,
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`seller/membership/_list`, data)
            .then(async response => {

                setMemshpList(response.data)

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {

                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: 'error.400'
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
    }

    const getCurrentUserMemberShipDetails = async() => {
        let data ={
            "UserId": userData?.id
        }

        await customAxios.post(`user/membership/_plandetails`, data)
        .then(async response => {

            setUserMemberShip(response.data.data)
        })
        .catch(async error => {
        });
    }


    const renderItems = ({ item }) => {

        return (
            <MembershipCard
                item={item}
                label={userMemberShip?._id === item?._id ? "Active" : "Buy Now"}
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