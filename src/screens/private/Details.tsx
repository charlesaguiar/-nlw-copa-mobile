import { useEffect, useState } from "react";
import { Share } from "react-native";
import { VStack, useToast, HStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import PoolService from "@services/PoolService";
import { IPool } from "@models/index";

import { Header } from "@components/Header";
import { PoolHeader } from "@components/PoolHeader";
import { EmptyMyPoolList } from "@components/EmptyMyPoolList";
import { Option } from "@components/Option";
import { Guesses } from "@components/Guesses";

import { BodyContainer } from "@containers/BodyContainer";
import { ScreenContainer } from "@containers/ScreenContainer";

export default function Details() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [isLoading, setIsLoading] = useState(false);
  const [pool, setPool] = useState<IPool>({} as IPool);
  const [selectedOption, setSelectedOption] = useState<"guesses" | "ranking">(
    "guesses"
  );

  const toast = useToast();

  const fetchPoolDetails = async () => {
    setIsLoading(true);
    try {
      const response = await PoolService.getPoolDetails(id);
      setPool(response);
    } catch (err) {
      console.log({ err });
      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeShare = async () => {
    await Share.share({
      message: pool.code,
    });
  };

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  return (
    <ScreenContainer>
      <Header
        title={pool?.title || ""}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pool._count?.participants > 0 ? (
        <BodyContainer>
          <PoolHeader data={pool} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={selectedOption === "guesses"}
              onPress={() => setSelectedOption("guesses")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={selectedOption === "ranking"}
              onPress={() => setSelectedOption("ranking")}
            />
          </HStack>
          <Guesses poolId={pool.id} poolCode={pool.code} />
        </BodyContainer>
      ) : (
        <EmptyMyPoolList code={pool.code} />
      )}
    </ScreenContainer>
  );
}
