import LadingPage from "@/section/home-page";

export const revalidate = 10;

export default async function Home({}: {}) {
  return (
    <div>
      <LadingPage />
    </div>
  );
}
