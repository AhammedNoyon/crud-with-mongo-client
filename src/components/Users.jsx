import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const mongoUsers = useLoaderData();
  const [deleteUsers, setDeleteUsers] = useState(mongoUsers);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const users = { name, email };
    console.log(users);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("User add successfully");
          form.reset();
        }
      });
  };

  //delete
  const handleDelete = (_id) => {
    // console.log("delete ", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          alert("deleted successfully");
          const remainingMongoUser = deleteUsers.filter(
            (deleteUser) => deleteUser._id !== _id
          );
          setDeleteUsers(remainingMongoUser);
          console.log(deleteUsers);
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" name="Add User" id="" />
      </form>
      {
        <div>
          <h3>Total Users: {deleteUsers.length}</h3>
          {deleteUsers.map((mongoUser) => (
            <p key={mongoUser._id}>
              {mongoUser.name}: {mongoUser.email} : {mongoUser._id}
              <Link to={`/update/${mongoUser._id}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => handleDelete(mongoUser._id)}>x</button>
            </p>
          ))}
        </div>
      }
    </div>
  );
};

export default Users;
