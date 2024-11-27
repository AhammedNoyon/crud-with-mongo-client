import { useLoaderData } from "react-router-dom";

const Update = () => {
  const specificUser = useLoaderData();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const updateUser = { name, email };
    console.log(updateUser);
    fetch(`http://localhost:5000/users/${specificUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.matchedCount > 0) {
          alert("user update successfully");
        }
      });
  };
  return (
    <>
      <div>
        <h3>Get specific User by id. This User is: {specificUser?.name}</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id=""
            defaultValue={specificUser?.name}
          />
          <br />
          <input
            type="email"
            name="email"
            id=""
            defaultValue={specificUser?.email}
          />
          <br />
          <input type="submit" value="Update" />
        </form>
      </div>
    </>
  );
};

export default Update;
