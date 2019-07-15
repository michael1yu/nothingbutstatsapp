import React from "react";
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
} from "react-native";
import TeamItem from "../components/TeamItem";
import ItemSeparator from "../components/ItemSeparator";
import axios from "axios";

const requestUrl = "https://nbaspringboot.herokuapp.com/get_teams";
let cancel;
const CancelToken = axios.CancelToken;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    teams: [],
    loading: true
  };

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
          teams: response.data.teams ? response.data.teams : [],
          loading: false
        });
      });
  }

  static navigationOptions = {
    title: "Teams"
  };

  render() {
    const { navigate } = this.props.navigation;
    let teams = this.state.teams;
    let atlantic = [];
    let central = [];
    let southeast = [];
    let northwest = [];
    let pacific = [];
    let southwest = [];
    let loading = this.state.loading;
    var i;
    for (i = 0; i < teams.length; i++) {
      switch (teams[i].division) {
        case "Atlantic":
          atlantic.push(teams[i]);
          break;
        case "Central":
          central.push(teams[i]);
          break;
        case "Southeast":
          southeast.push(teams[i]);
          break;
        case "Northwest":
          northwest.push(teams[i]);
          break;
        case "Pacific":
          pacific.push(teams[i]);
          break;
        case "Southwest":
          southwest.push(teams[i]);
          break;
      }
    }

    return (
      <View>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%"
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              height: "100%"
            }}
          >
            <SectionList
              renderItem={({ item }) => (
                <TeamItem
                  team={item.full_name}
                  logo={item.logo}
                  navigate={navigate}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text
                  style={{
                    margin: 0,
                    padding: 10,
                    fontSize: 20,
                    backgroundColor:
                      title.indexOf("(E)") >= 0 ? "#00e0d1" : "#fb6602"
                  }}
                >
                  {title}
                </Text>
              )}
              sections={[
                {
                  title: "Atlantic (E)",
                  data: atlantic
                },
                {
                  title: "Central (E)",
                  data: central
                },
                {
                  title: "Southeast (E)",
                  data: southeast
                },
                {
                  title: "Pacific (W)",
                  data: pacific
                },
                {
                  title: "Northwest (W)",
                  data: northwest
                },
                {
                  title: "Southwest (W)",
                  data: southwest
                }
              ]}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>
        )}
      </View>
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
