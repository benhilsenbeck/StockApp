import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = require('../constants/constants').config()

const styles = StyleSheet.create( {
    loadingContainer: {
        alignItems: 'center',
        marginTop: '50%',
    },
    loadingTitle: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 50,
    },
    container1: {
        borderWidth: 5,
        borderStyle: 'solid',
        height: 120,
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
        fontWeight: '700'
    },
    percentage: {
        fontSize: 25,
    },
    row: {
        flexDirection: 'row',
    },
    container2: {
        marginTop: 50,
    },
    stockRows: {
        marginTop: 15,
        marginBottom: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        width: 330
    },
    stockName: {
        marginRight: 'auto',
        width: 150,
    },
    stockCurrent: {
        marginLeft: 'auto',
        width: 50,
        paddingLeft: 0,
    },
    stockNumber: {
        marginLeft: 'auto',
        marginRight: 15,
    },
    bottomBorder: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 350,
    },
    row: {
        marginTop: 50,
        alignItems: 'center'
    }
})

const Home = () => {
    const [loading, setloading] = useState(false)
    const [array1, setArray1] = useState([])

    async function getUserStocks() {
            const data2 = await AsyncStorage.getItem('access_token')
            try {
                var configuration = {
                    headers: {
                        Authorization: data2
                        ? 'JWT ' + data2
                        : null,
                    }
                }
            var res = await axios.get(config.API_URL + 'addStocks', configuration)
            } catch (err) {
                console.log("There was a problem getting the stocks")
                console.log(err)
            }
            console.log(res.data)
            setArray1(res.data)
            console.log(array1)
            setloading(true)
            console.log("FINISHED") 
    }

    useEffect(() => {
        getUserStocks();
    },[]);

    if (loading === false) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingTitle}>Loading</Text>
                <ActivityIndicator style={styles.loadingCircle} size="large" color="#0000ff"/>
                <Text></Text>
            </View>
       )
    } else {
        return(
            <View>
                <View style={styles.container2}>
                    <View style={styles.container2}>
                        {(array1).map((item) => ( 
                        <View key={item + "a"}>
                        <View key={item + "b"} style={styles.stockRows}>
                            <Text key={item + "c"} style={styles.stockName}> {item[0]} </Text>
                            <Text key={item + "d"} style={styles.stockNumber}>{item[2]}</Text>
                            <Text key={item + "e"} style={styles.stockCurrent}>{item[1]}</Text>
                        </View>
                        <View key={item + "e"} style={styles.bottomBorder}></View>
                        </View>
                        ))}
                    </View>
                    <View style={styles.row}>
                        <Button title="Refresh" onPress={getUserStocks}></Button>
                    </View>
                    
                </View>
            </View>
        )
    } 
}

export default Home;