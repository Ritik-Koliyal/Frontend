import { Link } from "react-router-dom";
function AdminSideBar() {
  return (
    <div className="container">
      <div className="row">
        <ul className="list-group p-4">
          <Link to="/dashboard/admin" className="list-group-item list-group-item-action">Go to dashboard</Link>
          <Link to="/dashboard/admin/addproduct" className="list-group-item list-group-item-action">Add new Product</Link>
          <Link to="/dashboard/admin/allusers" className="list-group-item list-group-item-action">users</Link>
        </ul>
      </div>
    </div>
  );
}
export default AdminSideBar;
