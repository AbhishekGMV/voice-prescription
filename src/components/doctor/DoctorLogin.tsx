import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DoctorLogin = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signatureFilePreview, setSignatureFilePreview] = useState<string>("");
  const [role, setRole] = useState<string>(""); // Default role
  const clerk = useClerk();
  const navigate = useNavigate();

  interface DoctorData {
    doctor: {
      id: number;
      signatureUrl: string;
      signatureFilename: string;
      role: string;
    };
  }

  useEffect(() => {
    if (isLoaded && !user) {
      clerk.redirectToSignIn();
    }

    if (isLoaded && user) {
      setLoading(true);
      api.get(`/doctor/${user.id}`).then(({ data }: { data: DoctorData }) => {
        if (data.doctor !== null) {
          navigate("/doctor/dashboard", { state: data.doctor });
        }
        setLoading(false);
      });
    }
  }, [user, clerk, isLoaded, navigate]);

  function handleFileUpload(e: React.FormEvent<HTMLInputElement>) {
    const files: FileList | null = (e.target as HTMLInputElement).files;
    if (!files?.length) return;

    const file: File = files[0];
    if (file) {
      setSignatureFile(file || null);
      const blobUrl = URL.createObjectURL(file);
      setSignatureFilePreview(blobUrl);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signatureFile || !user) return;

    const formData = new FormData();
    formData.append("signature", signatureFile);
    formData.append("id", user.id);
    formData.append("role", role);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    api
      .post("/doctor/register", formData, config)
      .then((response) => {
        console.log(response.data);
        navigate("/doctor/dashboard", { state: response.data });
      })
      .catch(console.log);
  };

  return (
    <Box>
      <div className="h-screen flex justify-center items-center">
        {user && isLoaded && !loading ? (
          <div
            className="shadow-xl"
            style={{
              padding: "2rem",
              maxWidth: "80vh",
              height: "60vh",
            }}
          >
            <Alert severity="info">
              We need this information for generating prescriptions.
            </Alert>

            <form onSubmit={(e) => handleSubmit(e)}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload signature
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                />
              </Button>

              {signatureFilePreview && (
                <img
                  src={signatureFilePreview}
                  className="my-4 mx-auto"
                  alt="Preview"
                  width="100"
                />
              )}
              <FormControl fullWidth className="mt-4">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value as string)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={"general"}>General</MenuItem>
                  <MenuItem value={"dentist"}>Dentist</MenuItem>
                  <MenuItem value={"dermatologist"}>Dermatologist</MenuItem>
                  <MenuItem value={"psychiatrist"}>Psychiatrist</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!signatureFile}
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </Box>
  );
};

export default DoctorLogin;
