import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "../../components/Form";
import { Header } from "../../components/Layout";
import { Back } from "../../components/Layout/Back";

function Register() {
  const [patrimony, setPatrimony] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { goBack } = useNavigation();
  const toast = useToast();

  function handleOpenNewTicket() {
    if (!patrimony || !description) {
      return toast.show({ description: "Please, fill in patrimony and description" });
    }

    setIsLoading(true);
    firestore()
      .collection("tickets")
      .add({
        patrimony,
        description,
        openedAt: firestore.FieldValue.serverTimestamp(),
        status: "open",
      })
      .then(() => {
        toast.show({ description: "Ticket successfully opened!" });
        goBack();
      })
      .catch((error) => {
        toast.show({ description: "Error opening the ticket." });
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <VStack flex="1" backgroundColor="gray.600">
      <Header>
        <Back />
        <Heading color="gray.100" paddingLeft="6">
          New ticket
        </Heading>
      </Header>

      <VStack flex="1" padding="3" space="3">
        <Input placeholder="Patrimony #" onChangeText={setPatrimony} />
        <Input
          flex="1"
          placeholder="Problem description"
          multiline
          textAlignVertical="top"
          onChangeText={setDescription}
        />
        <Button text="Register" isLoading={isLoading} onPress={handleOpenNewTicket} />
      </VStack>
    </VStack>
  );
}

export { Register };
