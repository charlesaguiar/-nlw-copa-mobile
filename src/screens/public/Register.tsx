import React, { useState } from "react";

import { Center, Heading, Text, VStack } from "native-base";
import { ScreenContainer } from "@containers/ScreenContainer";
import { Header } from "@components/Header";

import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function Register() {
  const [formData, setFormData] = useState<IRegisterFormData>();

  return (
    <ScreenContainer>
      <Header title="Registre-se" showBackButton />

      <Center my={5} p={5}>
        <Logo width={212} height={40} />
        <VStack my={8} alignItems="center" space={5} width="full">
          <Heading color="white" fontFamily="heading">
            Crie seu usuário!
          </Heading>
          <Input placeholder="Nome" />
          <Input placeholder="Email" />
          <Input placeholder="Senha" type="password" />
          <Input placeholder="Confirmação da senha" type="password" />
          <Button label="Registrar" />
        </VStack>
      </Center>
    </ScreenContainer>
  );
}
