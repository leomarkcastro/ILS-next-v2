import { uuid } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const [load, setLoad] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);

  const session = useSession();

  useEffect(() => {
    if (router.query.examID) {
      classCode.set(router.query.examID);
    }
  }, [router]);

  useEffect(() => {
    // console.log(session);
    if (session.status === "authenticated") {
      setStep(2);
      loadData();
    } else {
      predictedType.clear();
      setStep(1);
      setLoad(true);
    }
  }, [session]);

  const classCode = {
    get: () => {
      return localStorage.getItem("classCode");
    },
    set: (code) => {
      localStorage.setItem("classCode", code);
    },
    clear: () => {
      localStorage.removeItem("classCode");
    },
  };

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

  const [predicted, setPredicted] = useState(null);

  function loadData() {
    fetch("/api/actions/accounts/getProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProfileInfo(data);
        if (data.ProfileDemoraphics) {
          setStep(3);

          if (data.ProfileDemoraphics.surveyAnswers) {
            setStep(4);
            setPredicted(predictedType.get());
          }
        }
        setLoad(true);
      });
  }

  async function welcomeProceed() {
    const randomUserEmail = uuid().slice(0, 12) + "@learning-style-dummy.com";
    const randomPassword = uuid().slice(0, 12);
    const res = await signIn(
      "credentials",
      {
        email: randomUserEmail,
        password: randomPassword,
        redirect: false,
      },
      {
        submitName: "registerUser",
      }
    );

    // console.log({
    //   email: randomUserEmail,
    //   password: randomPassword,
    //   redirect: false,
    // });
    // console.log(res);

    if (res.ok) {
      setStep(2);
      loadData();
    }
  }

  return (
    <div className="">
      <div className="flex flex-col h-[100vh] text-center p-8 pt-24 relative">
        <div className="absolute top-0 left-0 w-screen h-screen -z-10">
          <div className="relative top-0 left-0 w-full h-full">
            <Image
              src="/bg.jpg"
              alt="logo"
              layout="fill"
              className="object-cover object-right opacity-40"
            />
          </div>
        </div>
        <h1 className="mb-8 text-5xl">Take The Exam</h1>
        <div className="flex flex-col w-full max-w-screen-md gap-2 mx-auto md:flex-row bg-white/50">
          <div className="flex-none">
            <ul className="d-steps d-steps-horizontal md:d-steps-vertical">
              <li className={`d-step ${step > 0 && "d-step-primary"}`}>
                Welcome!
              </li>{" "}
              <li className={`d-step ${step > 1 && "d-step-primary"}`}>
                Demographics
              </li>
              <li className={`d-step ${step > 2 && "d-step-primary"}`}>
                Survey
              </li>
              <li className={`d-step ${step > 3 && "d-step-primary"}`}>
                Test Now!
              </li>
            </ul>
          </div>
          <div className="flex-1 text-left">
            {load ? (
              <>
                {step == 1 && (
                  <div className="border border-gray-400 rounded p-2 shadow min-h-[40vh] gap-4 flex flex-col justify-center items-center text-center">
                    <h2 className="text-2xl">Welcome</h2>
                    <p>
                      In this page, we will be providing you the steps to take
                      the exam. Please follow the steps carefully.
                    </p>
                    <div className="d-btn-group">
                      <button
                        onClick={welcomeProceed}
                        className="d-btn d-btn-sm d-btn-secondary"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                )}
                {step == 2 && (
                  <div className="border border-gray-400 rounded p-2 shadow min-h-[40vh] flex flex-col justify-center items-center text-center gap-2">
                    <h2 className="text-2xl">Demographics</h2>
                    {profileInfo && profileInfo.ProfileDemoraphics ? (
                      <div>
                        <p>You already have an examiner Profile</p>
                        <br />
                        <Link href="/profile/demographic?returnTo=%2Fexam">
                          <a className="text-white d-btn d-btn-primary d-btn-sm">
                            Refill-up Info
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        {/* <p>No Profile Demographic Provided Yet</p> */}
                        {/* <br /> */}
                        <Link href="/profile/demographic?returnTo=%2Fexam">
                          <a className="text-white d-btn d-btn-primary d-btn-sm">
                            Fill Up Now
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                )}{" "}
                {step == 3 && (
                  <div className="border border-gray-400 rounded p-2 shadow min-h-[40vh]  flex flex-col justify-center items-center text-center gap-2">
                    <h2 className="text-2xl">Personal Survey</h2>
                    {profileInfo &&
                    profileInfo.ProfileDemoraphics.surveyAnswers ? (
                      <div>
                        <p>You already answered the survey</p>
                        <br />
                        <Link href="/profile/survey?returnTo=%2Fexam">
                          <a className="text-white d-btn d-btn-primary d-btn-sm">
                            Retake the survey?
                          </a>
                        </Link>
                        <button
                          className="d-btn d-btn-secondary d-btn-block d-btn-sm d-btn-ghost w-fit"
                          onClick={(e) => {
                            e.preventDefault();
                            setStep(2);
                          }}
                        >
                          Re-enter Demographics
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* <p>You havent answered our survey yet</p> */}
                        {/* <br /> */}
                        <Link href="/profile/survey?returnTo=%2Fexam">
                          <a className="text-white d-btn d-btn-primary d-btn-sm">
                            Answer Now!
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                )}{" "}
                {false && step == 4 && (
                  <div className="border border-gray-400 rounded p-2 shadow min-h-[40vh]">
                    <h2 className="text-2xl">Enter Exam Code</h2>
                    <p>
                      If your referrer sent you an examination code, put it
                      here. This will help them track your results later. Leave
                      this blank if you just want to try the app
                    </p>
                    <br />
                    <div className="d-form-control">
                      <label className="d-label">
                        <span className="d-label-text">Exam Code</span>
                      </label>
                      <input
                        id="examCode"
                        type="text"
                        className="mb-4 d-input d-input-bordered"
                        placeholder="Enter Exam Code"
                      />
                      <button
                        className="d-btn d-btn-primary d-btn-sm"
                        onClick={async (e) => {
                          e.preventDefault();

                          let exists = false;
                          if (document.getElementById("examCode")["value"]) {
                            const check = await fetch(
                              `/api/actions/exam/checkIfExamSetExist/${
                                document.getElementById("examCode")["value"]
                              }`
                            );

                            const checkJSOn = await check.json();

                            if (checkJSOn.examSet) {
                              exists = true;
                            }
                          }

                          if (exists) {
                            toast("Exam Code Accepted", {
                              type: "success",
                            });

                            classCode.set(
                              document.getElementById("examCode")["value"] ||
                                "-none-"
                            );
                            setStep(4);
                          } else {
                            toast("Exam Code Not Found", {
                              type: "error",
                            });
                          }
                        }}
                      >
                        Continue
                      </button>
                    </div>

                    <button
                      className="d-btn d-btn-secondary d-btn-block d-btn-sm d-btn-ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        setStep(3);
                      }}
                    >
                      Re-enter Survey
                    </button>
                  </div>
                )}{" "}
                {step == 4 && (
                  <div className="border border-gray-400 rounded p-2 shadow min-h-[40vh]  flex flex-col justify-center items-center text-center gap-2">
                    <h2 className="text-2xl">Take the exam now!</h2>
                    <p>Start the Exam Now!</p>
                    <br />
                    <div className="">
                      <Link href="/exam/take">
                        <a className="text-white d-btn d-btn-primary">
                          Continue
                        </a>
                      </Link>
                      <button
                        className="hidden mx-2 d-link d-link-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(4);
                          classCode.clear();
                        }}
                      >
                        Re-enter Exam Code
                      </button>
                    </div>
                    <h2 className="text-xl">{predicted}</h2>
                    <p className="text-sm">
                      Your Predicted type based on your Survey
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-5 h-5 bg-orange-500 animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
