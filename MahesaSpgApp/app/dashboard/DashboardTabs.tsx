import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardTabParamList } from "../nav/DashboardTabParamList";
import HomeScreen from "./home/Home";
import ReportScreen from "./report/Report";
import InputStackNavigator from "./input/Input";

const Tab = createBottomTabNavigator<DashboardTabParamList>();
const DashboardTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Input" component={InputStackNavigator} />
            <Tab.Screen name="Report" component={ReportScreen} />
        </Tab.Navigator>
    )
}

export default DashboardTabs