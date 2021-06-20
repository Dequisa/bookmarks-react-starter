import { useState, useEffect } from "react";
import { Link, useParams, useHistory, withRouter } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL";

const API = apiURL();

function BookmarkDetails({ deleteBookmark } ) {
  const [bookmark, setBookmark] = useState([]);
  let { index } = useParams();
  let history = useHistory();

  // useEffect(() => {
  //   axios.get(`${API}/bookmarks/${index}`).then(
  //     (response) => {
  //       setBookmark(response.data);
  //     },
  //     (error) => {
  //       history.push(`/not-found`);
  //     }
  //   );
  // }, [index, history]);

  useEffect(async () => {
    let res;
    try{
    res = await axios.get(`${API}/bookmarks/${index}`)
     setBookmark(res.data)
    } catch(err){
      console.log(useParams)
      console.log(index)
      console.log("You've hit an error")
      history.push(`/not-found`)
    }
  }, [index, history]);
  const handleDelete = () => {};
  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default withRouter(BookmarkDetails);
