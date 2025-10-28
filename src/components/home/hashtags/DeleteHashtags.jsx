import useMutation from "../../../api/useMutation";

export default function DeleteHashtags({ hashtag }) {
  const { mutate, error } = useMutation("DELETE", "/hashtags", ["hashtags"]);

  if (error)
    return (
      <>
        <p>Failed to delete</p>
      </>
    );
  return (
    <>
      <button onClick={() => mutate({ hashtag })}>🗑️</button>
    </>
  );
}
