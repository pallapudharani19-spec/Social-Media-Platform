import { useState } from "react";
import API from "../services/api";

function EditProfileModal({ user, setUser, closeModal }) {
  const [form, setForm] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
  });

  const saveProfile = async () => {
    try {
      await API.put(
        "/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser({
        ...user,
        ...form,
      });

      alert("Profile Updated!");
      closeModal();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">

        <h2>Edit Profile</h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <textarea
          rows="4"
          placeholder="Bio"
          value={form.bio}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
        />

        <div className="modal-buttons">
          <button onClick={closeModal}>
            Cancel
          </button>

          <button onClick={saveProfile}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProfileModal;