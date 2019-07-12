import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen.js';
import TeamScreen from './src/screens/TeamScreen.js';
import PlayerScreen from './src/screens/PlayerScreen.js'

const MainNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Team: { screen: TeamScreen },
    Player: { screen: PlayerScreen }
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;