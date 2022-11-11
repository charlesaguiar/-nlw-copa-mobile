import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";

import PoolService from "@services/PoolService";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";

import { BodyContainer } from "@containers/BodyContainer";
import { ScreenContainer } from "@containers/ScreenContainer";

export default function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  const handleJoinPool = async () => {
    try {
      if (!code?.trim()) {
        return toast.show({
          title: "O código do bolão deve ser informado.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      setIsLoading(true);
      await PoolService.joinPool(code);

      toast.show({
        title: `Parabéns! Agora você participa do bolão ${code}. Boa sorte!!`,
        placement: "top",
        bgColor: "green.500",
      });

      setCode("");
      setIsLoading(false);

      navigate("pools");
    } catch (err) {
      setCode("");
      setIsLoading(false);

      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "Pool not found.") {
        return toast.show({
          title: "Não foi possível buscar o bolão.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (errorMessage === "You already joined this pool.") {
        return toast.show({
          title: "Você já participa desse bolão, sua puta.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível encontrar o bolão.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  return (
    <ScreenContainer>
      <Header title="Buscar por código" showBackButton />
      <BodyContainer>
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>
        <Input
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
          placeholder="Qual código do bolão?"
          mb={2}
        />
        <Button
          label="Buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </BodyContainer>
    </ScreenContainer>
  );
}
