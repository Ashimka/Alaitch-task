import { useCallback, useEffect, useState } from "react";
import { IApiResponse, IAuthorData } from "@/types";

export const useAuthorId = (token: string) => {
  const [data, setData] = useState<IApiResponse<IAuthorData> | null>(null);

  const fetchData = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/author?token=${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Access denied.");
      }

      const authors: IAuthorData[] = await response.json();

      setData({
        success: true,
        data: authors[Math.floor(Math.random() * authors.length)],
      });
    } catch (err) {
      console.log(err);

      // if (err instanceof Error) {
      //   setError(err.message);
      // } else {
      //   setError("An unknown error occurred.");
      // }
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { author: data };
};
