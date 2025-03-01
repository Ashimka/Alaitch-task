import { useInfo } from "@/hooks/useInfo";
import { useEffect } from "react";

const Home = () => {
  const { data, error, loading } = useInfo();

  useEffect(() => {
    document.title = "About as";
  }, []);

  return (
    <>
      {loading && <div>Загрузка...</div>}

      {error && <div>Ошибка: {error}</div>}
      {data?.success && (
        <>
          <p
            className="font-medium text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: data.data.info }}
          />
        </>
      )}
    </>
  );
};

export default Home;
