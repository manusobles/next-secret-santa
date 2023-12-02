import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Secret Santa",
};

function decodeMessage(encodedMessage: string) {
  const urlDecoded = decodeURIComponent(encodedMessage);
  const base64Decoded = Buffer.from(urlDecoded, "base64").toString("utf-8");
  return base64Decoded;
}

export default async function Page({ params }: { params: { code: string } }) {
  const code = params.code;
  const decodedSecret = decodeMessage(code);

  if (!code) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <Image
        src="/header.jpg"
        alt="Header"
        className="absolute inset-x-0 top-0 z-0 w-full"
        width="500"
        height="200"
      />
      <div className="sm:flex sm:items-start z-10 mt-10">
        <div className="text-center sm:mt-10 sm:text-left">
          <h2
            className="text-base text-center font-semibold leading-6 text-gray-900"
            id="modal-title"
          >
            Tu amigo/a invisible es:
          </h2>
          <div className="text-center">
            ¡<b>{decodedSecret}</b>!
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Acuérdate de comprarle un detalle 😊
            </p>
          </div>
        </div>
      </div>
      <Link href="https://github.com/manusobles">
        <div className="inline-flex items-center z-10 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Made with ❤️ by Manu
        </div>
      </Link>
    </main>
  );
}
