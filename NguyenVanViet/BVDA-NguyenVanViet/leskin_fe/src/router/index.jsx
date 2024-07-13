import { ShoppingCartOutlined } from "@ant-design/icons";
import About from "../page/About";
import Cart from "../page/Cart";
import Expert from "../page/Expert";
import Home from "../page/Home";
import Post from "../page/Post";
import Service from "../page/Service";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Contact from "../page/Contact";
import DetailService from "../page/DetailService";
import DetailExpert from "../page/DetailExpert";
import DetailPost from "../page/DetailPost";
import Statistic from "../page/Statistic";

export const PUBLIC_ROUTER = [
  {
    key: "home",
    label: "Trang chủ",
    path: "/",
    container: <Home />,
    exact: true,
  },
  // {
  //   key: "about",
  //   label: "Giới thiệu",
  //   path: "/about",
  //   container: <About />,
  //   exact: true,
  // },
  {
    key: "service",
    label: "Dịch vụ",
    path: "/service",
    container: <Service />,
    exact: true,
  },
  {
    key: "expert",
    label: "Chuyên gia",
    path: "/expert",
    container: <Expert />,
    exact: true,
  },
  {
    key: "post",
    label: "Bài viết",
    path: "/post",
    container: <Post />,
    exact: true,
  },
  {
    key: "contact",
    label: "Liên hệ",
    path: "/contact",
    container: <Contact />,
    exact: true,
  },
  {
    key: "signup",
    label: "Đăng ký",
    path: "/signup",
    container: <SignUp />,
    exact: true,
  },
  {
    key: "signin",
    label: "Đăng nhập",
    path: "/signin",
    container: <SignIn />,
    exact: true,
  },
  {
    key: "cart",
    label: "Lịch hẹn",
    path: "/cart",
    container: <Cart />,
    exact: true,
  },
  {
    key: "statistic",
    label: "Thống kê",
    path: "/statistic",
    container: <Statistic/>,
    exact: true,
  }
];

export const PUBLIC_ROUTER_DETAIL = [
  {
    key: "service",
    label: "Dịch vụ",
    path: "/service/:id",
    container: <DetailService />,
    exact: true,
  },
  {
    key: "expert",
    label: "Chuyên gia",
    path: "/expert/:id",
    container: <DetailExpert />,
    exact: true,
  },
  {
    key: "post",
    label: "Bài viết",
    path: "/post/:id",
    container: <DetailPost />,
    exact: true,
  },
];