import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";
const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={props.className}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
