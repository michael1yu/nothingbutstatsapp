import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class ItemSeparator extends React.Component {
    render(){
        return (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#000",
              }}
            />
          );
    }
}

export default ItemSeparator;