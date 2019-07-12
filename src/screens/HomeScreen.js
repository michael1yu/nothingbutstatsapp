import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { grey } from 'ansi-colors';

const teams = [
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Charlotte Hornets",
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Dallas Mavericks",
    "Denver Nuggets",
    "Detroit Pistons",
    "Golden State Warriors",
    "Houston Rockets",
    "Indiana Pacers",
    "LA Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Miami Heat",
    "Milwaukee Bucks",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "New York Knicks",
    "Oklahoma City Thunder",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Toronto Raptors",
    "Utah Jazz",
    "Washington Wizards"];

class HomeScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <ScrollView>
                    {teams.map((team, i) =>
                        <TouchableOpacity key={i} onPress={() => navigate('Team', { team: team })}>
                            <View style={{
                                backgroundColor: grey, alignItems: 'center', flex: 1, flexDirection: 'row',
                                justifyContent: 'space-between', borderRadius: 5, margin: 5, padding: 10
                            }}>
                                <Text style={{ color: 'black' }}>{team}</Text>
                                <Text>></Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
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