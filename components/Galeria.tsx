import Card from "@/components/Card";
import CreateProductModal from "@/components/CrearProducto";
import GaleriaModal from "@/components/GaleriaModal";
import { getProducts, type ProductDTO } from "@/services/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Item = { id: string; title: string; image: ImageSourcePropType; price: number };

export default function Galeria() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [mode, setMode] = useState<"cover" | "contain" | "stretch">("cover");
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);


  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const products: ProductDTO[] = await getProducts();
        const items: Item[] = products.map((p) => ({
          id: p.id,
          title: p.title,
          image: { uri: p.image },
          price: p.price,
        }));
        setData(items);
        setError(null);
      } catch (e: any) {
        setError(e?.message ?? "Error");
      } finally {
        alive && setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((it) => it.title.toLowerCase().includes(q));
  }, [query, data]);

  const toggleFavorite = (id: string) =>
    setFavoritos((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <Card
        item={item}
        isFavorite={favoritos.has(item.id)}
        onPress={() => setSelectedItem(item)}
        onLongPress={() => toggleFavorite(item.id)}
      />
    ),
    [favoritos]
  );

  const closeModal = () => setSelectedItem(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.searchBox}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar por título..."
              placeholderTextColor="#888"
              style={styles.searchInput}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />

            {loading ? (
              <Text style={styles.resultsText}>Cargando…</Text>
            ) : error ? (
              <Text style={[styles.resultsText, { color: "#f55" }]}>Error: {error}</Text>
            ) : query ? (
              <Text style={styles.resultsText}>{filteredData.length} resultados</Text>
            ) : null}

            <View style={{ marginTop: 8 }}>
              <Button title="Nuevo producto" onPress={() => setShowCreate(true)} />
            </View>
          </View>
        }
        stickyHeaderIndices={[0]}
      />

      <GaleriaModal
        item={selectedItem}
        mode={mode}
        cambiarModo={setMode}
        cerrarModal={closeModal}
      />

      <CreateProductModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(created: any) => {
          setData((curr) => [created, ...curr]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBox: { backgroundColor: "#1b1b1b", padding: 12 },
  searchInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#3a3a3a",
  },
  resultsText: { marginTop: 6, color: "#bbb", fontSize: 12 },
});
