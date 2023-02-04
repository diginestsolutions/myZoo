import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, FlatList, Text, Slider , HStack } from 'native-base'
import FilterCard from './FilterCard'
import TypeCard from './TypeCard'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getEveryranges } from '../../Redux/actions/homeAction'
import PriceRange from './PriceRange'
import { HOME_INPUT } from '../../Redux/constants/homeConstant'


const AccessoriesType = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);

    const [currentTab, setCurrentTab] = useState(0)


    const { categoryList, loading, error, filterValue } = useSelector(state => state.home)
    const { latestAccessories } = useSelector(state => state.home)




    

    useEffect(() => {
        if(latestAccessories){
            let data = {
                Type: latestAccessories[0]?.Type
            }
            dispatch(getAllCategories(data))
            dispatch(getEveryranges({
                Type: 3
            }))
        }
    }, [latestAccessories])

    const data = [
        {   id: 1, 
            title:'Dog Accessories',
            onPress:()=>setCurrentTab(0),
            select: currentTab === 0 ? true : false
        },
        {   id: 2, 
            title:'Cat Accessories',
            onPress:()=>setCurrentTab(1),
            select: currentTab === 1 ? true : false
        },
    ]

    const renderItems = ({item}) => (
        <TypeCard 
            label={item.CategoryName}
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
                    data={categoryList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItems}
                    horizontal={true}
                />           
            </HStack>                    

        </FilterCard>
        <PriceRange />

    </Box>
    
  )
}

export default AccessoriesType

const styles = StyleSheet.create({})