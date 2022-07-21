import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Loading } from "./src/components/Layout";
import { Routes } from "./src/routes";
import { theme } from "./src/styles/theme";

function App() {
  const [roboto] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {roboto ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}

export { App };
