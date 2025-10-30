import { useState } from "react";
import useMutation from "../../../api/useMutation";
import useQuery from "../../../api/useQuery";
import { useAuth } from "../../../auth/AuthContext";

import Likes from "./Likes";
import DisLikes from "./DisLikes";

export default function LikesDislikes({ post }) {
  const { token } = useAuth();
  const { data: approval } = useQuery(`/approvals/${post.id}`);
  const { mutate: approvePost, data: UpdatedApproval } = useMutation(
    "POST",
    `/approvals/${post.id}`,
    []
  );
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  if (approval && post.likes === likes && post.dislikes === dislikes) {
    return (
      <>
        <div>
          <Likes
            likes={likes}
            dislikes={dislikes}
            setLikes={setLikes}
            setDislikes={setDislikes}
            approvePost={approvePost}
            approval={approval.approve}
          />
        </div>
        <div>
          <DisLikes
            likes={likes}
            dislikes={dislikes}
            setLikes={setLikes}
            setDislikes={setDislikes}
            approvePost={approvePost}
            approval={approval.approve}
          />
        </div>
      </>
    );
  }

  if (UpdatedApproval) {
    return (
      <>
        <div>
          <Likes
            likes={likes}
            dislikes={dislikes}
            setLikes={setLikes}
            setDislikes={setDislikes}
            approvePost={approvePost}
            approval={UpdatedApproval.approve}
          />
        </div>
        <div>
          <DisLikes
            likes={likes}
            dislikes={dislikes}
            setLikes={setLikes}
            setDislikes={setDislikes}
            approvePost={approvePost}
            approval={UpdatedApproval.approve}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <p>Likes:{likes}</p>
      {token ? (
        <button
          onClick={() => {
            approvePost({ approval: true });
            setLikes(likes + 1);
          }}
        >
          LIKE
        </button>
      ) : (
        <></>
      )}

      <div>
        <p>dislikes: {dislikes}</p>
        {token ? (
          <button
            onClick={() => {
              approvePost({ approval: false });
              setDislikes(dislikes + 1);
            }}
          >
            DISLIKE
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
