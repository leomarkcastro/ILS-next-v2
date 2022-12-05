import Form from "@/components/form/form1";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();
  const onSubmit = (e) => {
    // console.log(e);
    fetch("/api/actions/accounts/updateProfileDemographics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast(data.error, {
            type: "error",
          });
        } else {
          toast("Profile updated successfully", {
            type: "success",
          });

          if (router.query.returnTo) {
            router.push(router.query.returnTo as string);
          } else {
            router.push("/profile");
          }
        }
        // router.push("/profile");
      });
  };

  const [profileInfo, setProfileInfo] = useState({
    loaded: false,
    data: null,
  });

  const loadSavedValue = () => {
    fetch("/api/actions/accounts/getProfileDemographics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        // console.log(err);
        setProfileInfo({
          loaded: true,
          data: null,
        });
      })
      .then((data) => {
        // console.log(data);
        setProfileInfo({
          loaded: true,
          data: data,
        });
      });
  };

  useEffect(() => {
    loadSavedValue();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto mt-20">
      <h1 className="text-4xl font-bold">SURVEY QUESTIONS</h1>
      <p>
        Please pick the option that best describes you. There are no right or
        wrong answers. Please answer all questions.
      </p>
      <div className="w-full p-8 my-4 border shadow-md">
        {profileInfo.loaded && (
          <Form onSubmit={onSubmit} defaultValues={profileInfo.data} />
        )}
      </div>
    </div>
  );
}

export default Page;
