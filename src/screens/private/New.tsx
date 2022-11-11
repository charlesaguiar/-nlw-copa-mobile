import { useState } from "react";
import { Heading, Text, useToast } from "native-base";

import { useAuth } from "@hooks/useAuth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";

import { BodyContainer } from "@containers/BodyContainer";
import { ScreenContainer } from "@containers/ScreenContainer";

import PoolService from "@services/PoolService";

import Logo from "@assets/logo.svg";

export default function New() {
  const [title, setPoolTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();

  const toast = useToast();

  const handlePoolCreate = async () => {
    if (!title?.trim()) {
      return toast.show({
        title: "Informe o nome do bolão, seu zé ruela.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    setIsLoading(true);
    try {
      await PoolService.createPool(title);
      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      setPoolTitle("");
    } catch (err) {
      console.log({ err });
      toast.show({
        title: "Não foi possível criar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Header title="Criar novo bolão" />
      <BodyContainer>
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          value={title}
          onChangeText={setPoolTitle}
        />
        <Button
          label="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas!
        </Text>
      </BodyContainer>
    </ScreenContainer>
  );
}
