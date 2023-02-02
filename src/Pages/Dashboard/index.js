import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, ScrollView, Spinner } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import MyzooPicks from './MyZooPicks'
import Categories from './Categories'
import Pets from './Pets'
import { useTranslation } from "react-i18next";
//import { getDashboardDatas } from '../../Redux/actions/homeAction';
import { isEmpty } from 'lodash'
import Accessories from './Accessories';
import Services from './Services';
import Vendors from './Vendors';
import LatestAccessories from './LatestAccessories';
import LatestServices from './LatestServices';
//import { getMyFavourite } from '../../Redux/actions/myItemsAction';


const Dashboard = ({navigation}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.auth)


    // useEffect(() => {
    //     let data = {
    //         countryId: !isEmpty(userData?.Country) ? userData?.Country : '5fe321d2e9ce6f4494dd8b81'
    //     }
    //     dispatch(getDashboardDatas(data))
    // }, [])

    // useEffect(() => {
    //     if(userData?.Country){
    //         let data = {
    //             countryId: !isEmpty(userData?.Country) ? userData?.Country : '5fe321d2e9ce6f4494dd8b81'
    //         }
    //         dispatch(getDashboardDatas(data))
    //     }
    // }, [userData?.Country])
    
    

    return (
        <>
            <ScrollView bg='#fff' flex={1} showsVerticalScrollIndicator={false} pt={5}>
                <Categories/>
                <Box height={0.5} bg={'#E0E0E0'} my={2}/>
                <MyzooPicks label={t("Dashboard.mzPicks")}/>
                <Pets label={t("Dashboard.pet")}/>
                {/* <LatestAccessories label={t("Dashboard.accessories")} />
                <LatestAccessories label={t("Dashboard.ser")} /> */}
                <Accessories label={t("Dashboard.acc")}/>
                <LatestServices label= {t("Dashboard.ser")}/>
                <Vendors label= {t("Dashboard.vend")}/>
            </ScrollView>


        </>
    
    )
}

export default Dashboard

const styles = StyleSheet.create({})