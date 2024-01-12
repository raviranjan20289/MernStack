import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../store/auth";
const Login = () => {
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = Auth.useAuth();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data :", response);

      if (response.ok) {
        const responseData = await response.json();
        storeTokenInLS(responseData.token);
        alert("Login successful");
        setUser({ Email: "", Password: "" });
        navigate("/");
        console.log("here is your response data", responseData);
      } else {
        console.log("error inside response");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="public/images/login.png"
                  alt="Sorry the image is disappeared"
                  width="400"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="Email"
                      value={user.Email}
                      onChange={handleInput}
                      placeholder="email"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="Password"
                      value={user.Password}
                      onChange={handleInput}
                      placeholder="password"
                      autoComplete="current-password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
