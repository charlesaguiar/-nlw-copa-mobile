import {
  IButtonProps as INbButtonProps,
  Button as NbButton,
  Text,
} from "native-base";

interface IButtonProps extends INbButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

export function Button({ label, variant = "primary", ...rest }: IButtonProps) {
  return (
    <NbButton
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={variant === "secondary" ? "red.500" : "yellow.500"}
      _pressed={{ bg: variant === "secondary" ? "red.600" : "yellow.600" }}
      _loading={{
        _spinner: { color: variant === "secondary" ? "white" : "black" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        textTransform="uppercase"
        color={variant === "secondary" ? "white" : "black"}
      >
        {label}
      </Text>
    </NbButton>
  );
}
