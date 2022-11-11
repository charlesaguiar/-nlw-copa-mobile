import {
  Avatar,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  VStack,
  Text,
} from "native-base";
import {
  SignOut,
  SoccerBall,
  Star,
  SkipForward,
  Trophy,
  UsersThree,
} from "phosphor-react-native";

import { useAuth } from "@hooks/useAuth";

import { Header } from "@components/Header";

import { BodyContainer } from "@containers/BodyContainer";
import { ScreenContainer } from "@containers/ScreenContainer";
import { getUserFirstName, getUsernameInitials } from "@utils/string";

import Logo from "@assets/logo.svg";
import { useCallback } from "react";
import { MenuItem } from "@components/MenuItem";

export default function Profile() {
  const { user, signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <ScreenContainer>
      <Header title="Meu perfil" />
      <BodyContainer>
        <Logo />

        <HStack alignItems="center" alignSelf="flex-start" space={5} mt={5}>
          <Avatar source={{ uri: user.avatarUrl }} size="xl">
            {getUsernameInitials(user.name)}
          </Avatar>
          <Heading fontFamily="heading" color="white">
            {`Olá, ${getUserFirstName(user.name)}!`}
          </Heading>
        </HStack>

        <HStack mt={5} alignItems="center">
          <Center>
            <Heading fontFamily="heading" color="white">
              25
            </Heading>
            <Text color="white">apostas realizadas</Text>
          </Center>
          <Divider orientation="vertical" mx={10} bg="gray.600" thickness="2" />
          <Center>
            <Heading fontFamily="heading" color="white">
              68
            </Heading>
            <Text color="white">bolões ativos</Text>
          </Center>
        </HStack>

        <VStack width="full" space={5} alignSelf="flex-start" mt={10}>
          <MenuItem
            icon={<SoccerBall color="white" size={30} />}
            label="Meus bolões"
          />
          <MenuItem
            icon={<Trophy color="white" size={30} />}
            label="Rankings"
          />
          <MenuItem
            icon={<Star color="white" size={30} />}
            label="Resultados"
          />
          <MenuItem
            icon={<SkipForward color="white" size={30} />}
            label="Próximos jogos"
          />
          <MenuItem
            icon={<UsersThree color="white" size={30} />}
            label="Comunidade"
          />
          <Box borderTopWidth={2} borderTopColor="gray.600" mt={10} pt={5}>
            <MenuItem
              icon={<SignOut color="white" size={30} />}
              label="Logout"
              onPress={handleSignOut}
            />
          </Box>
        </VStack>
      </BodyContainer>
    </ScreenContainer>
  );
}
