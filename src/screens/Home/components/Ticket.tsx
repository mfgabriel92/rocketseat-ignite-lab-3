import { Circle, HStack, IPressableProps, Pressable, Text, useTheme, VStack } from "native-base";
import { CircleWavyCheck, ClockAfternoon, Hourglass } from "phosphor-react-native";

export interface TicketProps {
  id: string;
  patrimony: string;
  openedAt: string;
  status: "open" | "closed";
}

interface Props extends IPressableProps {
  data: TicketProps;
}

function Ticket({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const colorByStatus = data.status === "open" ? colors.secondary[700] : colors.green[500];

  return (
    <Pressable marginBottom="2" {...rest}>
      <HStack
        backgroundColor="gray.700"
        space="5"
        alignItems="center"
        justifyContent="space-between"
        overflow="hidden"
        paddingRight="5"
      >
        <VStack
          paddingY="4"
          space="1"
          borderLeftColor={colorByStatus}
          borderLeftWidth="8"
          paddingX="5"
        >
          <Text color="gray.200" fontSize="md">
            Patrimony: {data.patrimony}
          </Text>
          <HStack alignItems="center" space="2">
            <ClockAfternoon color={colors.gray[300]} size={18} />
            <Text color="gray.300">{data.openedAt}</Text>
          </HStack>
        </VStack>

        <Circle backgroundColor="gray.500" width="12" height="12">
          {data.status === "open" ? (
            <Hourglass size={24} color={colorByStatus} />
          ) : (
            <CircleWavyCheck size={24} color={colorByStatus} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}

export { Ticket };
