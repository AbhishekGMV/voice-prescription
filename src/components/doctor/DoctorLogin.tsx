import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function DoctorLogin() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [role, setRole] = useState<string>("");
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
      clerk.redirectToSignIn().then(() => {
        navigate("/doctor/dashboard");
      });
    }

    if (isLoaded && user) {
      setLoading(true);
      api.get(`/doctor/${user.id}`).then(({ data }: { data: DoctorData }) => {
        if (data.doctor !== null) {
          navigate("/doctor/dashboard", { state: data.doctor });
          setLoading(false);
        }
        setLoading(false);
      });
    }
  }, [user, clerk, isLoaded, navigate]);

  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
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
    <div>
      {user && isLoaded && !loading ? (
        <>
          <form onSubmit={(e) => handleFileUpload(e)}>
            <input
              type="file"
              onChange={(e) =>
                e.target.files && setSignatureFile(e.target.files[0] || null)
              }
            />
            <select onChange={(e) => setRole(e.target.value)}>
              <option value={"general"}>General</option>
              <option value={"dentist"}>Dentist</option>
              <option value={"dermatologist"}>Dermatologist</option>
              <option value={"psychiatrist"}>Psychiatrist</option>
            </select>
            <button type="submit">submit</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DoctorLogin;
