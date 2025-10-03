import {
    ImageSourcePropType,
} from "react-native";


type Item = { id: string; title: string; image: ImageSourcePropType; price: number };

export const DATA: Item[] = [
  { id: "1", title: "Coca Cola", image: require("../assets/cocacola.png"), price: 10 },
  { id: "2", title: "Pepsi", image: require("../assets/pepsi.png"), price: 12 },
  { id: "3", title: "Fanta", image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ6OBfTWkIslL48co4uwgiz1QqfWeIrU1nKg&s" }, price: 11 },
  { id: "4", title: "Sprite", image: { uri: "https://i.pinimg.com/736x/f6/7e/38/f67e38f6db1f0c5ba7b57d242e81c1c0.jpg" }, price: 9 },
  { id: "5", title: "Agua Villavicencio", image: require("../assets/agua.png"), price: 7 },
  { id: "6", title: "Cepita Naranja", image: require("../assets/cepita.png"), price: 14 },
  { id: "7", title: "Red Bull", image: { uri: "https://i5.walmartimages.com/seo/Red-Bull-Energy-Drink-189mg-Caffeine-20-fl-oz-Can_beb7fd14-9609-412c-812d-50f0f5891bef.f7c3d96ccbafc845b0a3e34b828a51ed.jpeg" }, price: 25 },
  { id: "8", title: "Monster Energy", image: { uri: "https://e7.pngegg.com/pngimages/91/513/png-clipart-monster-energy-energy-drink-fizzy-drinks-red-bull-juice-monster-shake-food-juice.png" }, price: 22 },
  { id: "9", title: "Schweppes", image: { uri: "https://img.cdndsgni.com/preview/12859102.jpg" }, price: 13 },
  { id: "10", title: "7Up", image: { uri: "https://www.citypng.com/public/uploads/preview/hd-7up-soda-can-png-704081694866428y76tnzsnns.png" }, price: 10 },
  { id: "11", title: "Bonaqua", image: { uri: "https://www.coca-cola.com/content/dam/onexp/za/en/brand-desktop/BonAqua/bonaqua-still-desktop.png" }, price: 8 },
  { id: "12", title: "Gatorade", image: { uri: "https://www.vhv.rs/dpng/d/455-4554793_gatorade-png-transparent-png.png" }, price: 16 },
  { id: "13", title: "Powerade", image: { uri: "https://w7.pngwing.com/pngs/69/718/png-transparent-powerade-bottle-thumbnail.png" }, price: 15 },
  { id: "14", title: "Levité", image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jiV7-fnjDC6vJfbfLX-dfqvhggvum4Nsmw&s" }, price: 9 },
  { id: "15", title: "Tang Durazno", image: require("../assets/tang.png"), price: 6 },
  { id: "16", title: "Clight", image: { uri: "https://jumboargentina.vtexassets.com/arquivos/ids/568986-800-600?v=637152600926570000&width=800&height=600&aspect=true" }, price: 5 },
  { id: "17", title: "Villa del Sur Levité", image: { uri: "https://www.villadelsur.com.ar/img/productos/VDS-600cc.png" }, price: 10 },
  { id: "18", title: "Villavicencio con gas", image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqy-M5ijL7DLvRP6AvOaSf70ZvLIRbpPw5w&s" }, price: 11 },
  { id: "19", title: "Cunnington", image: { uri: "https://lh4.googleusercontent.com/proxy/MUsgLDtQLR2wZLVPXKRBkUX-200mSHzqWxiSKRduoeTvffAETNviXDXdbXVcSQAI7zMekRxazybxiS3D3EDly2LBdu5KJiqYmtUfGuR3Wj7RXRXLdiciZRSJbg" }, price: 9 },
  { id: "20", title: "Paso de los Toros", image: { uri: "https://alfanea.com.ar/wp-content/uploads/2020/09/Paso-de-Los-Toros-Tonica-x-1.5-L-478x550.webp" }, price: 12 },
];