import React, { useContext } from "react";
import { Navigate } from "react-router";

import { AuthContext } from "../context/AuthContext";

type Props = {
  children: any
};
const PublicRouter = ({children} : Props) => {
  const { log } = useContext(AuthContext);

  return !log.log ? children : <Navigate to="/heroes" />;
};

export default PublicRouter;
