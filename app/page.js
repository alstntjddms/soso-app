import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          소소한 프로젝트
        </h1>
        <p className="text-gray-600 mb-6">
          테스트용 정적 사이트입니다. <br />
        </p>
        <a
          href="/web/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
        >
          둘러보기
        </a>
        <div className="mt-6">
          <p className="text-gray-600 text-sm">
            자세한 정보 및 상담을 원하시면 아래로 문의해주세요.
          </p>
          <div className="flex items-center mt-2">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="2" y1="5" x2="12" y2="12"></line>
                <line x1="22" y1="5" x2="12" y2="12"></line>
              </svg>
            </span>
            <p>naver@naver.com</p>
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-phone"
              >
                <path d="M1 1l6.58 6.58c1.68-3.36 3.58-6.02 5.72-7.92M17.42 6.34C15.34 8.42 12.34 12.28 10.58 14.6C9.56 15.94 8.78 17.18 8.28 18.3C8.1 18.78 8.06 19.24 8.18 19.68L9.34 23.18C9.46 23.62 9.74 24 10.18 24C10.62 24 11 23.78 11.26 23.42L12.7 20.24C12.82 19.9 12.78 19.52 12.58 19.2C11.58 17.68 11.34 16.44 11.5 15.4C11.82 13.38 13.24 11.38 15.26 11C16.34 10.8 17.56 11 18.62 11.58C19.5 12.04 20.26 12.8 20.72 13.78C21.16 14.74 21.16 15.94 20.72 16.92L19.36 19.72C19.18 20.16 19.22 20.72 19.5 21.16C20.02 21.9 20.26 22.74 20.26 23.64C20.26 23.98 20.18 24.32 20 24.64C19.6 25.48 18.8 26 18 26C17.44 26 16.88 25.84 16.38 25.52L1.68 11.76C1.26 11.38 1 10.78 1 10C1 9.22 1.26 8.62 1.68 8.24L16.38 1.36C16.78 1 17.32 0.84 17.88 1C18.48 1.16 19.04 1.64 19.26 2.26L20.64 5.04C20.88 5.72 20.8 6.5 20.44 7C19.92 7.84 19.12 8 18.26 8C17.82 8 17.38 7.88 17 7.64L14.2 6.26C13.58 5.9 12.82 5.84 12 6C11.12 6.16 10.42 6.84 10.12 7.72L8.64 12.8C8.34 13.68 8.6 14.72 9.28 15.36C9.94 16 10.98 16.18 11.88 15.8C12.56 15.48 13 14.72 13 13.84C13 13 12.66 12.26 12 11.8L11.26 11.2"></path>
              </svg>
            </span>
            <p>+82 (10) 1111-1111</p>
          </div>
        </div>
      </div>
    </div>
  );
}
