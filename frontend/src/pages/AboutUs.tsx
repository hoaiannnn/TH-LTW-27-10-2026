import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
} from "../services/userApi";

function AboutUs() {
  const [users, setUsers] = useState<User[]>([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // GET: lấy danh sách user
  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  // Tự động gọi GET khi mở trang
  useEffect(() => {
    loadUsers();
  }, []);

  // POST: tạo user
  const handleCreateUser = async () => {
    await createUser({
      fullName,
      email,
      age: Number(age),
    });

    setFullName("");
    setEmail("");
    setAge("");

    await loadUsers();
  };

  // PUT: cập nhật user
  const handleUpdateUser = async (user: User) => {
    await updateUser(user.id, {
      fullName: user.fullName,
      email: user.email,
      age: user.age + 1,
    });

    await loadUsers();
  };

  // DELETE: xóa user
  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);

    await loadUsers();
  };

  return (
    <div>
      <h1>About Us - User CRUD</h1>

      <input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={handleCreateUser}>
        Add User
      </button>

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          <p>ID: {user.id}</p>
          <p>Họ tên: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Tuổi: {user.age}</p>

          <button onClick={() => handleUpdateUser(user)}>
            Update
          </button>

          <button onClick={() => handleDeleteUser(user.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AboutUs;