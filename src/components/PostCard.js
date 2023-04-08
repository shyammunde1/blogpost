import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";



export const PostCard = ({ post, toggle, setToggle }) => {
  const { id, title, description, author } = post;
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  const navigate = useNavigate();

  async function handleDelete() {
    const document = doc(db, "postdata", id);
    await deleteDoc(document);
    setToggle(!toggle);
    navigate("/");
  }

  return (
    <div className="card">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <p className="control">
        <span className="author">{author.name}</span>
        {isAuth && author.id === auth.currentUser.uid && (
          <span onClick={handleDelete} className="delete">
            <i className="bi bi-trash3"></i>
          </span>
        )}
      </p>
    </div>
  );
};
