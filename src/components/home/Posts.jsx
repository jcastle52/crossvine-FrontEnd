import useQuery from "../../api/useQuery";

export default function Posts() {
  const { data: posts } = useQuery("/posts", "posts");

  console.log(posts);
  if (posts) {
    return (
      <>
        <div className="post">
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.user_owner}</h2>
                <p>{post.title}</p>
                <br/><br/>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
