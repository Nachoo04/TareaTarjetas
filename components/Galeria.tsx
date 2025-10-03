import Card from "@/components/Card";
import GaleriaModal from "@/components/GaleriaModal";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { getProducts, createProduct, type ProductDTO } from "@/services/api";

type Item = { id: string; title: string; image: ImageSourcePropType; price: number };

export default function Galeria() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [mode, setMode] = useState<"cover" | "contain" | "stretch">("cover");
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // cargar desde backend
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const products: ProductDTO[] = await getProducts();
        if (!alive) return;
        const items: Item[] = products.map(p => ({
          id: p.id,
          title: p.title,
          image: { uri: p.image }, // 👈 adaptación
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
    return () => { alive = false; };
  }, []);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(it => it.title.toLowerCase().includes(q));
  }, [query, data]);

  const toggleFavorite = (id: string) =>
    setFavoritos(prev => {
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

  // opcional: botón para crear 1 item de prueba en el backend
  const crearDummy = async () => {
    try {
      const p = await createProduct({
        title: "Producto demo",
        image: "https://picsum.photos/seed/demo/800/600",
        price: Number((Math.random() * 100 + 10).toFixed(2)),
      });
      // sumarlo al estado local
      setData(curr => [{ id: p.id, title: p.title, image: { uri: p.image }, price: p.price }, ...curr]);
    } catch (e: any) {
      setError(e?.message ?? "Error al crear");
    }
  };

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
              <Button title="Crear producto demo" onPress={crearDummy} />
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
