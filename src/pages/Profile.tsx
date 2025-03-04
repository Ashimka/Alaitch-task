import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useEffect } from "react";

const Profile = () => {
  const { accessToken } = useAuth();
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
              <Button variant="primary" size="sm" className="mr-auto">
                Update
              </Button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            Некоторая информация о пользователе
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
