import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

const PublicLayout = () => {
  return (
   <div className="flex flex-col h-screen justify-between">
        <Header />
        <div className="flex-1 bg-gray-100">
          <div className="h-full">
            <Outlet />
          </div>
        </div>
        <Footer />
   </div>
  );
};

export default PublicLayout;