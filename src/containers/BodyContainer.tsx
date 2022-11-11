import { VStack } from "native-base";
import { IContainerProps } from ".";

export function BodyContainer({ children }: IContainerProps) {
  return (
    <VStack p={5} alignItems="center">
      {children}
    </VStack>
  );
}
