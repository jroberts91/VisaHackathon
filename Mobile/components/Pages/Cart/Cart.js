import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import CardBox from '../../Layout/CardBox';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#D6DBDF',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 100,
  },
  footer: {
    backgroundColor: '#00BFFF',
    height: 70,
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

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Shopping Cart</Text>
      </View>
    );
  };

  footer = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.text}>Total Cost: $500</Text>
        <Text style={styles.text}>Shopping Cart</Text>
      </View>
    );
  };

  render() {
    const { users } = this.props;
    return (
      <View style={styles.main}>
        <FlatList
          style={styles.scroll}
          data={users}
          renderItem={({ item }) => <CardBox item={item} />}
          ListHeaderComponent={this.header}
          ListFooterComponent={this.footer}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Cart);
