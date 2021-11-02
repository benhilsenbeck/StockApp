import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import {SearchBar} from "react-native-elements"
import { ifIphoneX } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        ...ifIphoneX({
            paddingTop: 50
        })
    },
    
    container2: {
        borderWidth: 5,
        borderStyle: 'solid',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '30%',
    },
    container4: {
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        width: "90%",
    },
    stockOfficalName: {
        fontSize: 30,
        fontWeight: "700",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    stockTicker: {
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    currentPrice: {
        fontSize: 18,
        marginLeft: 'auto',
    },
    openPrice: {
        fontSize: 18,
        marginRight: 'auto',
    },

})

const Search = ({navigation}) => {
    
    const [stockTicker, setStockTicker] = useState("");
    const [stockDescription, setStockDescription] = useState("");
    const [stockOpen, setStockOpen] = useState("");
    const [stockCurrent, setStockCurrent] = useState(null);
    const [search, setSearch] = useState("");

    var data = {data1: stockTicker, data2: stockDescription}

    const updateSearch = (search) => {
        setSearch(search);
    }
    
    async function getAPI () {
        const data2 = await AsyncStorage.getItem('access_token')
            try {
                console.log("The search api was called")
                var stockName = search
                var config = {
                    headers: {
                        Authorization: data2
                        ? 'JWT ' + data2
                        : null,
                    }
                }
                var res = await axios.post("http://192.168.0.49:8000/searchStocks", {stockName: stockName}, config)
                setStockDescription(res.data['description'])
                setStockTicker(res.data['symbol'])
                setStockOpen(res.data['open'])
                setStockCurrent(res.data['current'])
            } catch (err) {
                console.log(err, "this is the error from calling the getAPI")
            }
        
    }

    if (stockCurrent === null) {
        return (
        <View style={styles.container}>
            <SearchBar 
                placeholder="Stock Name"
                onChangeText={updateSearch}
                value={search}
                onSubmitEditing={getAPI}
                round = 'true'
            />
        </View>
    )
    } else {
        return(
            <View>
            <View style={styles.container}>
                <SearchBar 
                    placeholder="Stock Name"
                    onChangeText={updateSearch}
                    value={search}
                    onSubmitEditing={getAPI}
                    round = 'true'
                />
            </View>
             <View style={styles.container2}>
                <TouchableOpacity
                    onPress= {() =>
                        navigation.push('AddStock', data)}
                >
                 <View>
                    <Text style={styles.stockOfficalName}>{stockDescription}</Text>
                    <Text style={styles.stockTicker}>{stockTicker}</Text>
                    <View style={styles.container3}>
                        <View style={styles.container4}>
                            <Text style={styles.openPrice}>Open: ${stockOpen} </Text>
                            <Text style={styles.currentPrice}>Current:${stockCurrent} </Text>
                        </View>
                    </View>
                 </View>
                 </TouchableOpacity>
            </View>
            </View>
            );
    }
}

export default Search;