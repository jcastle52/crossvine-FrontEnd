import useMutation from "../../../api/useMutation";

export default function SaveHashtags({ hashtag }) {
  const { mutate, error } = useMutation("POST", "/hashtags", ["hashtags"]);

  if (error)
    return (
      <>
        <p>Failed to save</p>
      </>
    );
  return (
    <>
      <p>{hashtag}</p>
      <button onClick={() => mutate({ hashtag })}>❤️</button>
    </>
  );
}