import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../store/auth";

const Register = () => {
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Phone: "",
    Password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = Auth.useAuth();

  const handleInput = (e) => {
    console.log(e);
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
      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);

      if (response.ok) {
        const responseData = await response.json();
        // we will not store token like this we will use context api for this.
        // localStorage.setItem("token", responseData.token);
        storeTokenInLS(responseData.token);
        alert("registration successful");
        setUser({ Username: "", Email: "", Phone: "", Password: "" });
        navigate("/login");
        console.log(responseData);
      } else {
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.error("Error", error);
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
                  src="public/images/register.png"
                  alt="welcome to mern Series"
                  width="400"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="Username"
                      value={user.Username}
                      onChange={handleInput}
                      placeholder="john"
                      autoComplete="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="Email"
                      value={user.Email}
                      onChange={handleInput}
                      placeholder="john@gmail.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="Phone"
                      value={user.Phone}
                      placeholder="1234567891"
                      onChange={handleInput}
                      autoComplete="phone"
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
                    Register Now
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

export default Register;
