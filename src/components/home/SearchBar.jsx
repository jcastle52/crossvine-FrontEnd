export default function SearchBar({ setSearchArr, searchArr }) {

  const search = async (formData) => {
    const search = formData.get("search");
    let date = formData.get("date");
    let approval = formData.get("approval");
    let type = formData.get("type");

    if (date === "None") date = null;
    if (approval === "None") approval = null;
    if (type === "None") type = null;
    try {
      setSearchArr({date, approval, type, search}) 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      SearchBar
      <form action={search}>
        <label>Search keywords or #hashtags</label>
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="crossvine #crossvine"
          name="search"
        />
        <label>Sort by date</label>
        <select className="form-control" id="date" name="date">
          {searchArr.date ? (<option value={searchArr.date}>{searchArr.date}</option>) : <></>}
          <option value={"None"}>None</option>
          <option value={"Newest"}>Newest</option>
          <option value={"Oldest"}>Oldest</option>
        </select>
        <label>Sort by most Likes or Dislikes</label>
        <select className="form-control" id="approval" name="approval">
          {searchArr.approval ? (<option value={searchArr.approval}>{searchArr.approval}</option>) : <></>}
          <option value={"None"}>None</option>
          <option value={"Likes"}>Likes</option>
          <option value={"Dislikes"}>Dislikes</option>
        </select>
        <label>Filter post type</label>
        <select className="form-control" id="type" name="type">
          <option value={"None"}>None</option>
          <option value={"Text"}>Text Posts</option>
          <option value={"Image"}>Image Posts</option>
          <option value={"YouTube"}>Youtube Posts</option>
        </select>
        <button>Search Posts</button>
      </form>
    </div>
  );
}
