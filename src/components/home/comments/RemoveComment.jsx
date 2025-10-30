import useMutation from "../../../api/useMutation";

export default function RemoveComment({ id }) {
    const { mutate } = useMutation("DELETE", `/comments/${id}`, ["Comments"]);

  return (
    <>
        <button type="button" onClick={() => mutate()}>🗑️</button>
    </>
  )
}
