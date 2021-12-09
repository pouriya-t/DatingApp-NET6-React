import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("https://localhost:5001/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  console.log(users);
  return (
    <div>
      <h1>Dating App</h1>
      <ul>
        {users?.map((user) => (
          <li>
            {user.id} - {user.userName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
