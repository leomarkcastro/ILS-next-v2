import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AdminOnly from "@/components/auth/AdminOnly";
import UserOnly from "@/components/auth/UserOnly";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { formatDateAndTimeAMPM } from "@/lib/utils";

function Page() {
  const router = useRouter();
  const [roomData, setRoomData] = useState(null);
  const { data: session, status } = useSession();

  const loadPageData = async () => {
    const roomID = router.query.roomID;
    fetch(`/api/actions/classroom/getOne/${roomID}`).then((res) =>
      res.json().then((data) => {
        // console.log(data);
        setRoomData(data);
      })
    );
  };

  useEffect(() => {
    const roomID = router.query.roomID;
    if (!roomID) return;
    loadPageData();
  }, [router]);

  const addMember = (e) => {
    // check if input is enter
    if (e.key != "Enter") return;

    const email = e.target.value;

    // validate  email via regex
    const regex =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/;
    if (!regex.test(email)) {
      toast("Invalid email");
      return;
    }

    // make email url friendly
    const urlEmail = email.replace("@", "%40");

    // query db if email exists
    fetch(`/api/actions/accounts/getOneByEmail/${urlEmail}`).then((res) =>
      res
        .json()
        .then((data) => {
          if (data.id) {
            // add member to room
            fetch(
              `/api/actions/classroom/classAddMember/${roomData.id}/${data.id}`
            ).then((res) => {
              if (res.status == 200) {
                loadPageData();
                // clear input
                e.target.value = "";
                toast("Member added", {
                  type: "success",
                });
              }
            });
          } else {
            toast("Email not found", {
              type: "error",
            });
          }
        })
        .catch((err) => {
          toast("Email not found", {
            type: "error",
          });
        })
    );
  };

  function removeMember(memberID, memberName) {
    openModal(`Are you sure you want to remove this member [${memberName}]?`, [
      {
        id: "opti1",
        label: "Yes",
        onClick: async () => {
          fetch(
            `/api/actions/classroom/classRemoveMember/${roomData.id}/${memberID}`
          ).then(() => {
            loadPageData();

            toast("Member removed", {
              type: "success",
            });
            closeModal();
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

  function deleteExam(examID, examName) {
    openModal(
      `Are you sure you want to remove this exam set along with all its records [${examName}]?`,
      [
        {
          id: "opti1",
          label: "Yes",
          onClick: async () => {
            fetch(`/api/actions/classroom/deleteExamSet/${examID}`).then(() => {
              loadPageData();
              closeModal();
              toast("Exam set removed", {
                type: "success",
              });
            });
          },
        },
        {
          id: "opti2",
          label: "No",
          onClick: closeModal,
        },
      ]
    );
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
    <div className="max-w-screen-lg min-h-screen mx-auto mt-24">
      {roomData ? (
        <>
          <section>
            <h2 className="text-4xl font-bold">{roomData.ClassProfile.name}</h2>
            <h3 className="text-xl">
              Facilitator: <strong>{roomData.Facilitator.User.email}</strong>
            </h3>
            <p className="my-4">{roomData.ClassProfile.notes}</p>
          </section>
          <section className="my-8">
            <hr className="mb-3 border-gray-700" />
            <h3 className="text-2xl font-bold">Planned Exams</h3>
            <p>
              All of your planned examinations from the past, or the incoming
              dates are listed here
            </p>

            <div className="flex flex-col gap-2 p-2 border-gray-500">
              <AdminOnly>
                <Link href="/classroom/create">
                  <a>
                    <Link href={`/classroom/room/${roomData.id}/createExam`}>
                      <button className="w-full p-4 text-center border border-gray-500 rounded-md shadow-md cursor-pointer">
                        <p>Plan A New Examination Routine</p>
                      </button>
                    </Link>
                  </a>
                </Link>
              </AdminOnly>
              {roomData.ExamSets.map((examSet) => (
                <div
                  className="grid grid-cols-2 p-2 border border-gray-300 shadow-md"
                  key={`${examSet.id}`}
                >
                  <div>
                    <p className="text-2xl">{examSet.name}</p>
                    <p>Exam Set ID: {examSet.id}</p>
                    <p>{examSet.notes}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 mr-4">
                    <UserOnly>
                      {examSet.Exam.length == 0 ? (
                        <Link
                          href={`/exam?examID=${examSet.id}&roomID=${roomData.id}`}
                        >
                          <button className="p-1 text-orange-500 bg-orange-100">
                            Take
                          </button>
                        </Link>
                      ) : (
                        <p>✅ Exam Taken!</p>
                      )}
                    </UserOnly>
                    <AdminOnly>
                      <Link
                        href={`/classroom/room/${roomData.id}/examset/${examSet.id}`}
                      >
                        <a className="">View</a>
                      </Link>
                      <button
                        className=""
                        onClick={() => deleteExam(examSet.id, examSet.name)}
                      >
                        Delete
                      </button>
                    </AdminOnly>
                  </div>
                </div>
              ))}
            </div>
          </section>{" "}
          <section className="my-8">
            <hr className="mb-3 border-gray-700" />
            <h3 className="text-2xl font-bold">Students</h3>
            <p>These are the students that would take your planned exams.</p>
            <div className="flex flex-col gap-2 p-2 border-gray-500">
              <AdminOnly>
                <input
                  className="w-full p-1 mt-4 border-b border-gray-300"
                  placeholder="Add Students Email Here and Press Enter"
                  key={"input_mem"}
                  onKeyUp={addMember}
                />
              </AdminOnly>
              <div className="flex flex-col gap-2 p-4">
                {roomData.Students.map((student) => (
                  <div className="grid grid-cols-2" key={`${student.id}`}>
                    <div>
                      <p className="">{student.profile.User.email}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 mr-4">
                      <AdminOnly>
                        <button
                          className="text-sm"
                          onClick={() =>
                            removeMember(
                              student.profileId,
                              student.profile.User.email
                            )
                          }
                        >
                          Remove
                        </button>
                      </AdminOnly>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
          <p>Loading</p>
        </div>
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
