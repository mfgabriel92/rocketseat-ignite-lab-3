import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { ChatTeardropDots, SignOut } from "phosphor-react-native";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo_secondary.svg";
import { Button } from "../../components/Form";
import { Header } from "../../components/Layout";
import { formatDate } from "../../utils/firestoreDateFormat";
import { Filter } from "./components/Filter";
import { Ticket, TicketProps } from "./components/Ticket";

function Home() {
  const toast = useToast();
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("tickets")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((document) => {
          const { patrimony, description, openedAt, status } = document.data();

          return {
            id: document.id,
            patrimony,
            description,
            openedAt: formatDate(openedAt),
            status,
          };
        });

        setTickets(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  function handleNavigateToNewTicketScreen() {
    navigate("Register");
  }

  function handleNavigateToDetailsScreen(ticketId: string) {
    navigate("Details", { ticketId });
  }

  function handleSignOut() {
    auth()
      .signOut()
      .catch((error) => toast.show(error));
  }

  return (
    <VStack flex="1" backgroundColor="gray.600">
      <Header justifyContent="space-between">
        <Logo />
        <IconButton icon={<SignOut size="26" color={colors.gray[200]} />} onPress={handleSignOut} />
      </Header>

      <VStack flex="1" paddingX="3" paddingBottom="6">
        <HStack
          width="full"
          marginTop="8"
          marginBottom="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.200">My tickets</Heading>
          {isLoading ? (
            <Text color="gray.300">-</Text>
          ) : (
            <Text color="gray.300">{tickets.length}</Text>
          )}
        </HStack>

        <HStack space="3">
          <Filter
            title="Open"
            type="open"
            isActive={statusSelected === "open"}
            onPress={() => setStatusSelected("open")}
          />
          <Filter
            title="Closed"
            type="closed"
            isActive={statusSelected === "closed"}
            onPress={() => setStatusSelected("closed")}
          />
        </HStack>

        {!isLoading ? (
          <FlatList
            marginTop="8"
            data={tickets}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 25 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropDots color={colors.gray[300]} size={72} />
                <Text color="gray.300" fontSize="lg" marginTop="3" textAlign="center">
                  There are no {statusSelected} {"\n"}
                  tickets yet.
                </Text>
              </Center>
            )}
            renderItem={({ item }) => (
              <Ticket data={item} onPress={() => handleNavigateToDetailsScreen(item.id)} />
            )}
          />
        ) : (
          <Center flex="1">
            <Spinner color="green.500" size="lg" />
          </Center>
        )}

        <Button text="New ticket" onPress={handleNavigateToNewTicketScreen} />
      </VStack>
    </VStack>
  );
}

export { Home };
