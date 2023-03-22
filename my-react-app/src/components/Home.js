import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

const Home = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { state, dispatch } = useContext(UserContext);

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!data) {
      console.log("message not sent");
    } else {
      alert("Message send");
      setUserData({ ...userData, message: "" });
    }
  };

  const Loginbutton = () => {
    if (state) {
      return (
        <div>
          <button>
            <Link className="btn" to="/signout">
              logout
            </Link>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button>
            <Link className="btn" to="/signin">
              login
            </Link>
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>

        <Link className="logo" to="/">
          {" "}
          BICYCLE<span> RENTAL</span>
        </Link>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/rentbike">Rent Bikes</Link>
          <a href="#services">Testimonial</a>
          <a href="#contact">Contact</a>
        </nav>
        <div id="login-btn">
          <Loginbutton />
        </div>
      </header>

      <section className="home" id="home">
        <h3 data-speed="-2" className="home-parallax">
          Rent a Bicycle
        </h3>

        <img
          data-speed="5"
          // className="home-parallax"
          // src="image/My_images/image3.jpg"
          alt=""
        />
        <p>Explore Our Collection</p>
        <Link className="btn" to="/exploreRentBikes">
          Bicycle Showcase
        </Link>
      </section>
      <section className="icons-container">
      
        <div className="icons">
          <img src="image/My_images/feature1.png"></img>
          <div className="content">
            <h3>Ride Anywhere</h3>
            <p>Until you tired</p>
          </div>
        </div>

        <div className="icons">
        <img src="image/My_images/feature2..png"></img>
          <div className="content">
            <h3>Park Stations</h3>
            <p>Across the Cities</p>
          </div>
        </div>

        <div className="icons">
        <img src="image/My_images/feature3.png"></img>
          <div className="content">
            <h3>Easy Process</h3>
            <p>Using our Website</p>
          </div>
        </div>

        <div className="icons">
        <img src="image/My_images/feature4.png"></img>
          <div className="content">
            <h3>Safe Riding</h3>
            <p>Gears Available</p>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <span id="tag">FEATURES</span>
        <h1 className="heading">
          {" "}
          We Are There,<br></br> Where You Start <span>Journey</span>{" "}
        </h1>

        <div className="box-container">
          <div className="box">
            <h3>01. <br></br>Intractive & User Friendly Interface.</h3>
            <p>
            Our product have user friendly interface so that everyone can use our product without any difficulty, Also having intractive interface attracts students and adults.
            </p>
          </div>

          <div className="box">
            <h3>02. <br></br>Affordable Charges</h3>
            <p>
            We are renting bicycles in minimum charges so that everyone can afford it without any hesitation.
            </p>
          </div>

          <div className="box">
            <h3>03. <br></br>
            Inbuilt Path Navigation</h3>
            <p>
            We are providing user Inbuilt route Navigation during their Journey, So that user will not face any difficulty for reaching the destination.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h1 className="heading">
          <span>CONTACT</span> US
        </h1>

        <div className="row">
          <form method="POST">
            <h3>get in touch</h3>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputs}
              placeholder="Name"
              className="box"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputs}
              placeholder="Email"
              className="box"
            />
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputs}
              placeholder="Mobile No."
              className="box"
            />
            <textarea
              placeholder="Message"
              name="message"
              value={userData.message}
              onChange={handleInputs}
              className="box"
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="submit"
              value="send message"
              onClick={sendMessage}
              className="btn"
            />
          </form>
        </div>
      </section>

      <section className="footer" id="footer">
        <div className="box-container">
          <div className="box">
            <h3>our branches</h3>
            <a href="#">
              {" "}
              <i className="fas fa-map-marker-alt"></i> Chhtrapati Sambhajinagar{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-map-marker-alt"></i> Nashik{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-map-marker-alt"></i> Beed{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-map-marker-alt"></i> Pune{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-map-marker-alt"></i> Tokyo{" "}
            </a>
          </div>

          <div className="box">
            <h3>quick links</h3>
            <a href="#">
              {" "}
              <i className="fas fa-arrow-right"></i> home{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-arrow-right"></i> Bicycle{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-arrow-right"></i> services{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-arrow-right"></i> featured{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-arrow-right"></i> reviews{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-arrow-right"></i> contact{" "}
            </a>
          </div>

          <div className="box">
            <h3>contact info</h3>
            <a href="#">
              {" "}
              <i className="fas fa-phone"></i> +91 999999999{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-phone"></i> +91 000000000{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-envelope"></i> bital@gmail.com{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fas fa-map-marker-alt"></i> Chhtrapati Sambhajinagar, Maharashtra, India{" "}
            </a>
          </div>

          <div className="box">
            <h3>contact info</h3>
            <a href="#">
              {" "}
              <i className="fab fa-facebook-f"></i> facebook{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fab fa-twitter"></i> twitter{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fab fa-instagram"></i> instagram{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fab fa-linkedin"></i> linkedin{" "}
            </a>
            <a href="#">
              {" "}
              <i className="fab fa-pinterest"></i> pinterest{" "}
            </a>
          </div>
        </div>

        <div className="credit"> Made with ❤️ | All rights reserved </div>
      </section>
    </>
  );
};

export default Home;
