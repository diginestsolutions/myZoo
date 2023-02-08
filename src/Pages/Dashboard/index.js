import { StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import customAxios from '../../CustomAxios';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import LoadingContext from '../../context/loading';
//import { getMyFavourite } from '../../Redux/actions/myItemsAction';


const Dashboard = ({navigation}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.auth)
    const context = useContext(LoadingContext)

    const [datas, setDatas] = useState(null)
    const [myZoo, setMyZoo] = useState([])
    const [pets, setPets] = useState([])
    const [accessories, setAccessary] = useState([])
    const [services, setServices] = useState([])


    useEffect(() => {
        getDashboardDatas()
    }, [])
    


    // useEffect(() => {
    //     let data = {
    //         countryId: !isEmpty(userData?.Country) ? userData?.Country : '5fe321d2e9ce6f4494dd8b81'
    //     }
         //dispatch(getDashboardDatas(data))
    // }, [])

    useEffect(() => {
        if(userData?.Country){
            getDashboardDatas()
        }
    }, [userData?.Country])

    const getDashboardDatas = () => {
        context.setLoading(true)
        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country : "5fe321d2e9ce6f4494dd8b81"
        }
        const myZooPicks = 'home/myzoopick';
        const pets = "customer/home/latestpets";
        const accessories = "customer/home/latestaccessories"
        const latestServices = "customer/home/latestservices"

        const requestOne = customAxios.post(myZooPicks, data);
        const requestTwo = customAxios.post(pets, data);
        const requestThree = customAxios.post(accessories, data); 
        const requestFour = customAxios.post(latestServices, data); 

        axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
            setMyZoo(responses[0].data?.data)
            setPets(responses[1].data)
            setAccessary(responses[2].data)
            setServices(responses[3].data)
            context.setLoading(false)
        }))

    }
    
    

    return (
        <>
            <ScrollView bg='#fff' flex={1} showsVerticalScrollIndicator={false} pt={5}>
                <Categories/>
                <Box height={0.5} bg={'#E0E0E0'} my={2}/>
                <MyzooPicks label={t("Dashboard.mzPicks")} datas={myZoo} />
                <Pets label={t("Dashboard.pet")} datas={pets}/>
                {/* <LatestAccessories label={t("Dashboard.accessories")} />
                <LatestAccessories label={t("Dashboard.ser")} /> */}
                <Accessories label={t("Dashboard.acc")} datas={accessories} />
                <LatestServices label= {t("Dashboard.ser")} datas={services} />
                <Vendors label= {t("Dashboard.vend")}/>
            </ScrollView>


        </>
    
    )
}

export default Dashboard

const styles = StyleSheet.create({})