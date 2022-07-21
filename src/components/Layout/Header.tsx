import { HStack, IStackProps } from "native-base";
import { ReactNode } from "react";

interface HeaderProps extends IStackProps {
  children: ReactNode;
}

function Header({ children, ...rest }: HeaderProps) {
  return (
    <>
      <HStack
        width="full"
        backgroundColor="gray.700"
        alignItems="center"
        paddingTop="12"
        paddingBottom="5"
        paddingX="6"
        shadow="9"
        {...rest}
      >
        {children}
      </HStack>
    </>
  );
}

export { Header };
