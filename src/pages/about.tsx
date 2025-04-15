import Button from "@/components/button";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";

export default function DocsPage() {
  const [count, setCount] = useState(0);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="justify-center inline-block max-w-lg text-center">
          <h1 className={title()}>{count}</h1>
          <Button
          // setCount={setCount}
          // style={{
          //   backgroundColor: "blue",
          //   color: "yellow",
          //   padding: "10px",
          //   borderRadius: "10px",
          //   fontWeight: 700,
          // }}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
