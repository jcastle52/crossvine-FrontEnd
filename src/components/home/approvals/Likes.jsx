import { useAuth } from "../../../auth/AuthContext";
export default function Likes({
  likes,
  dislikes,
  setLikes,
  setDislikes,
  approvePost,
  approval,
}) {
  const { token } = useAuth();
  return (
    <>
      <p>Likes:{likes}</p>
      {token ? (
        <button
          onClick={() => {
            approvePost({ approval: true });
            if (approval === true) {
              setLikes(likes - 1);
            } else {
              setLikes(likes + 1);
              setDislikes(dislikes - 1);
            }
          }}
        >
          LIKE
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
