import { Center, Spinner, VStack } from "native-base";
import Logo from "../../assets/logo_primary.svg";

function Loading() {
  return (
    <Center flex="1" backgroundColor="gray.700">
      <VStack space="10">
        <Logo />
        <Spinner color="green.500" size="lg" />
      </VStack>
    </Center>
  );
}

export { Loading };
