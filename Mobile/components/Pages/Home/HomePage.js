import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import CardBox from '../../Layout/CardBox';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#D6DBDF',
  },
  text: {
    flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
  },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {users} = this.props;
    return (
      <View style={styles.main}>
        <FlatList
          style={styles.scroll}
          data={users}
          renderItem={({item}) => <CardBox item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(HomePage);
