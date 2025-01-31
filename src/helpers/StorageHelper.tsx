import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('Error storing data' + e);
  }
};

export const getStoredData = async (key: string) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // saving error
    console.log('Error getting data' + e);
  }
};
