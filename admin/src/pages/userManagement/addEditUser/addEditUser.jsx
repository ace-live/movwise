import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { TextField, Grid, MenuItem } from "@mui/material";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchEditUserDetails } from "../../../store/action";
import { useParams, useNavigate } from "react-router-dom";

const AddEditUserManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: true,
    status_description: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.reducerData);

  useEffect(() => {
    if (!userData?.user?.users) {
      dispatch(fetchUser());
    } else {
      const selectedUser = userData?.user?.users?.find(
        (user) => String(user.user_id) === String(id)
      );
      if (selectedUser) {
        setFormData({
          name: selectedUser.name || "",
          email: selectedUser.email || "",
          status: selectedUser.status ?? true,
          status_description: selectedUser.status_desc || "",
          phone: selectedUser.phone || "",
        });
      }
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when user types
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (
      formData.status_description.trim().length > 0 &&
      formData.status_description.trim().length < 5
    ) {
      newErrors.status_description =
        "Description must be at least 5 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(fetchEditUserDetails({ ...formData, id }, navigate)); // Pass formData and id to the action
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitForm} style={{ width: "100%", maxWidth: "70%" }}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              margin="normal"
              variant="outlined"
              fullWidth
              color="primary"
              required
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
              color="primary"
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="phone"
              margin="normal"
              variant="outlined"
              fullWidth
              color="primary"
              required
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Grid>
          {/* Status */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status.toString()}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{ ".MuiInputBase-root": { height: "44px" } }}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Status Description"
              name="status_description"
              value={formData.status_description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              color="primary"
              error={Boolean(errors.status_description)}
              helperText={errors.status_description}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <MDButton type="submit" variant="gradient" color="dark">
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default AddEditUserManagement;
