import Galeria from "@/components/Galeria";
import { View } from "react-native";

export default function GaleriaApp(){

  return (
    <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Galeria/>
    </View>
  );
};