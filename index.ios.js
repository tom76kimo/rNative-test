/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var howhow = 'https://s2.yimg.com/uu/api/res/1.2/uSnUzz5pqMcmlM6VL0PQTQ--/dz0zOTI7Y3I9MTtkeD0wO2R5PTEzMztmaT11bGNyb3A7Y3c9NTMzO2NoPTQwMDtoPTMwODthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/zh_hant_tw/News/cna/20141001000022M.jpg';
var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = React;

var TouchPart = React.createClass({
  _onPressButton() {
    AlertIOS.alert(
        'Foo Title',
        '好豪現身',
        [
            {text: 'Foo', onPress: () => console.log('Foo Pressed')},
            {text: 'Boo', onPress: () => console.log('Boo Pressed')}
        ]
    );
  },
  render: function () {
    return (
      <TouchableHighlight underlayColor="#7300ff" onPress={this._onPressButton}>
        <View style={styles.button}>
            <Image source={{uri: howhow}} style={styles.thumbnail}/>
            <Text>Alert with too many buttons</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var AwesomeProject = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },
  fetchData: function () {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true
        });
      })
      .done();
  },
  render: function() {
    if (1) {
      return this.renderLoadingView();
    }

    return (
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          style={styles.listView} />
    );
  },
  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <TouchPart />
        <Text>
          Loading Movies...
        </Text>
      </View>
    );
  },
  renderMovie: function (movie) {
    return (
      <View style={styles.container}>
        <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>
            {movie.title}
          </Text>
          <Text style={styles.year}>
            {movie.year}
          </Text>
        </View>
      </View>
    );
  },
  componentDidMount: function () {
    this.fetchData();
  }
});

var styles = StyleSheet.create({
    button: {
        backgroundColor: '#eeeeee',
        padding: 10
    },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
