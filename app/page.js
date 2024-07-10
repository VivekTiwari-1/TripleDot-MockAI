import Image from "next/image";
import Dashboard from "./dashboard/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="text-2xl font-bold my-20 text-center">
        Your Interview Buddy
      </div>
      <Link href={"./dashboard"}>
        <Button>Go to Dashboard</Button>
      </Link>
    </>
  );
}
