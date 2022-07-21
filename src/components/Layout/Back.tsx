import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

function Back() {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  return <IconButton icon={<ArrowLeft size="22" color={colors.gray[200]} />} onPress={goBack} />;
}

export { Back };
