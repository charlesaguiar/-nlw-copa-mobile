import { Alert, TouchableOpacity } from "react-native";
import {
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

import { useAuth } from "@hooks/useAuth";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { ScreenCenteredContainer } from "@containers/ScreenCenteredContainer";

import Logo from "@assets/logo.svg";

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const { signIn, isUserLoading } = useAuth();

  return (
    <ScreenCenteredContainer>
      <Logo width={212} height={40} />
      <VStack mt={12} space={4} width="full">
        <Input placeholder="Email ou nome de usuário" />
        <Input placeholder="Senha" type="password" />
        <Button label="Entrar" />
        <TouchableOpacity onPress={() => navigate("register")}>
          <Text color="white" alignSelf="flex-end" underline>
            Criar uma conta
          </Text>
        </TouchableOpacity>
      </VStack>

      <Center mt={16} width="full">
        <Divider orientation="horizontal" bg="gray.600" mb={5} />
        <Text color="white">ou, faça login utlizando</Text>
      </Center>

      <HStack space={4} mt={4}>
        <IconButton
          size="lg"
          icon={<Icon as={Fontisto} name="google" color="white" size="lg" />}
          borderRadius="full"
          onPress={signIn}
          disabled={isUserLoading}
          bgColor="red.500"
          _pressed={{ bg: "red.700" }}
        />

        <IconButton
          icon={<Icon as={Fontisto} name="facebook" color="white" size="lg" />}
          size="lg"
          borderRadius="full"
          disabled={isUserLoading}
          bgColor="blue.500"
          onPress={() =>
            Alert.alert(
              "Um dia minha incompetência não vai ser tão grande e eu vou implementar isso."
            )
          }
          _pressed={{ bg: "blue.700" }}
          alignItems="center"
          justifyContent="center"
        />

        <IconButton
          icon={<Icon as={Fontisto} name="spotify" color="white" size="lg" />}
          size="lg"
          borderRadius="full"
          disabled={isUserLoading}
          bgColor="green.500"
          onPress={() =>
            Alert.alert(
              "Um dia minha incompetência não vai ser tão grande e eu vou implementar isso."
            )
          }
          _pressed={{ bg: "green.700" }}
          alignItems="center"
          justifyContent="center"
        />
      </HStack>

      <Text color="white" textAlign="center" mt={12}>
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </ScreenCenteredContainer>
  );
};

export default SignIn;
