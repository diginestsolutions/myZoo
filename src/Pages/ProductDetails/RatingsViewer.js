import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, Icon, Progress } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RatingsViewer = ({ ratings }) => {
    let fivePer = (ratings.five/(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five))*100
    let fourPer = (ratings.four/(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five))*100
    let threePer = (ratings.three/(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five))*100
    let twoPer = (ratings.two/(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five))*100
    let onePer = (ratings.one/(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five))*100
    return (
        <Box>
            <Box flexDir={"row"} width={100} alignItems="center">
                <Icon as={<Ionicons  />} name={"star"}  color="yellow.500"  />
                <Text mr={2}>5</Text>
                <Progress value={fivePer} my={1.5} height={3} width={150} _filledTrack={{
                     bg: "yellow.500"
                }} />
            </Box>
            <Box flexDir={"row"} width={100} alignItems="center">
                <Icon as={<Ionicons  />} name={"star"}  color="yellow.500"  />
                <Text mr={2}>4</Text>
                <Progress value={fourPer} my={1.5} height={3} width={150} _filledTrack={{
                     bg: "yellow.500"
                }} />
            </Box>
            <Box flexDir={"row"} width={100} alignItems="center">
                <Icon as={<Ionicons  />} name={"star"}  color="yellow.500"  />
                <Text mr={2}>3</Text>
                <Progress value={threePer} my={1.5} height={3} width={150} _filledTrack={{
                     bg: "yellow.500"
                }} />
            </Box>
            <Box flexDir={"row"} width={100} alignItems="center">
                <Icon as={<Ionicons  />} name={"star"}  color="yellow.500"  />
                <Text mr={2}>2</Text>
                <Progress value={twoPer} my={1.5} height={3} width={150} _filledTrack={{
                     bg: "yellow.500"
                }} />
            </Box>
            <Box flexDir={"row"} width={100} alignItems="center">
                <Icon as={<Ionicons  />} name={"star"}  color="yellow.500"  />
                <Text mr={2}>1</Text>
                <Progress value={onePer} my={1.5} height={3} width={150} _filledTrack={{
                     bg: "yellow.500"
                }} />
            </Box>
        </Box>
    )
}

export default RatingsViewer

const styles = StyleSheet.create({})