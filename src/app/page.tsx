import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>public page</h1>

      <Link href={"./login"}>
        <p>login</p>
      </Link>
    </div>
  );
}
