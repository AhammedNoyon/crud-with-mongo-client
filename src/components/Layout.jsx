import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Header</h3>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
