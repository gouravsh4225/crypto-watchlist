import React from "react";
import { Header } from "../Components/Header/Header";

type HeaderFooterLayoutType = {
  children: React.ReactNode;
};
const HeaderFooterLayout = (props: HeaderFooterLayoutType) => {
  const { children } = props;
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export { HeaderFooterLayout };
