import { Box, HStack, Text, useTheme, VStack } from "native-base";
import { IconProps } from "phosphor-react-native";
import React, { ReactNode } from "react";

interface TicketCardProps {
  title: string;
  icon: React.ElementType<IconProps>;
  description?: string;
  footer?: string;
  children?: ReactNode;
}

function TicketCard({ title, icon: Icon, description, footer = null, children }: TicketCardProps) {
  const { colors } = useTheme();

  return (
    <VStack backgroundColor="gray.700" padding="5" marginTop="5" borderRadius="sm" space="3">
      <HStack alignItems="center" space="3">
        <Icon color={colors.primary[700]} />
        <Text color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>

      {!!description && (
        <Text color="gray.200" fontSize="md">
          {description}
        </Text>
      )}

      {children && children}

      {!!footer && (
        <Box borderTopWidth="1" borderTopColor="gray.400" paddingTop="2">
          <Text color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}

export { TicketCard };
