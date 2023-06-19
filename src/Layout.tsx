import { ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
