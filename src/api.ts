import axios from "axios";
console.log(import.meta.env.VITE_API_PROD_BASE_URL);
export default axios.create({
  baseURL:
    import.meta.env.VITE_API_PROD_BASE_URL || "http://localhost:5002/",
});
