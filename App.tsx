import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Parent from "./components/CounterView";

type Child = {
  conte: number;
};

export default function App() {
  return (
    <View style={styles.container}>
      <Parent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
