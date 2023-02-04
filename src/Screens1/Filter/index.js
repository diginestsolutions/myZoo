import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, ScrollView, FlatList, Slider , HStack } from 'native-base'
import CommonBackground from '../../Components/CommonBackground'
import FilterCard from './FilterCard'
import Heading from '../../Components/Heading'
import TypeCard from './TypeCard'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import AllType from './AllType'
import PetsType from './PetsType'
import AccessoriesType from './AccessoriesType'
import ServicesType from './ServicesType'
import { useTranslation } from "react-i18next";
import { filterAnItem, getFilterResult } from '../../Redux/actions/myItemsAction'
import { useDispatch, useSelector } from 'react-redux'
import { HOME_INPUT } from '../../Redux/constants/homeConstant'
import reactotron from 'reactotron-react-native'
import { RESET_ITEM } from '../../Redux/constants/myItemsConstant'


const Filter = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);

    const [currentTab, setCurrentTab] = useState(0)

    const { filterValue, everyRanges } = useSelector(state => state.home)

    const { filterSuccess } = useSelector(state => state.myItems)


    useEffect(() => {
        if(filterSuccess){
            navigation.navigate('FilterResult')
            dispatch({
                type: RESET_ITEM
            })
        }
    }, [filterSuccess])
    




    const datas = [
        {   id: 1, 
            title:'All',
            onPress:()=>setCurrentTab(0),
            select: currentTab === 0 ? true : false
        },
        {   id: 2, 
            title:'Pets',
            onPress:()=>{
                setCurrentTab(1)
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: {
                            "page":1,
                            "pagesize":10,
                            Type:2,
                            Bread:[],
                            AgeType:"",
                            minAge :"",
                            maxAge :"",
                            SizeType:"",
                            minSize :"",
                            maxSize :"",
                            WeightType:"",
                            minWeight:"",
                            maxWeight:"",
                            SerCategory:"",
                            SubCategory:"",
                            Country:"",
                            State:"",
                            City:"",
                            accCategory:[""],
                            SellingMode:[""],
                            IsVendorProduct:true,
                            IsIndividualSellerProduct:""
                        }
                    }
                })
            },
            select: currentTab === 1 ? true : false
        },
        {   id: 3, 
            title:'Accessories',
            onPress:()=>{
                setCurrentTab(2)
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: {
                            Type:3,
                            Bread:[],
                            AgeType:"",
                            minAge :"",
                            maxAge :"",
                            SizeType:"",
                            minSize :"",
                            maxSize :"",
                            WeightType:"",
                            minWeight:"",
                            maxWeight:"",
                            SerCategory:"",
                            SubCategory:"",
                            Country:"",
                            State:"",
                            City:"",
                            accCategory:[""],
                            SellingMode:[""],
                            IsVendorProduct:true,
                            IsIndividualSellerProduct:""
                        }
                    }
                })
            }, 
            select: currentTab === 2 ? true : false

        },
        {   id: 4, 
            title:'Services',
            onPress:()=>setCurrentTab(3), 
            select: currentTab === 3 ? true : false

        },
    ]

    const ApplyFilter = () => {

        if(currentTab === 0){
            let data = {
                "page":1,
                "pagesize":100,
                "Type":1,
                "Bread":[""],
                "minPrice": filterValue.minPrice,
                "maxPrice": filterValue.maxPrice
            }

            dispatch(getFilterResult(data))
        }
        else if(currentTab === 1){

            let data = {
                "page":1,
                "pagesize":100,
                "Type":2,
                "Bread":filterValue.Bread,
                "AgeType":filterValue.AgeType,
                "minAge" :filterValue.minAge,
                "maxAge" :filterValue.maxAge,
                "SizeType":"",
                "minSize" :"",
                "maxSize" :"",
                "WeightType": filterValue.WeightType,
                "minWeight": filterValue.minWeight,
                "maxWeight": filterValue.maxWeight,
                "SerCategory":"",
                "SubCategory":"",
                "minPrice" :filterValue.minPrice,
                "maxprice" : filterValue.maxPrice
            }
            //reactotron.log({filterValue})
            dispatch(getFilterResult(data))
        }
        else if(currentTab === 2){
            let data = {
                "page":1,
                "pagesize":100,
                "Type":3,
                "Bread":[],
                "AgeType":"",
                "minAge" :"",
                "maxAge" :"",
                "SizeType":"",
                "minSize" :"",
                "maxSize" :"",
                "WeightType": "",
                "minWeight": "",
                "maxWeight": "",
                "SerCategory":"",
                "SubCategory":"",
                "accCategory": filterValue.Bread,
                "minPrice" :filterValue.minPrice,
                "maxprice" : filterValue.maxPrice
            }
            dispatch(getFilterResult(data))
        }
        else if(currentTab === 3){
            let data = {
                "page":1,
                "pagesize":100,
                "Type":4,
                "Bread":[""],
                "AgeType":"",
                "minAge" :"",
                "maxAge" :"",
                "SizeType":"",
                "minSize" :"",
                "maxSize" :"",
                "WeightType": "",
                "minWeight": "",
                "maxWeight": "",
                "SerCategory":filterValue.Bread?.[0],
                "SubCategory":"",
                "minPrice" :filterValue.minPrice,
                "maxprice" : filterValue.maxPrice
            }
            dispatch(getFilterResult(data))
        }

        
        // let data = {
        //     Type:1,
        //     Bread:["6103b58f4b38fa085cd60a3f"],
        //     AgeType:"602781833f3a7c50221d5f0b",
        //     minAge :"1",
        //     maxAge :"5",
        //     SizeType:"",
        //     minSize :"",
        //     maxSize :"",
        //     WeightType:"",
        //     minWeight:"",
        //     maxWeight:"",
        //     SerCategory:"6103b3304b38fa085cd60a35",
        //     SubCategory:"",
        //     Country:"",
        //     State:"",
        //     City:"",
        //     accCategory:[""],
        //     SellingMode:[""],
        //     IsVendorProduct:true,
        //     IsIndividualSellerProduct:""
        // }
        //dispatch(getFilterResult(filterValue))


        //navigation.navigate('FilterResult')
        
    }

    const renderItems = ({item}) => (
        <TypeCard 
            label={item.title}
            onPress={item.onPress}
            selected={item.select}    
        />
    )

    

    return (
    
        <CommonBackground>
            <ScrollView mt={2}>
                <Heading label={t("Filter.filterYrSrch")}/>
                <Box m={4} flex={1}>

                    <FilterCard label={t("Filter.chooseType")}>  
                            <FlatList 
                                data={datas}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItems}
                                horizontal={true}
                            />                   

                    </FilterCard>

                    {currentTab === 0 && <AllType/>}

                    {currentTab === 1 && <PetsType/> }

                    {currentTab === 2 && <AccessoriesType/> }

                    {currentTab === 3 && <ServicesType/> }


                    <Button 
                        onPress={ApplyFilter}
                        label={t("Filter.applyFilter")} 
                        marginTop={5}
                    />
                    

                </Box>
                
            </ScrollView>
            
        </CommonBackground>
    )
}

export default Filter

const styles = StyleSheet.create({})