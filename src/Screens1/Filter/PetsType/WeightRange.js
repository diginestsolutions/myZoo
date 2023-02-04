import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, ScrollView, FlatList , HStack } from 'native-base'
import FilterCard from '../FilterCard';
import TypeCard from '../TypeCard';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { getWeightTypeList } from '../../../Redux/actions/myItemsAction';
import Slider from '../Slider';
import { HOME_INPUT } from '../../../Redux/constants/homeConstant';


const WeightRange = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { everyRanges, filterValue } = useSelector(state => state.home)

    const [low, setLow ] = useState(null)
    const [high, setHigh ] = useState(null)



    const { savePet, loading, error, ageTypeList, weightTypeList, sizeTypeList } = useSelector(state => state.myItems)

    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);
    const [currentTab, setCurrentTab] = useState(0)

    useEffect(() => {
        dispatch(getWeightTypeList())
    }, [])

    const data2 = [
        {   id: 1, 
            title:'Pound',
            onPress:()=>setCurrentTab(0),
            select: currentTab === 0 ? true : false
        },
        {   id: 2, 
            title:'Kilagram',
            onPress:()=>setCurrentTab(1),
            select: currentTab === 1 ? true : false
        },
    ]

    const renderItems = ({item}) => (
        <TypeCard 
            label={item.title}
            onPress={item.onPress}
            selected={item.select}    
        />
    )

  return (
    <FilterCard label={t("Filter.WtRange")}>
        <HStack mt={3}>
            <FlatList 
                data={weightTypeList}
                keyExtractor={(item) => item.id}
                renderItem={renderItems}
                horizontal={true}
            />
        </HStack>      

        <Box mt={3}>    
            <Slider min={everyRanges?.minWeight} max={everyRanges?.maxWeight} setLow={(low) => {
                filterValue.minWeight = low
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: filterValue
                    }
                })
            }} setHigh={(high) => {
                filterValue.maxWeight = high
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: filterValue
                    }
                })
            }} />
        </Box>
    </FilterCard>
  )
}

export default WeightRange

const styles = StyleSheet.create({})