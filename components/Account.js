import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { getItemFromAsyncStorage } from './AsyncStorageMethods';
import { useNavigation } from '@react-navigation/native';

export default function Account({ route }) {
  const [lastSavedUser, setLastSavedUser] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const getLastSavedUser = async () => {
      try {
        const storedUsers = await getItemFromAsyncStorage('users');
        if (storedUsers && storedUsers.length > 0) {
          const lastUser = storedUsers[storedUsers.length - 1];
          setLastSavedUser(lastUser);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLastSavedUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last saved user:</Text>
      {lastSavedUser && (
        <View style={styles.userContainer}>
          <Image source={{ uri: lastSavedUser.userAvatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{lastSavedUser.name}</Text>
            <Text style={styles.userEmail}>{lastSavedUser.email}</Text>
          </View>
        </View>
      )}
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});
