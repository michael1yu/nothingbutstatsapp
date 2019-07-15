import React from "react";
import { Text, View, SectionList } from "react-native";
import axios from "axios";
import ExpandablePanel from "../components/ExpandablePanel";
import Animated from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

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
      <ScrollView>
        <Text>Info</Text>
        <View>
          <Text>Position: {playerInfo.position}</Text>
          <Text>
            Height: {playerInfo.height_feet}' {playerInfo.height_inches}"
          </Text>
          <Text>Weight: {playerInfo.weight_pounds} lbs</Text>
        </View>
        <Text>Stats</Text>
        <View>
          <Text>Games Played: {playerStats.games_played}</Text>
          <Text>Minutes per Game: {playerStats.min}</Text>
          <ExpandablePanel title={`Points per Game: ${playerStats.pts}`}>
            <ExpandablePanel title={`Field Goal: ${playerStats.fg_pct}%`}>
              <Text>Field Goals Made: {playerStats.fgm}</Text>
              <Text>Field Goals Attempted: {playerStats.fga}</Text>
            </ExpandablePanel>
            <ExpandablePanel title={`3 Point: ${playerStats.fg3_pct}%`}>
              <Text>3 Points Made: {playerStats.fg3m}</Text>
              <Text>3 Point Attempts: {playerStats.fg3a}</Text>
            </ExpandablePanel>
            <ExpandablePanel title={`Free Throw: ${playerStats.fg3_pct}%`}>
              <Text>3 Points Made: {playerStats.ftm}</Text>
              <Text>3 Point Attempts: {playerStats.fta}</Text>
            </ExpandablePanel>
          </ExpandablePanel>
          <ExpandablePanel title={`Rebounds: ${playerStats.reb}`}>
            <Text>Offensive Rebounds: {playerStats.oreb}</Text>
            <Text>Defensive Rebounds: {playerStats.dreb}</Text>
          </ExpandablePanel>
          <Text>Assists Per Game: {playerStats.ast}</Text>
          <Text>Steals Per Game: {playerStats.stl}</Text>
          <Text>Blocks Per Game: {playerStats.blk}</Text>
          <Text>Turnovers Per Game: {playerStats.turnover}</Text>
          <Text>Personal Fouls Per Game: {playerStats.pf}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default PlayerScreen;
