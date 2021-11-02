import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import { useDispatch } from 'react-redux'

const styles = StyleSheet.create( {
    loginLink: {
        color: 'blue',
        width: 250,
    }
})

const SignUp = ({navigation}) => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.0.49:8000/',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    });

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [formErrors, setFormErrors] = useState ( {
        emptyField: true,
        invalidEmail: true,
        passwordError: true,
    });
    
    const dispatch = useDispatch();

    async function createAccount () {
        const user = {
            fName: fName,
            lName: lName,
            username: username,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }
        if (String(user.fName) === "" || String(user.lName) === "" || String(user.username) === "" || String(user.email) === "" || String(user.password) === "" || String(user.passwordConfirm) === "" ) {
            console.log("Error1")
            setFormErrors({
                emptyField: false,
                invalidEmail: true,
                passwordError: true,
            })
        } else if (checkIfEmailInString(String(user.email)) === false) {
            console.log("Error2")
            setFormErrors({
                emptyField: true,
                invalidEmail: false,
                passwordError: true,
            })
        } else if (String(user.password) !== String(user.passwordConfirm)) {
            console.log("Error3")
            setFormErrors({
                emptyField: true,
                invalidEmail: true,
                passwordError: false,
            })
        } else {
            console.log("Error4")
            axiosInstance.post('userCreateAccount', {
                fName: user.fName,
                lName: user.lName,
                username: user.username,
                email: user.email,
                password: user.password,
            },).then(res => {
                navigation.navigate("Login")
            }).catch(err => {
                console.log("Error5")
                console.log(err)
            })
        }
    }

    function checkIfEmailInString(text) {
        var re = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(text);
    }

    function loginPage() {
        console.log("Going to login page")
        navigation.navigate('Login')
    }

    return(
        <View>
            <Text>SignUp Page</Text>
            <TextInput placeholder="First Name" onChangeText={setFName}></TextInput>
            <TextInput placeholder="Last Name" onChangeText={setLName}></TextInput>
            <TextInput placeholder="Username" onChangeText={setUsername}></TextInput>
            <TextInput placeholder="Email" onChangeText={setEmail}></TextInput>
            <TextInput placeholder="Password" onChangeText={setPassword}></TextInput>
            <TextInput placeholder="Confirm Password" onChangeText={setPasswordConfirm} onSubmitEditing={createAccount}></TextInput>
            <Button title="Create Account" onPress={createAccount}></Button>
            <TouchableOpacity onPress={loginPage}>
                    <Text style={styles.loginLink}>Already have account? Click here to login.</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignUp;