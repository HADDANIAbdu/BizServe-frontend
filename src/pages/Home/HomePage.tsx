import { Link } from "react-router-dom";
import badgeImage from "../../assets/img/illustrations/man-with-laptop.png";
import { User } from "../../api/UsersService";
import { FaThLarge } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
interface Props {
  user: User;
}

const HomePage = ({ user }: Props) => {
  
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-xxl-8 mb-6 order-0">
          <div className="card">
            <div className="d-flex align-items-start row">
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title text-primary mb-3">
                    Welcome {user.username} 🎉
                  </h5>
                  <p className="mb-6">Lorem ipsum dolor sit amet</p>
                  <Link
                    to="/profile"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <div className="col-sm-5 text-center text-sm-left">
                <div className="card-body pb-0 px-0 px-md-6">
                  <img
                    src={badgeImage}
                    height="175"
                    className="scaleX-n1-rtl"
                    alt="View Badge User"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-6 mb-6">
        {/* <div className="col-lg-6 col-md-12 col-6 mb-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="card-title d-flex align-items-start justify-content-between mb-4">
                <div className="avatar flex-shrink-0">
                  <img src={walletInfo} alt="wallet info" className="rounded" />
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id={`cardOpt${id}`}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaEllipsisV className="text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby={`cardOpt${id}`}
                  >
                    <a className="dropdown-item" href="#">
                      View More
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <p className="mb-1">{title.toUpperCase()}</p>
              <h4 className="card-title mb-3">$ {amount}</h4>
              <div className="text-success fw-medium">
                <FaArrowUp /> <span>{percentage}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-6 mb-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="card-title d-flex align-items-start justify-content-between mb-4">
                <div className="avatar flex-shrink-0">
                  <img src={walletInfo} alt="wallet info" className="rounded" />
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id={`cardOpt${id}`}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaEllipsisV className="text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby={`cardOpt${id}`}
                  >
                    <a className="dropdown-item" href="#">
                      View More
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <p className="mb-1">{title.toUpperCase()}</p>
              <h4 className="card-title mb-3">$ {amount}</h4>
              <div className="text-success fw-medium">
                <FaArrowUp /> <span>{percentage}</span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-sm-6 col-xl-3">
          <div className="card home-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div className="content-left">
                  <span className="text-heading">Users</span>
                  <div className="d-flex align-items-center my-1">
                    <h4 className="mb-0 me-2">12</h4>
                  </div>
                  <small className="mb-0">Total Users</small>
                </div>
                <div className="avatar">
                  <span className="avatar-initial rounded bg-label-primary">
                    <BsPeople className="fw-bold" size={25} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card home-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div className="content-left">
                  <span className="text-heading">Total services</span>
                  <div className="d-flex align-items-center my-1">
                    <h4 className="mb-0 me-2">14</h4>
                  </div>
                  <small className="mb-0">Last week analytics</small>
                </div>
                <div className="avatar">
                  <span className="avatar-initial rounded bg-label-danger">
                    <FaThLarge size={25} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card home-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div className="content-left">
                  <span className="text-heading">Active Clients</span>
                  <div className="d-flex align-items-center my-1">
                    <h4 className="mb-0 me-2">9</h4>
                  </div>
                  <small className="mb-0">Last week analytics</small>
                </div>
                <div className="avatar">
                  <span className="avatar-initial rounded bg-label-success">
                    <i className="bx bx-user-check bx-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card home-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div className="content-left">
                  <span className="text-heading">Pending Clients</span>
                  <div className="d-flex align-items-center my-1">
                    <h4 className="mb-0 me-2">3</h4>
                  </div>
                  <small className="mb-0">Last week analytics</small>
                </div>
                <div className="avatar">
                  <span className="avatar-initial rounded bg-label-warning">
                    <i className="bx bx-user-voice bx-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
