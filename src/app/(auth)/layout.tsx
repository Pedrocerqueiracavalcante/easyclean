import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ec] to-white flex flex-col">
      <div className="p-6">
        <Link href="/" className="inline-flex w-fit items-center rounded-xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-[#dbe8d4]">
          <Image
            src="/easyclean-logo.png"
            alt="Easy Clean"
            width={150}
            height={54}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
