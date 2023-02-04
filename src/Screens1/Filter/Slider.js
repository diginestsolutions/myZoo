import { useWindowDimensions } from 'react-native'
import React, { useCallback, useState } from 'react' 
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import reactotron from 'reactotron-react-native';





const Slider = ({min, max, setLow, setHigh}) => {

    const { width } = useWindowDimensions()

    const [value, setValue] = useState('')

    const onChange = (min, max) => {
        setLow(min)
        setHigh(max)
      }


    // return (
    //     <RangeSlider
    //         type="range" // ios only
    //         min={min}
    //         max={max}
    //         tintColor="#000"
    //         handleColor="#008ECC"
    //         handlePressedColor="#008ECC"
    //         tintColorBetweenHandles="#00B2FF"
    //         onChange={onChange}
    //     />
    // )

    return(
        <MultiSlider
            isMarkersSeparated={true}
            enabledTwo={true}
            values={[min,max]}
            min={min}
            max={max}
            sliderLength={width-100}
            enableLabel={true}
            selectedStyle={{
                backgroundColor: 'blue'
            }}
            onValuesChangeFinish={(value) => {
                //reactotron.log({value})
                setLow(value[0])
                setHigh(value[1])
            }}
        />
    )
}

export default Slider
