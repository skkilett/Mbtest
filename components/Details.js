import React from 'react';
import {Button,  View, Text, StyleSheet, ScrollView, Alert} from 'react-native';


const Details = () => {

    const onPress = () => {
        Alert.alert('ok!');
      };
  return (
    <ScrollView style={styles.container}>
    <View style={styles.center}>
      <View style={styles.homeView}>
      <Button title="IS it ok?" onPress={onPress} />
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

export default Details;