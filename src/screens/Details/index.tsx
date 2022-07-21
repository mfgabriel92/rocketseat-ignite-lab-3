import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { CircleWavyCheck, DesktopTower, Hourglass, Clipboard } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Ticket } from "../../DTOs/Ticket";
import { Button, Input } from "../../components/Form";
import { Header } from "../../components/Layout";
import { Back } from "../../components/Layout/Back";
import { formatDate } from "../../utils/firestoreDateFormat";
import { TicketProps } from "../Home/components/Ticket";
import { TicketCard } from "./TicketCard";

interface RouteParams {
  ticketId: string;
}

interface TicketDetailsProps extends TicketProps {
  description: string;
  solution: string;
  closedAt: string;
}

function Details() {
  const route = useRoute();
  const toast = useToast();
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  const [ticket, setTicket] = useState<TicketDetailsProps>({} as TicketDetailsProps);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [solution, setSolution] = useState<string>("");

  const { ticketId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
      .collection<Ticket>("tickets")
      .doc(ticketId)
      .get()
      .then((document) => {
        const { patrimony, description, status, solution, openedAt, closedAt } = document.data();
        const ticket = {
          id: document.id,
          patrimony,
          description,
          status,
          solution,
          openedAt: formatDate(openedAt),
          closedAt: closedAt ? formatDate(closedAt) : null,
        };

        setTicket(ticket);
        setIsLoading(false);
      });
  }, [ticketId]);

  function handleCloseTicket() {
    if (!solution) {
      return toast.show({ description: "Please, input a solution before closing" });
    }

    setIsLoading(true);
    firestore()
      .collection<Ticket>("tickets")
      .doc(ticketId)
      .update({
        status: "closed",
        solution,
        closedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast.show({ description: "The ticket has been successfully closed" });
        goBack();
      })
      .catch((error) => {
        toast.show({ description: "An error occurred while closing the ticket" });
        console.log(error);
      });
  }

  return (
    <VStack flex="1" backgroundColor="gray.600">
      <Header>
        <Back />
        <Heading color="gray.100" paddingLeft="6">
          Details
        </Heading>
      </Header>

      {isLoading ? (
        <Center flex="1">
          <Spinner color="green.500" size="lg" />
        </Center>
      ) : (
        <>
          <HStack padding="4" backgroundColor="gray.800" justifyContent="center">
            {ticket.status === "closed" ? (
              <>
                <CircleWavyCheck size="25" color={colors.green[500]} />
                <Text color="green.500" textTransform="uppercase" marginLeft="3" fontSize="md">
                  Closed
                </Text>
              </>
            ) : (
              <>
                <Hourglass size="25" color={colors.secondary[700]} />
                <Text color="secondary.700" textTransform="uppercase" marginLeft="3" fontSize="md">
                  Open
                </Text>
              </>
            )}
          </HStack>
          <ScrollView paddingX="3" paddingBottom="1">
            <TicketCard
              title="Equipment"
              description={`Patrimony: ${ticket.patrimony}`}
              icon={DesktopTower}
              footer={ticket.openedAt}
            />
            <TicketCard
              title="Problem description"
              description={ticket.description}
              icon={Clipboard}
            />
            <TicketCard
              title="Solution"
              description={ticket.solution}
              icon={CircleWavyCheck}
              footer={ticket.closedAt && `Closed at ${ticket.closedAt}`}
            >
              {ticket.status === "open" && (
                <Input
                  placeholder="Write here the solution"
                  height="32"
                  multiline
                  textAlignVertical="top"
                  onChangeText={setSolution}
                />
              )}
            </TicketCard>
          </ScrollView>
          <Box padding="6">
            {ticket.status === "open" && (
              <Button text="Save & close" isLoading={isLoading} onPress={handleCloseTicket} />
            )}
          </Box>
        </>
      )}
    </VStack>
  );
}

export { Details };
