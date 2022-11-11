import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

interface IFetchState<T> {
  data?: T;
  loading: boolean;
  error?: string;
}

export function useFetch<T>(
  fetcher: (...params: any) => Promise<T>,
  triggerOnFocus = false
): IFetchState<T> {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const effectFn = triggerOnFocus ? useFocusEffect : useEffect;
  const fetchCb = useCallback((...params: any) => fetcher(...params), []);

  const fetchAsyncHandler = async () => {
    try {
      setLoading(true);
      const response = await fetcher();
      setData(response);
    } catch (err) {
    } finally {
    }
  };

  effectFn(() => {
    fetchAsyncHandler();
  }, []);

  return { data, loading, error };
}
