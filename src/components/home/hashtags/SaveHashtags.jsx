import useMutation from "../../../api/useMutation";
import { useAuth } from "../../../auth/AuthContext";

export default function SaveHashtags({ hashtag }) {
  const { mutate, error } = useMutation("POST", "/hashtags", ["hashtags"]);
  const { token } = useAuth()

  if (error)
    return (
      <>
        <p>{error}</p>
      </>
    );
  return (
    <>
      <p>{hashtag}</p>
      {token ? <button 
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
      </button> : <></>}
      
    </>
  );
}