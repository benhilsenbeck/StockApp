import React, { useState, useEffect } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Pressable } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container1: {
        height: 40,
        marginTop: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: '80%',
        alignItems: 'center',
    },
    container2: {
        marginTop: 80,
        flexDirection: 'row',
    },
    box: {
        width: "90%",
        marginTop: 50,
        alignItems: 'center',
        borderWidth: 5,
        borderStyle: 'solid',
        height: 55,
    },
    txt1: {
        width: "80%",
        fontSize: 20,
        fontWeight: '700',
    },
    btn1: {
        marginRight: 70,
        width: 120,
        borderRadius: 4,
        elevation: 3,
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 20,
        elevation: 8,
    },
    btn2: {
        width: 120,
        backgroundColor: 'red',
        borderRadius: 20,
        elevation: 8,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 25,
        fontWeight: '700',
        color: 'white',
        paddingTop: 5,
        paddingBottom: 5,
    },
    });

const AddStock = ({navigation, route}) => {
    var data = route.params;
    const [numberOfStocks, setNumberOfStocks] = useState(null)
    const [amount, setAmount] = useState(null)

    async function addedStock () {
        var data2 = await AsyncStorage.getItem('access_token')
        try {
            var config = {
                headers: {
                    Authorization: data2
                    ? 'JWT ' + data2
                    : null,
                }
            }
            var res = await axios.post('http://192.168.0.49:8000/addStocks', {stockName: data.data2, ticker: data.data1, numberOfStocks: numberOfStocks, purchasePrice: amount}, config)
            navigation.navigate('Search')
        } catch (err) {
            console.log("There was a problem adding the stock")
            console.log(err)
        }
    }
    
    return(
        <View>
            <View style={styles.container1}>
                <View style={styles.box}>
                    <Text style={styles.txt1}>{data.data2}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.txt1}>{data.data1}</Text>
                </View>
                <View style={styles.box}>
                    <TextInput style={styles.txt1} onChangeText={setNumberOfStocks} placeholder="# Stocks"></TextInput>
                </View>
                <View style={styles.box}>
                    <TextInput style={styles.txt1} onChangeText={setAmount} placeholder="$0.00"></TextInput>
                </View>
                <View style={styles.container2}>
                    <Pressable style={styles.btn1} onPress={addedStock}>
                        <Text style={styles.btnText}>Add</Text>
                    </Pressable>
                    <Pressable style={styles.btn2} onPress={() => navigation.navigate('Search')}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default AddStock;