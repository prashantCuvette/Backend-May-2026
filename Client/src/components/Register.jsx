import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  function handleFile(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
   try {
     e.preventDefault();
     console.log(user);
     console.log(e.target.files);
     console.log(image);

     const res = await fetch("http://localhost:4000/api/v1/users/signup", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(user),
     });
     const data = await res.json();
     console.log("From The Server");
     console.log(data);

   } catch (error) {
    console.log(error.message)
   }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) =>
          setUser((prev) => {
            return { ...prev, fullName: e.target.value };
          })
        }
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) =>
          setUser((prev) => {
            return { ...prev, email: e.target.value };
          })
        }
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) =>
          setUser((prev) => {
            return { ...prev, password: e.target.value };
          })
        }
      />
      <br />
      <br />
      <input type="file" name="profileImage" id="image" onChange={handleFile} />
      <br />
      <br />
      <button>register</button>
    </form>
  );
};

export default Register;
