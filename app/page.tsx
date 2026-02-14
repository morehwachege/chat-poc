import Image from "next/image";
import Login from "./components/Login";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-200 h-120 rounded-md border border-gray-600 bg-[#1F2535] pt-10 flex justify-center flex-col">
        <p className="text-center text-xl font-semibold">
          Sign in to your account
        </p>
        <Login />
      </div>
    </div>
  );
}
