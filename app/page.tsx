import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-4xl font-bold">Gian Kenar Javier</h1>
        <h2 className="text-2xl text-gray-600">535240066</h2>
      </main>
    </div>
  );
}
