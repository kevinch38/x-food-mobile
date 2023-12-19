import {Text, View} from "react-native";
import Card from "../../components/Card";
import React from "react";
import History from "./index";
import HistoryCard from "../../components/HistoryCard";

const TopUpScreen = () => {
    return(
       <View style={{margin:20}}>
          <HistoryCard/>
           <HistoryCard/>
       </View>
    )
}

export default TopUpScreen