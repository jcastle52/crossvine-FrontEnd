import useMutation from "../../../api/useMutation";

export default function Approve({
  type,
  approval,
  setLikes,
  setDislikes,
  likes,
  dislikes,
}) {
    const { mutate, } = useMutation("POST", "/approvals", ["Posts"]);

  if (type === "likes") {
    return (
      <>
        <button
          className={`like-btn ${approval === true ? "active" : ""}`}
          onClick={() => {
            setLikes(likes + 1);
          }}
          style={{
            backgroundColor: approval === true ? "#27ae60" : "transparent",
            color: approval === true ? "white" : "#27ae60",
            border: `1px solid #27ae60`,
            padding: "5px 10px",
            borderRadius: "4px",
            //cursor: isLoading ? "not-allowed" : "pointer",
            marginRight: "8px",
            //opacity: isLoading ? 0.6 : 1,
          }}
        >
          👍
        </button>
      </>
    );
  } else if (type === "dislikes") {
    return (
      <>
        <button
          className={`dislike-btn ${approval === false ? "active" : ""}`}
          onClick={() => {
            setDislikes(dislikes + 1);
          }}
          style={{
            backgroundColor: approval === false ? "#e74c3c" : "transparent",
            color: approval === false ? "white" : "#e74c3c",
            border: `1px solid #e74c3c`,
            padding: "5px 10px",
            borderRadius: "4px",
            //cursor: isLoading ? "not-allowed" : "pointer",
            //opacity: isLoading ? 0.6 : 1,
          }}
        >
          👎
        </button>
      </>
    );
  }
}
