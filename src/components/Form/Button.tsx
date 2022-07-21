import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  text: string;
}

function Button({ text, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      width="full"
      backgroundColor="green.700"
      borderRadius="0"
      height="14"
      borderWidth="1"
      borderColor="gray.700"
      _pressed={{ backgroundColor: "green.500" }}
      {...rest}
    >
      <Text fontSize="md" color="gray.100" fontWeight="bold">
        {text}
      </Text>
    </NativeBaseButton>
  );
}

export { Button };
