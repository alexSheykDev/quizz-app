import { ReactNode } from "react";
import Header from "@/components/layout/Header";

interface QuestionLayoutProps {
  children: ReactNode;
}

export default function QuestionLayout({ children }: QuestionLayoutProps) {
  return (
    <main className="bg-[#FFF0F0] min-h-screen">
      <Header />
      {children}
    </main>
  );
}
