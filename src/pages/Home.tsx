import { useAuthApi } from "@/api/auth/auth.api";

const Home = () => {
  const { isAuth, user } = useAuthApi();
  console.log(isAuth, user);
  return <div>Home</div>;
};

export default Home;
