import { formatDateAndTimeAMPM } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { signOut } from "next-auth/react";

function Page() {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

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
      });
  }

  function deleteResult(id) {
    openModal("Are you sure you want to delete this result?", [
      {
        id: "opti1",
        label: "Yes",
        onClick: async () => {
          fetch(`/api/actions/exam/delete/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              toast("Result deleted successfully", {
                type: "success",
              });
              closeModal();
              loadData();
            });
        },
      },
      {
        id: "opti2",
        label: "No",
        onClick: closeModal,
      },
    ]);
  }

  const [modalIsOpen, setIsOpen] = useState({
    open: false,
    message: "",
    options: [],
  });

  function openModal(
    message = "Modal",
    options = [
      {
        id: "opti1",
        label: "Ok",
        onClick: () => setIsOpen({ ...modalIsOpen, open: false }),
      },
    ]
  ) {
    setIsOpen({
      open: true,
      message,
      options,
    });
  }
  function closeModal() {
    setIsOpen({ ...modalIsOpen, open: false });
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-20">
      {profileInfo ? (
        <div className="p-4">
          <h1 className="text-4xl font-bold">Profile</h1>
          {profileInfo.User.email.indexOf("-dummy") === -1 && (
            <p>
              Hello, <strong>{profileInfo.User.email}</strong>
            </p>
          )}
          <div className="my-8">
            <h2 className="text-2xl">Profile</h2>
            <div>
              {profileInfo.ProfileDemoraphics &&
              profileInfo.ProfileDemoraphics.fullname ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <p>
                      Full Name:{" "}
                      <strong>{profileInfo.ProfileDemoraphics.fullname}</strong>
                    </p>
                    <p>
                      Gender:{" "}
                      <strong>{profileInfo.ProfileDemoraphics.gender}</strong>
                    </p>
                    <p>
                      Age: <strong>{profileInfo.ProfileDemoraphics.age}</strong>
                    </p>
                    <p>
                      Religion:{" "}
                      <strong>{profileInfo.ProfileDemoraphics.religion}</strong>
                    </p>
                    <p>
                      Municipality:{" "}
                      <strong>
                        {profileInfo.ProfileDemoraphics.municipality}
                      </strong>
                    </p>
                    <p>
                      Family Type:{" "}
                      <strong>
                        {profileInfo.ProfileDemoraphics.familyType}
                      </strong>
                    </p>
                  </div>
                  <div>
                    <p>
                      Course:{" "}
                      <strong>{profileInfo.ProfileDemoraphics.course}</strong>
                    </p>
                    <p>
                      Year:{" "}
                      <strong>{profileInfo.ProfileDemoraphics.year}</strong>
                    </p>
                    <p>
                      Section:{" "}
                      <strong>{profileInfo.ProfileDemoraphics.section}</strong>
                    </p>
                    <p>
                      Specialization:{" "}
                      <strong>
                        {profileInfo.ProfileDemoraphics.specialization}
                      </strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-2 mx-auto my-2 text-center">
                  <p>No Profile Data Yet</p>
                </div>
              )}
              <div className="w-full text-center">
                <Link href="/profile/demographic">
                  <a className="w-full text-center text-orange-600">
                    Edit your profile
                  </a>
                </Link>
              </div>
            </div>
          </div>{" "}
          <div className="my-8">
            <h2 className="text-2xl">Exams</h2>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              {profileInfo.Exams.map((exam) => {
                return (
                  <div
                    key={exam.id}
                    className="relative p-2 border shadow-md group"
                  >
                    <p className="text-2xl">{exam.ExamContents.type}</p>
                    <div>
                      <p>
                        ActRef: <strong>{exam.ExamContents.actRef}</strong>
                      </p>
                      <p>
                        SenInt: <strong>{exam.ExamContents.senInt}</strong>
                      </p>
                      <p>
                        VisVer: <strong>{exam.ExamContents.visVer}</strong>
                      </p>
                      <p>
                        SeqGlo: <strong>{exam.ExamContents.seqGlo}</strong>
                      </p>
                    </div>
                    <p>
                      Date:{" "}
                      <strong>{formatDateAndTimeAMPM(exam.createdAt)}</strong>
                    </p>
                    <p>
                      Took Exam For:{" "}
                      {exam.ExamSet ? (
                        <>
                          <strong>
                            <p>{exam.ExamSet.name}</p>{" "}
                            <p>{exam.ExamSet.Class.ClassProfile.name}</p>
                          </strong>
                        </>
                      ) : (
                        <p>
                          <strong>Personal Check</strong>
                        </p>
                      )}
                    </p>
                    <button
                      className="absolute hidden top-4 right-4 group-hover:block"
                      onClick={() => deleteResult(exam.id)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
      <Modal
        isOpen={modalIsOpen.open}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            minWidth: "300px",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Confirm"
      >
        <p className="p-2">{modalIsOpen.message}</p>
        <div className="flex justify-end gap-3">
          {modalIsOpen.options.map((option) => {
            return (
              <button
                key={option.id}
                onClick={option.onClick}
                className="p-1 text-sm border border-orange-600"
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

export default Page;
