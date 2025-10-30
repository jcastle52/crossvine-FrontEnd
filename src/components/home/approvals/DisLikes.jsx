import { useAuth } from "../../../auth/AuthContext";
export default function DisLikes({
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
      <p>dislikes: {dislikes}</p>
      {token ? (
        <button
          onClick={() => {
            approvePost({ approval: false });
            if (approval === false) {
              setDislikes(dislikes - 1);
            } else {
              setLikes(likes - 1);
              setDislikes(dislikes + 1);
            }
          }}
        >
          DISLIKE
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
