import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

import ModalRequest from "@/components/ModalRequest";
import { IApiResponse, IErrorData, IQuoteData } from "@/types";

const Profile = () => {
  const { accessToken } = useAuth();
  const [quoteResult, setQuoteResult] = useState<IApiResponse<
    IQuoteData | IErrorData
  > | null>(null);

  const handleResultChange = (
    result: IApiResponse<IQuoteData | IErrorData> | null
  ) => {
    setQuoteResult(result); // Сохраняем результат в состоянии родительского компонента
  };

  const { data, error, loading } = useProfile(accessToken);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <>
      {loading && <>Loading...</>}
      {error && <>Ошибка {error}</>}
      {data?.success && (
        <>
          <div className="flex items-center p-5">
            <img
              src={`${data.data?.avatar || "/assets/user_avatar.jpg"}`}
              alt="User"
              className="w-16 h-16 rounded-full mr-5"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">{`Welcome, ${
                data.data.fullname.split(" ")[0]
              }!`}</h2>
              <ModalRequest onResultChange={handleResultChange} />
            </div>
          </div>
          {quoteResult?.success && (
            <q>{(quoteResult.data as IQuoteData).quote}</q>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
