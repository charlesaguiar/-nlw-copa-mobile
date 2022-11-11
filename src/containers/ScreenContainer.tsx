import { VStack } from "native-base";
import { IContainerProps } from ".";

export function ScreenContainer({ children }: IContainerProps) {
  return (
    <VStack flex={1} bgColor="gray.900">
      {children}
    </VStack>
  );
}
