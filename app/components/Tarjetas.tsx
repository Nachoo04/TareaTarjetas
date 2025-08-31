import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Item = { id: string; title: string };

const DATA: Item[] = [
  { id: "1", title: "Tarjeta 1" },
  { id: "2", title: "Tarjeta 2" },
  { id: "3", title: "Tarjeta 3" },
  { id: "4", title: "Tarjeta 4" },
  { id: "5", title: "Tarjeta 5" },
];

function Card({
  item,
  selected,
  onPress,
}: {
  item: Item;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.cardActive : styles.cardInactive,
      ]}
    >
      <Text style={styles.cardText}>{item.title}</Text>
    </Pressable>
  );
}

export default function TarjetaProp() {
  const [tarjetasPresionadas, setTarjetasPresionadas] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setTarjetasPresionadas(prev =>
      prev.includes(id) ? prev.filter(item => item !== id): [...prev,id]);
  };

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <Card
        item={item}
        selected={tarjetasPresionadas.includes(item.id)}
        onPress={() => {setTarjetasPresionadas(prev =>
      prev.includes(item.id) ? prev.filter(id => id !== item.id): [...prev,item.id]);}}
      />
    ),
    [tarjetasPresionadas, toggleSelection]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        extraData={tarjetasPresionadas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1bd2d8ff" },
  listContent: { paddingHorizontal: 24, paddingVertical: 24 },
  card: {
    height: 84,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 2,
  },
  cardInactive: { backgroundColor: "#0231ffff" },
  cardActive: { backgroundColor: "#133B44" },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
