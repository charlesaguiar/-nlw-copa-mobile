import { api } from "@lib/api";
import { IPool } from "@models/index";

const getPools = async () => {
  const response = await api.get<{ pools: IPool[] }>("/pools");
  return response.data.pools;
};

const getPoolDetails = async (id: string) => {
  const response = await api.get<{ pool: IPool }>(`/pools/${id}`);
  return response.data.pool;
};

const createPool = async (title: string) => api.post("/pools", { title });

const joinPool = async (code: string) => api.post("pools/join", { code });

const PoolService = {
  getPools,
  getPoolDetails,
  createPool,
  joinPool,
};

export default PoolService;
