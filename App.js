import React, { Component } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { History, EntryDetail, Live } from './components'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const RouteConfigs = {
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: "History",
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: "Add Entry",
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: "Live",
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
        }
    }
};

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : purple,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};

const IOSTab = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
const AndroidTab = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const Tabs = createStackNavigator({
    Home: {
        screen: Platform.OS === 'ios' ? IOSTab : AndroidTab,
        navigationOptions: {
            header: null,
        },
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
})

const AppContainer = createAppContainer(Tabs)

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                    <AppContainer />
                </View>
            </Provider>
        );
    }
}

