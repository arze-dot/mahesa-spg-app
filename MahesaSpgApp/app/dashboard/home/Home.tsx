import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { DashboardTabParamList } from "../../nav/DashboardTabParamList";
import Icon from 'react-native-vector-icons/Ionicons';




const HomeScreen: React.FC<NativeStackScreenProps<DashboardTabParamList, 'Home'>> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../images/dashboard-wave-top.png')} style={styles.waveTop} />

            <Text style={styles.breadCrumbText}>Home</Text>

            <View style={styles.row}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/60' }} // Replace with your avatar URL
                    style={styles.avatar}
                />
                <Text style={styles.greeting}>Hi, ChatGpt</Text>
                <Icon name="notifications" size={30} color="#000" style={styles.icon} />
            </View>
            <Button
                title="Go to Login"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    waveTop: {
        position: 'absolute',
        top: 0,
        width: '120%',
    },
    breadCrumbText: {
        position: 'absolute',
        zIndex: 10,
        top: 30,
        left: 30,
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    greeting: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        marginLeft: 10,
    },
});

export default HomeScreen;