import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [inputInfo, setInputInfo] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGoalInput = (enteredText) => {
    setInputInfo(enteredText);
  };

  const handleAddGoal = () => {
    setGoals((currentGoals) => [...currentGoals, inputInfo]);
    setInputInfo("");
    setIsModalVisible(false)
  };

  const handleDelete = (index) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((_, i) => i !== index);
    });
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
    setInputInfo("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add Goal" onPress={handleModal} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="write your goal here !"
            onChangeText={handleGoalInput}
            value={inputInfo}
          />
          <Button title="Cancel" onPress={handleModal} />
          <Button title="Add Goal" onPress={handleAddGoal} />
        </View>
      </Modal>
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={goals}
          keyExtractor={(item, index) => index}
          renderItem={(itemData) => (
            <View style={styles.goalItem}>
              <Pressable
                onPress={() => handleDelete(itemData.index)}
                android_ripple={{ color: "black" }}
                style={({ pressData }) => pressData && styles.pressedItem}
              >
                <Text style={{ color: "white" }}>{itemData.item}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 50,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "#ccc",
  },
  goalItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "purple",
    borderColor: "black",
    width: "100%",
    borderRadius: 6,
  },
  goalsContainer: {
    flex: 5,
    width: "100%",
    paddingHorizontal: 20,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
