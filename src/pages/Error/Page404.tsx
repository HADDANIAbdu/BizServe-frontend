import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className=" container-xxl container-p-y d-flex justify-content-center align-items-center">
          <div className="misc-wrapper">
            <h1
              className="mb-2 mx-2"
              style={{ lineHeight: "6rem", fontSize: "6rem" }}
            >
              404
            </h1>
            <h4 className="mb-2 mx-2">Page Not Found️ ⚠️</h4>
            <p className="mb-6 mx-2">
              we couldn't find the page you are looking for
            </p>
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          </div>
        </div>
        {/* </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page404;
