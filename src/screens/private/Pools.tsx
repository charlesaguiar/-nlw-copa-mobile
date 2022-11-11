import { useCallback, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Icon, FlatList, useToast, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";

import PoolService from "@services/PoolService";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { PoolCard, PoolPros } from "@components/PoolCard";
import { EmptyPoolList } from "@components/EmptyPoolList";

import { ScreenContainer } from "@containers/ScreenContainer";

export default function Pools() {
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolPros[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  const fetchPools = async () => {
    setIsLoading(true);
    try {
      const response = await PoolService.getPools();
      setPools(response);
    } catch (err) {
      console.log({ err });
      toast.show({
        title: "Não foi possível carregar os bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <ScreenContainer>
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={2}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          label="Buscar bolão por código"
          onPress={() => navigate("find")}
          leftIcon={
            <Icon as={Octicons} name="search" size="md" color="black" />
          }
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </ScreenContainer>
  );
}
