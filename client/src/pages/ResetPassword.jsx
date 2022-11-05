import React, { Fragment, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../actions/userActions";
import { useAlert } from "react-alert";
import {  useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();
    const navigate=useNavigate();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );
    
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
    
      const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token, myForm));
      };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Password Updated Successfully");
    
          navigate("/login");
        }
      }, [dispatch, error, alert, success]);

  return (
    <Fragment>
    {loading ? (
      <Loading />
    ) : (
      <Fragment>
        <div className="">
          <div className="">
            <h2 className="">Reset Password</h2>

            <form
              className=""
              onSubmit={resetPasswordSubmit}
            >
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword