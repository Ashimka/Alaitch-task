import { IApiResponse, IProfileData } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useProfile = (token: string) => {
  const [data, setData] = useState<IApiResponse<IProfileData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/profile?token=${token}g`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Access denied.");
      }

      const info: IApiResponse<IProfileData> = await response.json();

      setData(info);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};
