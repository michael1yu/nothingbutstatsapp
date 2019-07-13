import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";
import { grey } from "ansi-colors";

const requestUrl = "https://nbaspringboot.herokuapp.com/query_current_players";
let cancel;
const CancelToken = axios.CancelToken;

class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }

  componentDidMount() {
    const current = "true";
    const team = this.props.navigation.getParam("team", "Undefined");
    axios
      .get(requestUrl, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
        params: {
          team: team,
          current: current
        }
      })
      .then(response => {
        this.setState({
          players: response.data.players ? response.data.players : []
        });
      });
  }

  componentWillUnmount() {
    cancel('Operation canceled by the user.');
}

  render() {
    const { navigate } = this.props.navigation;
    const team = this.props.navigation.getParam("team", "Undefined");

    return (
      <View>
        <Text>{team}</Text>
        <ScrollView>
          {this.state.players.map((player, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigate("Player", {
                  player: player.name,
                  id: player.id,
                  team: team
                })
              }
            >
              <View
                style={{
                  backgroundColor: grey,
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 5,
                  margin: 5,
                  padding: 10
                }}
              >
                <Text style={{ color: "black" }}>{player.name}</Text>
                <Text>></Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default TeamScreen;
