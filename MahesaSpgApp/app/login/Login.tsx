import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../nav/RootStackParamList";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from "react-native-check-box";


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <LinearGradient colors={['#460A0A', '#AC1919']} style={styles.container}>
            <Image source={require('../images/wave-top.png')} style={styles.waveTop} />
            <Text style={styles.loginText}>Hi Please Login! </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Text style={styles.showPasswordText}>{showPassword ? 'hide' : 'show'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rememberMeContainer}>
                <CheckBox
                    isChecked={rememberMe}
                    onClick={() => setRememberMe(!rememberMe)}
                    checkBoxColor="#FFFFFF"
                />
                <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Image source={require('../images/wave-down.png')} style={styles.waveDown} />

        </LinearGradient>
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
    waveDown: {
        position: 'absolute',
        bottom: 0,
        width: '120%',
    },
    loginText: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: 'black',
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    showPasswordButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    showPasswordText: {
        fontWeight: "700",
        color: '#460A0A',
    },
    rememberMeContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    checkboxContainer: {
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    checkboxText: {
        color: '#FFFFFF',
    },
    checkboxLabel: {
        color: '#FFFFFF',
        marginLeft: 10,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#D3AA4A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#AC1919',
        fontSize: 18,
    },
});

export default LoginScreen