import React, { useState, useRef} from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import axios from 'axios';
import { useDispatch} from 'react-redux'
import {login} from '../actions';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = require('../constants/constants').config()

const styles = StyleSheet.create( {
    container: {
        ...ifIphoneX({
            paddingTop: 50
        }),
        width: '100%',
        height: '100%',
    },

    container1: {
        alignItems: 'center',
        marginTop: '50%',
    },

    email: {
        marginTop: 20,
        marginBottom: 20,
        width: 350,
        height: 50,
        fontSize: 25,
        borderWidth: 5,
        borderStyle: 'solid',
        paddingLeft: 20,
    },
    password: {
        width: 350,
        height: 50,
        fontSize: 25,
        borderWidth: 5,
        borderStyle: 'solid',
        marginBottom: 20,
        paddingLeft: 20,
    },
    signUpLink: {
        color: 'blue',
        width: 250,
    },
    error1: {
        color: 'red',
    },
}) 


const Login = ({navigation}) => {

    const axiosInstance = axios.create({
        baseURL: config.API_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    });

    const dispatch = useDispatch();
    var secondTextInput = useRef();
    const [validLogin, setValidLogin] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    function checkIfEmailInString(text) {
        var re = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(text);
    }

    async function attemptLogin () {
        console.log("Login Attempted")
        const checkEmail = checkIfEmailInString(email);
        if (checkEmail === false) {
            setValidEmail(false)
            setValidLogin(true)
        } else {
            try {
                const res = await axiosInstance.post('token/obtain', {email: email, password: password,}, )
                const data = res.data
                await AsyncStorage.removeItem("access_token")
                await AsyncStorage.removeItem("refresh_token")
                await AsyncStorage.setItem('access_token', data.access);
                await AsyncStorage.setItem('refresh_token', data.refresh);
                dispatch(login())
                navigation.navigate('Home')
            } catch (err) {
                console.log("There error is in the login attempt")
                console.log(err)
                setValidLogin(false)
                setValidEmail(true)
            }
        }
    }

    async function signUpPage () {
        console.log("Going to signup page")
        navigation.navigate('SignUp')
    }

    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                {validLogin ? null : <Text style={styles.error1}>Email or password was invalid</Text>}
                {validEmail ? null : <Text style={styles.error1}>Email or password was invalid</Text>}
                <TextInput style={styles.email} onChangeText={setEmail} onSubmitEditing={() => { secondTextInput.focus(); }} blurOnSubmit={false} placeholder="Email"></TextInput>
                <TextInput style={styles.password} secureTextEntry={true} onChangeText={setPassword} ref={(input) => { secondTextInput = input; }} placeholder="Password" onSubmitEditing={attemptLogin}></TextInput>
                <TouchableOpacity onPress={signUpPage}>
                    <Text style={styles.signUpLink}>Don't have account? Click here to create account.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;