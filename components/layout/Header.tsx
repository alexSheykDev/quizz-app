import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center h-11 mb-5 px-4 md:px-20">
      <button onClick={() => router.back()} className="appearance-none">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 12L15 4.5L16.05 5.55L9.6 12L16.05 18.45L15 19.5L7.5 12Z"
            fill="#1A1A1A"
          />
        </svg>
      </button>

      <div>
        <Image width={24} height={24} src="/logo_black.png" alt="Image Logo" />
      </div>
      <div />
    </header>
  );
};

export default Header;
