import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, ScrollView, FlatList, Slider , HStack } from 'native-base'
import TypeCard from '../TypeCard';
import FilterCard from '../FilterCard';
import AgeRange from './AgeRange';
import PriceRange from '../PriceRange';
import WeightRange from './WeightRange';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getEveryranges } from '../../../Redux/actions/homeAction';
import { HOME_INPUT } from '../../../Redux/constants/homeConstant';


const PetsType = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();


    const { categoryList, loading, error, latestPets, filterValue, everyRanges } = useSelector(state => state.home)

    const [onChangeValue, setOnChangeValue] = useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = useState(70);
    const [currentTab, setCurrentTab] = useState(0)

    const [selected, setSelected] = useState(null)


    useEffect(() => {
        if(latestPets){
            let data = {
                Type: latestPets[0]?.Type
            }
            dispatch(getAllCategories(data))
            dispatch(getEveryranges({
                Type: 2
            }))
        }
    }, [latestPets])


    useEffect(() => {
       if(everyRanges){
            filterValue.minAge = everyRanges?.minAge
            filterValue.maxAge = everyRanges?.maxAge
            filterValue.minPrice = everyRanges.minPrice
            filterValue.maxPrice = everyRanges.maxPrice
            filterValue.minWeight = everyRanges.minWeight
            filterValue.maxWeight = everyRanges.maxWeight
            dispatch({
                type: HOME_INPUT,
                payload: {
                    prop: 'filterValue',
                    value: filterValue
                }
            })
       }
    }, [everyRanges])
    

    // useEffect(() => {
    //     if(categoryList){
    //         let selectCat = categoryList.find(addr => addr._id)
    //         if(selectCat){
    //             setSelected(selectCat?._id);
    //         }
    //     }
    // }, [categoryList])



    

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
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    numColumns={4}

                />
            </HStack>                    
        </FilterCard>

        <AgeRange/>

        <PriceRange/>

        <WeightRange/>
        
    </Box>
  )
}

export default PetsType

const styles = StyleSheet.create({})