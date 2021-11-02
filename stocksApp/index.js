/**
 * @format
 */
 import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import allreducers from './reducers'
import { createStore } from 'redux'

const store = createStore(allreducers);

const Root = () => {
    return (
    <Provider store={store}>
        <App/>
    </Provider>
    );
    
}

AppRegistry.registerComponent(appName, () => Root);
