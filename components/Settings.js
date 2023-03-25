import React from 'react';
import {  View, Text, StyleSheet, ScrollView,} from 'react-native';

const Settings = () => {
  return (
    <ScrollView style={styles.container}>
    <View style={styles.center}>
      <View style={styles.homeView}>
        <Text>Settings</Text>
        </View>
    </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fafafa',
      padding: 0,
      paddingTop: 44,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
});

export default Settings;