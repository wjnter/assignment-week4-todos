import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function CompleteScreen() {
  return (
    <View style={styles.container}>
      <Text>All Screen</Text>
    </View>
  );
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});