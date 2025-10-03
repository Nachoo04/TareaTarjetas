import ComponenteContador from "@/components/Contador";
import { Text, View } from "react-native";


export default function PaginaContador() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Contador</Text>
      <ComponenteContador />
    </View>
  );
}