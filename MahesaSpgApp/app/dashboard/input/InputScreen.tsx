import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputStackParamList } from "../../nav/InputStackParamList";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const InputHomeScreen: React.FC<NativeStackScreenProps<InputStackParamList, 'InputHome'>> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Outlet')}>
                <Text style={styles.cardText}>Outlet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product')}>
                <Text style={styles.cardText}>Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Aset')}>
                <Text style={styles.cardText}>Aset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SPG')}>
                <Text style={styles.cardText}>SPG</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#ddd',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
    },
});

export default InputHomeScreen