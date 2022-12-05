import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();
  const [members, setMembers] = useState([]);

  async function queryEmail(email) {
    // make email url friendly
    const urlEmail = email.replace("@", "%40");

    // query db if email exists
    const result = await fetch(
      `/api/actions/accounts/getOneByEmail/${urlEmail}`
    );
    const resultJSON = await result.json();

    return resultJSON;
  }

  const addMember = (e) => {
    // check if input is enter
    if (e.key != "Enter") return;

    const email = e.target.value;

    // validate  email via regex
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      alert("Invalid email");
      return;
    }

    // clear input
    e.target.value = "";

    // query db if email exists
    queryEmail(email).then((data) => {
      if (data.id) {
        // add member to room
        setMembers([...members, data]);
      } else {
        toast("Email not found", {
          type: "error",
        });
      }
    });
  };

  const removeMember = (email) => {
    setMembers((prev) => prev.filter((member) => member != email));
  };

  const formRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    const parent = e.target;

    // console.log(parent);

    const data = {
      name: parent.name.value,
      note: parent.note.value,
      takers: members,
    };

    if ([data.name].includes("")) {
      toast("Please fill in all fields", {
        type: "error",
      });
      return;
    }

    // console.log(data);

    const roomId = router.query.roomID;

    fetch(`/api/actions/classroom/createExamSet/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.message == "Success") {
          router.push(`/classroom/room/${roomId}`);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  return (
    <div className="max-w-screen-lg min-h-screen mx-auto mt-24">
      <section>
        <h2 className="text-4xl font-bold">Create New Exam Schedule</h2>
        <p>A way for you to schedule an exam and organize the results</p>
      </section>
      <section className="my-8">
        <form
          onSubmit={onSubmit}
          ref={formRef}
          className="flex flex-col w-full gap-2"
        >
          <div>
            <p className="p-1">Name: </p>
            <input
              className="w-full p-1 bg-gray-100 border-b border-gray-500"
              name="name"
            />
          </div>{" "}
          <div>
            <p className="p-1">Notes: </p>
            <input
              className="w-full p-1 bg-gray-100 border-b border-gray-500"
              name="note"
            />
          </div>
        </form>
        <div className="w-full">
          <p className="p-1">Takers: </p>
          <div className="px-8">
            <input
              className="w-full p-1 mt-4 border-b border-gray-300"
              placeholder="Search Students Email Here"
              key={"input_mem"}
              onKeyUp={addMember}
            />
            <div className="p-4">
              {members.length > 0 ? (
                <>
                  {members.map((member) => (
                    <div
                      key={member}
                      className="flex items-center justify-between hover:bg-gray-200"
                    >
                      <p>{member.email}</p>
                      <button
                        key={member}
                        onMouseDown={removeMember.bind(null, member)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center">
                  Allow All Students to take the Exam or Enter An Email to
                  Create a Whitelist of Takers
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          name="submitClass"
          className="w-full p-1 text-white bg-gray-500 border border-gray-500"
          onClick={() => {
            formRef.current.requestSubmit();
          }}
        >
          Create
        </button>
      </section>
    </div>
  );
}

export default Page;
