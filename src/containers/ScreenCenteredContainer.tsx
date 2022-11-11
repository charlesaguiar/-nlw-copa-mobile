import { Center } from "native-base";
import { IContainerProps } from ".";

export function ScreenCenteredContainer({ children }: IContainerProps) {
  return (
    <Center flex={1} p={5} bgColor="gray.900">
      {children}
    </Center>
  );
}
