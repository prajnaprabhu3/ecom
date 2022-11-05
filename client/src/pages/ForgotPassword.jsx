import { Fragment, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../actions/userActions";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, message, loading } = useSelector(
      (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
    {loading ? (
      <Loading />
    ) : (
      <Fragment>
        <div className="">
          <div className="">
            <h2 className="">Forgot Password</h2>

            <form
              className=""
              onSubmit={forgotPasswordSubmit}
            >
              <div className="">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgotPassword