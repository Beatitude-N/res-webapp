import Image from "next/image";
import HomePage from './pages/home/page';
import Link from "next/link";

export default function Home() {
  return (
    <main>
  <h1>Hello world!</h1>
  <Link href="/pages/home">Home Page</Link>
    </main>
  );
}
