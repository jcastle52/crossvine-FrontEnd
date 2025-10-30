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
      setSearchArr({ date, approval, type, search });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-filters">
      <form
        action={search}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          alignItems: "end",
          width: "100%",
        }}
      >
        <div className="filter-section">
          <h4>Search</h4>
          <input
            type="text"
            className="filter-select"
            id="search"
            placeholder="Keywords or #hashtags..."
            name="search"
            style={{ minWidth: "200px" }}
          />
        </div>

        <div className="filter-section">
          <h4>Sort by Date</h4>
          <select className="filter-select" id="date" name="date">
            <option value={"None"}>None</option>
            <option value={"Newest"}>Newest</option>
            <option value={"Oldest"}>Oldest</option>
          </select>
        </div>

        <div className="filter-section">
          <h4>Sort by Engagement</h4>
          <select className="filter-select" id="approval" name="approval">
            <option value={"None"}>None</option>
            <option value={"Likes"}>Most Liked</option>
            <option value={"Dislikes"}>Most Disliked</option>
          </select>
        </div>

        <div className="filter-section">
          <h4>Post Type</h4>
          <select className="filter-select" id="type" name="type">
            <option value={"None"}>All Types</option>
            <option value={"Text"}>Text Posts</option>
            <option value={"Image"}>Image Posts</option>
            <option value={"Youtube"}>YouTube Posts</option>
          </select>
        </div>

        <button className="reset-filters-btn" type="submit">
          🔍 Search Posts
        </button>
      </form>
    </div>
  );
}
