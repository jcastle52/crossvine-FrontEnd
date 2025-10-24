import useMutation from "../../api/useMutation";

export default function ProfileCreate() {
  const { mutate } = useMutation("POST", "/posts/", ["userPosts"]);

  const createPost = async (formData) => {
        const title = formData.get("title")
        const description = formData.get("description")
        const type = formData.get("type")
    try {
        await mutate({title, description, type})
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="create-post-section">
      <form action={createPost}>
        <label htmlFor="postTitle">Post Title:</label>
        <br />
        <input type="text" id="postTitle" name="title" required />
        <br />
        <br />

        <label htmlFor="postContent">Post Content:</label>
        <br />
        <textarea
          id="postContent"
          name="description"
          rows="10"
          cols="50"
          required
        ></textarea>
        <br />
        <br />

        <label htmlFor="authorName">Post Type:</label>
        <br />
        <input type="text" id="authorName" name="type" />
        <br />
        <br />

        <input type="submit" value="Create Post" />
      </form>
    </div>
  );
}
