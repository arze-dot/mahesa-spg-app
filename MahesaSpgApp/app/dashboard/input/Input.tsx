import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { InputStackParamList } from "../../nav/InputStackParamList";
import InputHomeScreen from "./InputScreen";
import OutletScreen from "./outlet/Outlet";
import ProductScreen from "./product/Product";
import AssetScreen from "./asset/Asset";
import StaffScreen from "./staff/Staff";

export default function InputStackNavigator() {
    const InputStack = createNativeStackNavigator<InputStackParamList>();

    return (
        <InputStack.Navigator >
            <InputStack.Screen name="InputHome" component={InputHomeScreen} />
            <InputStack.Screen name="Outlet" component={OutletScreen} />
            <InputStack.Screen name="Product" component={ProductScreen} />
            <InputStack.Screen name="Aset" component={AssetScreen} />
            <InputStack.Screen name="SPG" component={StaffScreen} />
        </InputStack.Navigator>
    );
}