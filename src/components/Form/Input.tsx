import { IInputProps, Input as NativeBaseInput } from "native-base";

function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      backgroundColor="gray.800"
      height="14"
      size="md"
      borderWidth="1"
      borderColor="gray.800"
      fontSize="md"
      fontFamily="body"
      color="gray.100"
      placeholderTextColor="gray.300"
      _focus={{ borderWidth: "1", borderColor: "green.500", backgroundColor: "gray.800" }}
      {...rest}
    />
  );
}

export { Input };
