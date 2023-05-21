import { Fragment, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

import "../styles/UpdatePassword.scss";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated]);

  return (
    <div className="wrapper">
      <div className="updateDetailsWrapper">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="">
              <div className="updateFormContainer">
                <h2 className="updateHeading">Update Password</h2>

                <form
                  className="updatePasswordForm"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="">
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      className="updateInput"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>

                  <div className="">
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      className="updateInput"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      className="updateInput"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Change"
                    className="updateProfileButton"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
