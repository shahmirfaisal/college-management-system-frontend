import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const withAuth = (WrappedComponent) => {
  return (isAuth) => {
    return (props) => {
      const { replace } = useHistory();
      const isLogin = useSelector((state) => state.admin.isLogin);

      useEffect(() => {
        console.log(isAuth, isLogin);
        if (isAuth && !isLogin) replace("/");
        else if (!isAuth && isLogin) replace("/");
      }, [isAuth, isLogin]);

      return <WrappedComponent {...props} />;
    };
  };
};
