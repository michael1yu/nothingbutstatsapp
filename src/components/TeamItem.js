import React from "react";
import Image from "react-native-remote-svg";
import { ListItem } from "react-native-elements";

class TeamItem extends React.Component {
  render() {
    let team = this.props.team;
    let logo = this.props.logo;
    let navigate = this.props.navigate;
    return (
      <ListItem
        onPress={() =>
          navigate("Team", {
            team: team,
            logo: logo
          })
        }
        title={team}
        chevron
        leftAvatar={
          <Image
            source={{
              uri: logo
            }}
            style={{
              width: 50,
              height: 50,
              padding: 0,
              margin: 0
            }}
          />
        }
      />
    );
  }
}

export default TeamItem;
