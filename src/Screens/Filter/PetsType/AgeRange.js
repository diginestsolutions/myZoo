import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, ScrollView, FlatList , HStack } from 'native-base'
import FilterCard from '../FilterCard';
import TypeCard from '../TypeCard';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { getAgeTypeList } from '../../../Redux/actions/myItemsAction';
import RangeSlider from 'rn-range-slider';
import Slider from '../Slider';
import { HOME_INPUT } from '../../../Redux/constants/homeConstant';
import reactotron from 'reactotron-react-native';


const AgeRange = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [low, setLow ] = useState(null)
    const [high, setHigh ] = useState(null)


    const { savePet, loading, error, ageTypeList, weightTypeList, sizeTypeList } = useSelector(state => state.myItems)
    const { everyRanges, filterValue } = useSelector(state => state.home)


    
    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);
    const [currentTab, setCurrentTab] = useState(0)

    useEffect(() => {
        dispatch(getAgeTypeList())
    }, [])

    

    
    const renderItems = ({item}) => (
        <TypeCard 
            label={item.Text}
            onPress={() => {
                filterValue.AgeType=item?._id

                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: filterValue
                    }
                })
            }}
            selected={item?._id === filterValue.AgeType ? true : false}    
        />
    )

  return (
    <FilterCard label={t("Filter.ageRange")}>
        <HStack mt={3}>
            <FlatList 
                data={ageTypeList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                horizontal={true}
            />
        </HStack>      

        <Box mt={3}>
            <Slider min={everyRanges?.minAge} max={everyRanges?.maxAge} setLow={(low) => {
                filterValue.minAge = low
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: filterValue
                    }
                })
            }} setHigh={(high) => {
                filterValue.maxAge = high
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

export default AgeRange

const styles = StyleSheet.create({})