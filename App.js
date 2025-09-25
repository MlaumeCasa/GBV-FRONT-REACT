import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Greet from "./components/Greet"; 

export default function App() {
  return (
    <View style={styles.container}>
      <Greet />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "plum", 
  },
});
