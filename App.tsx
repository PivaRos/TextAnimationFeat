import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

enum Extarpolate {
  clamp = "clamp",
  extend = "extend",
  identity = "identity",
}

export default function App() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    console.log(scrollOffsetY);
  }, [scrollOffsetY]);

  const TransformTextY = scrollOffsetY.interpolate({
    inputRange: [0, 70, 180],
    outputRange: [45, 20, 0],
    extrapolateRight: Extarpolate.clamp,
    extrapolateLeft: Extarpolate.clamp,
  });
  const TransformTextX = scrollOffsetY.interpolate({
    inputRange: [0, 60, 150],
    outputRange: [-130, -120, -10],
    extrapolateRight: Extarpolate.clamp,
    extrapolateLeft: Extarpolate.clamp,
  });

  const TransformTextScale = scrollOffsetY.interpolate({
    inputRange: [0, 150],
    outputRange: [1.5, 1],
    extrapolateRight: Extarpolate.clamp,
    extrapolateLeft: Extarpolate.extend,
  });

  const FadeText = scrollOffsetY.interpolate({
    inputRange: [20, 40, 50, 130, 150],
    outputRange: [1, 0.2, 0, 0, 1],
    extrapolateRight: Extarpolate.clamp,
    extrapolateLeft: Extarpolate.extend,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text
        style={{
          zIndex: 10,
          padding: 10,
          fontSize: 18,
          fontWeight: "500",
          transform: [
            { translateY: TransformTextY },
            { translateX: TransformTextX },
            { scale: TransformTextScale },
          ],
          opacity: FadeText,
        }}
      >
        Messages
      </Animated.Text>
      <ScrollView
        contentContainerStyle={{ height: 1000 }}
        scrollEventThrottle={16}
        style={{ width: "100%", backgroundColor: "red" }}
        onScroll={(event) => {
          scrollOffsetY.setValue(event.nativeEvent.contentOffset.y);
        }}
      >
        <View style={{ position: "absolute", top: 50 }}>
          <Text>some content</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
