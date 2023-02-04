import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, ScrollView, Text , HStack } from 'native-base'
import FilterCard from './FilterCard'
import { useTranslation } from "react-i18next";
import Slider from './Slider';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_INPUT } from '../../Redux/constants/homeConstant';
import { getEveryranges } from '../../Redux/actions/homeAction';


const AllType = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch()

    const [low, setLow ] = useState(null)
    const [high, setHigh ] = useState(null)
    const { filterValue, everyRanges } = useSelector(state => state.home)


    useEffect(() => {
        dispatch(getEveryranges({
            Type: 1
        }))
    }, [])
    



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

export default AllType

const styles = StyleSheet.create({})