import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ec] to-white flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-[#2D6A2D] flex items-center justify-center text-white font-bold text-sm">E</div>
          <span className="font-bold text-[#2D6A2D] text-lg">Easy Clean</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
