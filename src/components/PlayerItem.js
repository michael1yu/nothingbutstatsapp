import React from 'react';
import { ListItem } from 'react-native-elements';

class PlayerItem extends React.Component {
    render(){
        let player = this.props.player;
        let team = this.props.team;
        let navigate = this.props.navigate;
        return (
            <ListItem
              onPress={() =>
                navigate("Player", {
                  player: player.name,
                  id: player.id,
                  team: team
                })
              }
              title = {player.name}
              chevron
            />
        );
    }
}

export default PlayerItem;