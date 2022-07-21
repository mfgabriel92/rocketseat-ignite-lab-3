import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme, useToast } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import { Alert } from "react-native";
import Logo from "../../assets/logo_primary.svg";
import { Input, Button } from "../../components/Form";

function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  function handleSignInClick() {
    if (!email || !password) {
      return toast.show({ description: "You must enter your email and password" });
    }

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        toast.show({ description: "E-mail or password do not match" });
        setIsLoading(false);
      });
  }

  return (
    <VStack flex="1" alignItems="center" backgroundColor="gray.600" paddingX="8" paddingTop="24">
      <Logo />
      <Heading color="gray.100" fontSize="xl" marginTop="20" marginBottom="6">
        Access your account
      </Heading>
      <VStack width="full" space="2">
        <Input
          placeholder="E-mail"
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} marginLeft="4" />}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} marginLeft="4" />}
          value={password}
          onChangeText={setPassword}
        />
        <Button text="Sign in" marginTop="1" onPress={handleSignInClick} isLoading={isLoading} />
      </VStack>
    </VStack>
  );
}

export { SignIn };
