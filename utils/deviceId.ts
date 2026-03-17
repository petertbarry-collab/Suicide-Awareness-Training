import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'raven_device_id';

export async function getDeviceId(): Promise<string> {
  let id = await AsyncStorage.getItem(KEY);
  if (!id) {
    id = 'device-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    await AsyncStorage.setItem(KEY, id);
  }
  return id;
}
