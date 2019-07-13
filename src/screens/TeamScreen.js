import React from "react";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import PlayerItem from "../components/PlayerItem";
import ItemSeparator from "../components/ItemSeparator";
import Image from "react-native-remote-svg";

const requestUrl = "https://nbaspringboot.herokuapp.com/query_current_players";
let cancel;
const CancelToken = axios.CancelToken;

class TeamScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.team
    };
  };

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
    cancel("Operation canceled by the user.");
  }

  render() {
    const { navigate } = this.props.navigation;
    const team = this.props.navigation.getParam("team", "Undefined");
    const logo = this.props.navigation.getParam("logo");

    return (
      <View>
        <FlatList
          data={this.state.players}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <PlayerItem player={item} team={team} navigate={navigate} />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    );
  }
}

export default TeamScreen;
