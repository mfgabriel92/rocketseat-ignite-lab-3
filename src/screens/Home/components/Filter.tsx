import { Button, IButtonProps, Text, useTheme } from "native-base";

interface FilterProps extends IButtonProps {
  title: string;
  isActive?: boolean;
  type: "open" | "closed";
}

function Filter({ title, isActive = false, type, ...rest }: FilterProps) {
  const { colors } = useTheme();
  const colorByType = type === "open" ? colors.secondary[700] : colors.green[500];
  const colorByStatus = isActive ? colorByType : "gray.300";

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? "1" : "0"}
      borderColor={colorByType}
      borderRadius="0"
      backgroundColor="gray.700"
      flex="1"
      size="sm"
      {...rest}
    >
      <Text color={colorByStatus} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>
    </Button>
  );
}

export { Filter };
