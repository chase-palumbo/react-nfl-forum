import { useRouteError } from "react-router-dom";

import NavBar from "../components/Layout/NavBar";
import Error from "../components/UI/Error";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <NavBar />
      <hr />
      <Error errorDetails={error}/>
    </div>
  )
};

export default ErrorPage;