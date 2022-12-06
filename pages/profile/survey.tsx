import Form2 from "@/components/form/form2";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();

  const predictedType = {
    get: () => {
      return localStorage.getItem("predictedType");
    },
    set: (code) => {
      localStorage.setItem("predictedType", code);
    },
    clear: () => {
      localStorage.removeItem("predictedType");
    },
  };

  const onSubmit = async (e) => {
    const dat = await fetch("/api/actions/accounts/updateSurvey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    });
    const datJson = await dat.json();

    if (datJson.error) {
      return toast(datJson.error, {
        type: "error",
      });
    }
    toast("Profile updated successfully", {
      type: "success",
    });

    const surveyAnswersMapped = Object.values(datJson.surveyAnswers).map((x) =>
      Number(x)
    );

    const mldat = await fetch(
      "https://learning-style-ml.app.xyzapps.xyz/api/ml/predictD3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyAnswersMapped),
      }
    );
    const mldatJson = await mldat.json();

    if (mldatJson.error) {
      return toast(datJson.error, {
        type: "error",
      });
    }

    predictedType.set(mldatJson.prediction[0]);

    if (router.query.returnTo) {
      return router.push(router.query.returnTo as string);
    }
    return router.push("/profile");
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
          data: data.surveyAnswers,
        });
      });
  };

  useEffect(() => {
    loadSavedValue();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto mt-20">
      <h1 className="text-4xl font-bold">Personal Assessment Survey</h1>
      <p>
        Informations put here are most likely to be used by your professors to
        include context to your results.
      </p>
      <div className="w-full p-8 my-4 border shadow-md">
        {profileInfo.loaded && (
          <Form2 onSubmit={onSubmit} defaultValues={profileInfo.data} />
        )}
      </div>
    </div>
  );
}

export default Page;
