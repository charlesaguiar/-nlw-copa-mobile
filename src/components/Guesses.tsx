import { useEffect, useState } from "react";
import { FlatList, useToast } from "native-base";

import { api } from "@lib/api";

import { Game, GameProps } from "./Game";
import { EmptyMyPoolList } from "./EmptyMyPoolList";

interface Props {
  poolId: string;
  poolCode: string;
}

export function Guesses({ poolId, poolCode }: Props) {
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);

  const toast = useToast();

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<{ games: GameProps[] }>(
        `/pools/${poolId}/games`
      );
      setGames(response.data.games);
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

  const handleGuessConfirm = async (gameId: string) => {
    try {
      setIsLoading(true);
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title:
            "Você deve informa o placar do jogo para submeter seu palpite.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite realizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      setFirstTeamPoints("");
      setSecondTeamPoints("");
      await fetchGames();
    } catch (err) {
      console.log({ err });
      toast.show({
        title: "Não foi possível enviar o palpite",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          isLoading={isLoading}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPoolList code={poolCode} />}
    />
  );
}
