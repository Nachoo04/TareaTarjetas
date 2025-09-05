import TextInputExample from "@/components/CambiarNombre";
import { View } from "react-native";

export default function Perfil(){

  return (
    <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <TextInputExample></TextInputExample>
    </View>
  );
};

