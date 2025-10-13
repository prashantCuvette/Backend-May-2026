import { useEffect, useState } from "react";
import Register from "./components/Register";

const API_URL = import.meta.VITE_API_URL;
console.log(API_URL)

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGVkMDhmZTUwZTdkZGVhMmY2ZGM0NWEiLCJpYXQiOjE3NjAzNjU1MjUsImV4cCI6MTc2MDQ1MTkyNX0.Dla4T_y8VJfNuccR16rr6n-0DWWvdIKmvuEuvvSD-Yw";


const App = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  return (
    <div>
      App
      {console.log(user)}
      <Register />
    </div>
  )
}

export default App
