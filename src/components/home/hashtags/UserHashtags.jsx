import useQuery from "../../../api/useQuery";
import DeleteHashtags from "./DeleteHashtags";

export default function UserHashtags({ setSearchArr }) {
  const { data: hashtags, error, loading } = useQuery(`/hashtags`, "hashtags");

  const search = async (hashtag) => {
    const search = hashtag;
    let date = "Newest";
    let approval = "Likes";
    let type = null;
    try {
      setSearchArr({ date, approval, type, search });
    } catch (error) {
      console.log(error);
    }
  };

  if (error)
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  if (loading)
    return (
      <>
        <h1>Loading</h1>
      </>
    );

  if (hashtags)
    return (
      <div>
          {hashtags.map((hashtag, index) => (
            <div className="hashtags" key={index}>
              <span className="hashtag" onClick={() => search(hashtag)}>
                {hashtag}
              </span>
              <DeleteHashtags hashtag={hashtag} />
            </div>
          ))}
      </div>
    );
}
