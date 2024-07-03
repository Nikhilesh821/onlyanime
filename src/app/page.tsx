import HomeScreen from "@/components/home/homeScreen/homeScreen";
import AuthScreen from "@/components/home/authScreen/authScreen";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const {getUser}=getKindeServerSession()
  const user=await getUser()
  return (
    <h1>
      {user?<HomeScreen/>:<AuthScreen/>}
    </h1>
  );
}
