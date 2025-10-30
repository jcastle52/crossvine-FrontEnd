import useMutation from "../../../api/useMutation";
export default function CreateComment({ post }) {
  const { mutate } = useMutation("POST", `/comments/posts/${post.id}`, ["Comments"]);

  const postComment = (formData) => {
    const comment = formData.get("comment");
    mutate({ comment });
  };

  return (
    <div>
      <form action={postComment}>
        <label>Post Comment:</label>
        <input
          type="text"
          id="comment"
          placeholder="This is a comment"
          name="comment"
        />
        <button>Post Comment</button>
      </form>
    </div>
  );
}
