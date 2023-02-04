import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, FlatList, Text, Slider , HStack } from 'native-base'
import FilterCard from './FilterCard'
import TypeCard from './TypeCard'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { HOME_INPUT } from '../../Redux/constants/homeConstant'
import PriceRange from './PriceRange'
import { getEveryranges } from '../../Redux/actions/homeAction'


const ServicesType = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch()

    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);

    const [currentTab, setCurrentTab] = useState(0)

    const { services, error, filterValue } = useSelector(state => state.home)


    useEffect(() => {
        dispatch(getEveryranges({
            Type: 4
        }))
    }, [])
    


    

    const renderItems = ({item}) => (
        <TypeCard 
            label={item.Name}
            onPress={() => {
                filterValue.Bread = [item._id]
                dispatch({
                    type: HOME_INPUT,
                    payload: {
                        prop: 'filterValue',
                        value: filterValue
                    }
                })
            }}
            my={1.5}
            selected={ item?._id === filterValue.Bread[0] ? true : false} 
        />
    )
  return (
    <Box>
        <FilterCard label={t("Filter.choseCat")}>                   
        <HStack mt={3}>
            <FlatList 
                data={services}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                numColumns={3}
            />
        </HStack>                    

        </FilterCard>
        <PriceRange />

    </Box>
    
  )
}

export default ServicesType

const styles = StyleSheet.create({})