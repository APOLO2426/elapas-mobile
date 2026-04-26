import DefaultScreen from '@/components/Default-screen';
import { StyleSheet, Text } from 'react-native';


export default function TabOneScreen() {
  return (
    <DefaultScreen>
      <Text>
        
      </Text>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
