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
      <button 
        onClick={() => mutate({ hashtag })} 
        style={{ 
          color: '#27ae60', 
          background: 'none', 
          border: 'none', 
          fontSize: '18px', 
          cursor: 'pointer' 
        }}
      >
        ♥
      </button>
    </>
  );
}