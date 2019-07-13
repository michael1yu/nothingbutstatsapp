import React from "react";
import { FlatList } from "react-native-gesture-handler";
import TeamItem from "../components/TeamItem";
import ItemSeperator from "../components/ItemSeparator";
import axios from 'axios';

const requestUrl = "https://nbaspringboot.herokuapp.com/get_teams";
let cancel;
const CancelToken = axios.CancelToken;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    axios
      .get(requestUrl, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
      .then(response => {
        this.setState({
          teams: response.data.teams ? response.data.teams : []
        });
      });
  }

  static navigationOptions = {
    title: "Teams"
  };
  render() {
    const { navigate } = this.props.navigation;
    let teams = this.state.teams;
    return (
      <FlatList
        data={teams}
        renderItem={({ item }) => <TeamItem team={item.full_name} logo={item.logo} navigate={navigate} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeperator}
      />
    );
  }
}

// const styles = StyleSheet.create({
//     teamViewStyle: {
//         margin: 2.5,
//         textAlign: "left"
//     },
//     teamButtonStyle: {
//         textAlign: "left"
//     }
// });

export default HomeScreen;
