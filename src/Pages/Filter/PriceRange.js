import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Box, ScrollView, FlatList , HStack } from 'native-base'
import FilterCard from './FilterCard'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Slider from './Slider';
import { HOME_INPUT } from '../../Redux/constants/homeConstant';


const PriceRange = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { everyRanges, filterValue } = useSelector(state => state.home)

    const [low, setLow ] = useState(null)
    const [high, setHigh ] = useState(null)


    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);
  return (
    <FilterCard label={t("Filter.priceRange")}>
        <Box mt={3}>
            <Slider min={everyRanges?.minPrice} max={everyRanges?.maxPrice} setLow={(low) => {
                filterValue.minPrice = low
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: filterValue
                    }
                })
            }} setHigh={(high) => {
                filterValue.maxPrice = high
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

export default PriceRange

const styles = StyleSheet.create({})