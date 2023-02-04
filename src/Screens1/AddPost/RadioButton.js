import React, {useState} from "react";
import { Radio, Stack, Center, NativeBaseProvider } from "native-base";
import { useTranslation } from "react-i18next";
import reactotron from "../../ReactotronConfig";


const RadioButton = ({value, onChange}) => {

    const { t } = useTranslation();
 
    return <Radio.Group 
        name="exampleGroup" accessibilityLabel="pick a size" value={value} onChange={onChange}>
        <Stack direction={{
        base: "row",
        md: "row"
        }} alignItems={{
        base: "flex-start",
        md: "center"
        }} space={3} 
    >
        <Radio value={2} colorScheme="blue" size="sm" >
            {t("PostNewItem.selling")}
        </Radio>
        
        <Radio value={1} colorScheme="blue" size="sm" >
            {t("PostNewItem.bidding")}
        </Radio>
        
    </Stack>
    </Radio.Group>
};

    export default RadioButton