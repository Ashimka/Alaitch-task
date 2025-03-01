import { useInfo } from "@/hooks/useInfo";

const Home = () => {
  const { data, error, loading } = useInfo();

  return (
    <>
      {loading && <div>Загрузка...</div>}

      {error && <div>Ошибка: {error}</div>}
      {data && (
        <>
          <p
            className="font-medium text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: data.info }}
          />
        </>
      )}
    </>
  );
};

export default Home;
