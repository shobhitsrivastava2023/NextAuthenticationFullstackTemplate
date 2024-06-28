import { LoginButton } from "../../components/auth/login-button";
import { Button } from "../../components/ui/button";
import Image from "next/image";

export default  async function Home() {
  return (
   <main className="flex h-dvh flex-col items-center justify-center bg-gray-900">
    <h1 className="text-5xl font-medium space-x-5 text-red-500 mb-14">
      Welcome to Artestic Auth
    </h1>
    <LoginButton >
    <Button variant="outline" size="lg">
      click me bitch
    </Button>
    </LoginButton>

   </main>
  );
}
