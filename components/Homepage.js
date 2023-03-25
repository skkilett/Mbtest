import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, SectionList } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { getItemFromAsyncStorage, storeItemToAsyncStorage} from './AsyncStorageMethods.js';

export default function Homepage({ }) {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      axios
        .get(`https://moduleblocks.net/testing/Users.json?page=${page}&limit=8`)
        .then((response) => {
          const filteredUsers = response.data.filter((newUser) => {
            const existingUserIndex = users.findIndex((storedUser) => storedUser._id === newUser._id);
            return existingUserIndex === -1;
          });
  
          setUsers((prevUsers) => [...prevUsers, ...filteredUsers]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [page, isFocused]);

  const handleLoadMore = () => {
    const currentPageSize = page * 8;
    if (users.length < currentPageSize) {
      setPage(prevPage => prevPage);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userId}>ID: {item._id}</Text>
      </View>
      <TouchableOpacity onPress={() => saveUserToLocalStorage(item)}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );



  const saveUserToLocalStorage = async (user) => {
    try {
      const storedUsers = await getItemFromAsyncStorage('users');
      const existingUserIndex = storedUsers.findIndex((storedUser) => storedUser._id === user._id);
  
      if (existingUserIndex > -1) {
        const updatedUsers = [...storedUsers];
        updatedUsers[existingUserIndex] = user;
        await storeItemToAsyncStorage('users', updatedUsers);
        console.log('User updated in local storage:', user);
      } else {
        const updatedUsers = storedUsers ? [...storedUsers, user] : [user];
        await storeItemToAsyncStorage('users', updatedUsers);
        console.log('User saved to local storage:', user);
      }
      navigation.navigate('My account', { userData:user });
    } catch (error) {
      console.log(error);
    }
  };
  const sections = [
    { data: users, renderItem: renderUserItem, keyExtractor: (item) => item._id },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item._id + index}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Text>Loading...</Text>}
      renderSectionHeader={() => <View />}
    />
  );
}

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
  homeView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userId: {
    fontSize: 12,
    color: '#999',
  },
});
