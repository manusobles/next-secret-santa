import { Metadata } from "next";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>
        Tu regalo será para: <b>{decodedSecret}</b>
      </p>
    </main>
  );
}
