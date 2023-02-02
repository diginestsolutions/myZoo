import { StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, Text, HStack } from 'native-base'
import StepIndicator from 'react-native-step-indicator';


const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#008ECC',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#008ECC',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#008ECC',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#008ECC',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#008ECC',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fff',
    stepIndicatorLabelFinishedColor: '#fff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#000000'
  }

const Timeline = ({labels, stepCount, direction, height, ml, mt, renderLabel, currentPosition}) => {

  return (
    <Box height={height} ml={ml} mt={mt}>
        <StepIndicator
            stepCount={stepCount}
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            direction={direction}
            renderLabel={renderLabel}
        />
    </Box>
  )
}

export default Timeline

const styles = StyleSheet.create({})