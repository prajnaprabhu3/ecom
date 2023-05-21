import React, { Fragment, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";

import "../styles/UpdateDetails.scss";

const UpdateDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    dispatch(updateProfile(myForm));
  };

  //   const updateProfileDataChange = (e) => {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(e.target.files[0]);
  //   };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated]);

  return (
    <div className="wrapper">
      <div className="updateDetailsWrapper">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="">
              <div className="updateContainer">
                <h2 className="updateHeading">Update Profile</h2>

                <form
                  className="updateForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      className="updateInput"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      className="updateInput"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Update"
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

export default UpdateDetails;
