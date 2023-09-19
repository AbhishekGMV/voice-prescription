import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";

function DoctorLogin() {
  const { user, isLoaded } = useUser();
  const [signInComplete, setSignInComplete] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const clerk = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) clerk.redirectToSignIn();

    if (isLoaded && user) {
      api.get(`/doctor/${user.id}`).then(({ data }) => {
        const signature = data.doctor.signatureUrl;
        if (signature) {
          setSignInComplete(true);
          navigate("/doctor/dashboard");
        }
      });
    }
  }, [user, clerk, isLoaded, navigate]);

  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("sign-image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post("/doctor/register", formData, config).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      {user && !signInComplete ? (
        <>
          <form onSubmit={(e) => handleFileUpload(e)}>
            <input
              type="file"
              onChange={(e) =>
                e.target.files && setFile(e.target.files[0] || null)
              }
            />
            <button type="submit">submit</button>
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DoctorLogin;
