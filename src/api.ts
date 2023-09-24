import axios from "axios";
export default axios.create({
    import.meta.env.VITE_API_PROD_BASE_URL || "http://localhost:5002/",
});
