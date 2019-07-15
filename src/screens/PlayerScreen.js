import React from "react";
import { Text, View } from "react-native";
import axios from "axios";
import ExpandablePanel from "../components/ExpandablePanel";
import Animated from "react-native-reanimated";

const requestStatsUrl = "https://nbaspringboot.herokuapp.com/get_player_stats";
const requestInfoUrl = "https://nbaspringboot.herokuapp.com/get_player_info";
let id;
let playerStats;
let playerInfo;
let cancel;
const CancelToken = axios.CancelToken;

class PlayerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.player
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      info: []
    };
  }

  axiosInfoCall() {
    return axios.get(requestInfoUrl, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
      params: {
        team: this.props.navigation.getParam("team"),
        id: this.props.navigation.getParam("id")
      }
    });
  }

  axiosStatsCall() {
    return axios.get(requestStatsUrl, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      params: {
        team: this.props.navigation.getParam("team"),
        id: this.props.navigation.getParam("id")
      }
    });
  }

  componentDidMount() {
    id = this.props.navigation.getParam("id", null);
    let self = this;
    axios.all([this.axiosStatsCall(), this.axiosInfoCall()]).then(
      axios.spread(function(statsResponse, infoResponse) {
        self.setState({
          stats: statsResponse.data ? statsResponse.data : [],
          info: infoResponse.data ? infoResponse.data : []
        });
      })
    );
  }

  componentWillUnmount() {
    cancel("Operation canceled by the user.");
  }

  render() {
    playerInfo = this.state.info;
    playerStats = this.state.stats;

    return (
      <View>
        <View>
          <Text>Position: {playerInfo.position}</Text>
          <Text>
            Height: {playerInfo.height_feet}' {playerInfo.height_inches}"
          </Text>
          <Text>Weight: {playerInfo.weight_pounds} lbs</Text>
        </View>
        <View>
          <ExpandablePanel title="test">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </ExpandablePanel>
        </View>
      </View>
    );
  }
}

export default PlayerScreen;
