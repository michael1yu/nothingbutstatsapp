import React from 'react';
import { Text, View } from 'react-native';

class PlayerScreen extends React.Component {
    render(){
        return(
            <View>
                <Text>{this.props.navigation.getParam('player')}</Text>
            </View>
        );
    }
}

export default PlayerScreen;