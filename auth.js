import cookie from "js-cookie";
import Router from "next/router";

export const logout = () => {
  cookie.remove("token");
  Router.push("/login");
};