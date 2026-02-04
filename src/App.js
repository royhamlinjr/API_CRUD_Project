import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name, email, website }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data]);
          alert("User Added Successfully");
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
        });
    }
  }

  function onChangeHandler(id, key, value) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [key]: value } : user,
      ),
    );
  }

  function updateUser(id) {
    const user = users.find((user) => user.id === id);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => prevUsers.map((u) => (u.id === id ? data : u)));
        alert("User Updated Successfully");
      });
  }

  function deleteUser(id){
     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((users)=>{
          return users.filter(user=>user.id !== id)
        })
        alert("User Deleted Successfully");
      });
  }

  return (
    <div className="App-wrapper">
      <div className="table-wrapper">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>

                <td>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={user.email}
                    onChange={(e) =>
                      onChangeHandler(user.id, "email", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={user.website}
                    onChange={(e) =>
                      onChangeHandler(user.id, "website", e.target.value)
                    }
                  />
                </td>

                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => updateUser(user.id)}
                  >
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={()=>deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control text-center"
                  value={newName}
                  placeholder="Enter Name"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control text-center"
                  value={newEmail}
                  placeholder="Enter Email"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control text-center"
                  value={newWebsite}
                  placeholder="Enter Website"
                  onChange={(e) => setNewWebsite(e.target.value)}
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={addUser}>
                  Add User
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default App;
