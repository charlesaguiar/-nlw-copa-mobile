import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Text } from "native-base";

interface IMenuItemProps extends TouchableOpacityProps {
  label: string;
  icon: React.ReactNode;
}

export function MenuItem({ label, icon, ...rest }: IMenuItemProps) {
  return (
    <HStack alignItems="center" space={3}>
      {icon}
      <TouchableOpacity {...rest}>
        <Text fontFamily="heading" color="white">
          {label}
        </Text>
      </TouchableOpacity>
    </HStack>
  );
}
