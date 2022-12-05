import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function Page() {
  const [members, setMembers] = useState([]);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    const parent = e.target;

    const name = parent.name.value;
    // console.log("🚀 ~ file: create.tsx ~ line 13 ~ onSubmit ~ name", name);
    const school = parent.school.value;
    // console.log("🚀 ~ file: create.tsx ~ line 14 ~ onSubmit ~ school", school);
    const note = parent.note.value;
    // console.log("🚀 ~ file: create.tsx ~ line 15 ~ onSubmit ~ note", note);

    const toSubmit = {
      name,
      school,
      note,
      members,
    };

    fetch("/api/actions/classroom/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSubmit),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          router.push(`/classroom/room/${data.id}`);
        } else {
          toast(data.error, {
            type: "error",
          });
        }
      });
  }

  async function queryEmail(email) {
    // make email url friendly
    const urlEmail = email.replace("@", "%40");

    // query db if email exists
    const result = await fetch(
      `/api/actions/accounts/getOneByEmail/${urlEmail}`
    );
    try {
      const resultJSON = await result.json();
      return resultJSON;
    } catch (err) {
      toast("Email not found", {
        type: "error",
      });
      return null;
    }
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

    // query db if email exists
    queryEmail(email).then((data) => {
      if (data) {
        // add member to room
        setMembers([...members, data]);
        // clear input
        e.target.value = "";
      }
    });
  };

  const removeMember = (email) => {
    setMembers((prev) => prev.filter((member) => member != email));
  };

  const formRefInput = useRef(null);

  return (
    <div className="min-h-screen mt-24 max-w-screen-lg mx-auto px-4">
      <section>
        <h2 className="font-bold text-4xl">Create New Classroom</h2>
        <p>
          Create a new classroom and invite your students so you can collect
          their records and align your teaching strategy with them
        </p>
      </section>

      <section className="my-8">
        <hr className="border-gray-700 mb-3" />
        <form
          action="#"
          onSubmit={onSubmit}
          ref={formRefInput}
          className="flex flex-col gap-2 w-full"
        >
          <div>
            <p className="p-1">Name: </p>
            <input
              className="border-b p-1 border-gray-500 w-full bg-gray-100"
              name="name"
            />
          </div>{" "}
          <div>
            <p className="p-1">School: </p>
            <input
              className="border-b p-1 border-gray-500 w-full bg-gray-100"
              name="school"
            />
          </div>{" "}
          <div>
            <p className="p-1">Note: </p>
            <input
              className="border-b p-1 border-gray-500 w-full bg-gray-100"
              name="note"
            />
          </div>{" "}
        </form>
        <div className="w-full">
          <p className="p-1">Members: </p>

          <div className="px-8">
            <div className="p-4">
              {members.map((member) => (
                <div
                  key={member}
                  className="flex justify-between items-center hover:bg-gray-200"
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
            </div>
            <input
              className="border-b p-1 w-full border-gray-300 mt-4"
              placeholder="Search Students Email Here"
              key={"input_mem"}
              onKeyUp={addMember}
            />
          </div>
        </div>
        <button
          className="p-1 border border-gray-500 bg-gray-500 text-white w-full mt-8"
          onClick={() => {
            formRefInput.current.requestSubmit();
          }}
        >
          Create
        </button>
      </section>
    </div>
  );
}

export default Page;
