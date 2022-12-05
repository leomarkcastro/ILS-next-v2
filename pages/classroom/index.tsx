import AdminOnly from "@/components/auth/AdminOnly";
import UserOnly from "@/components/auth/UserOnly";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { Bars3Icon } from "@heroicons/react/24/solid";
import GlobalResultView from "@/components/pageComponets/classroom_root_examset_global";
import { useRouter } from "next/router";

const ClassroomCard = ({
  name,
  members,
  id,
  deleteClassroom,
  facilitator = false,
}) => {
  return (
    <div
      key={id}
      className="grid grid-cols-2 p-2 border border-gray-300 shadow-md"
    >
      <div>
        <p className="text-2xl">{name}</p>
        {facilitator && (
          <p>
            Facilitator: <strong>{facilitator}</strong>
          </p>
        )}
        {false && (
          <p>
            Classroom ID: <strong>{id}</strong>
          </p>
        )}
        <p>
          Total Members: <strong>{members}</strong>
        </p>
      </div>
      <div className="flex items-center justify-end gap-2 mr-4">
        <Link href={`/classroom/room/${id}`}>
          <a className="">View</a>
        </Link>
        <button className="" onClick={deleteClassroom}>
          Leave
        </button>
      </div>
    </div>
  );
};

function AdminPage(props) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [classrooms, setClassrooms] = useState([]);

  const router = useRouter();

  router.replace("/classroom/global");

  const menuList = ["Dashboard", "Classrooms"];

  const [isChecked, setIsChecked] = useState(false);

  function changeTab(index) {
    // console.log(index);
    setCurrentTabIndex(index);
    setIsChecked(false);
    // toggle ref checkbox
  }

  return (
    <div className="contents">
      <section>
        <h2 className="text-4xl font-bold">Admin Panel</h2>
      </section>
      <div className="p-2 d-drawer d-drawer-mobile">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="d-drawer-toggle"
          onChange={(event) => setIsChecked(event.currentTarget.checked)}
          checked={isChecked}
        />
        <div className="flex flex-col my-0 lg:my-0 d-drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="px-0 w-fit d-btn d-btn-primary d-btn-ghost d-drawer-button lg:hidden"
          >
            <Bars3Icon className="w-5 h-5 mr-4" />
            Open Menu
          </label>
          {currentTabIndex === 0 && (
            <section>
              <h2 className="hidden text-2xl">Welcome to the Admin Panel</h2>
              <br />
              <p>
                In this page, you can manage an examination set to get a
                collected result from a batch of students. To{" "}
                <strong>create a new classroom</strong>, click the classroom
                button below. To view a collected result of all the exams you
                taken, click the Global Results button.
              </p>
              <br />
              <div className="flex flex-col gap-2 my-4">
                <button
                  className="hidden p-4 text-xl border shadow d-btn-primary d-btn-block"
                  onClick={() => {
                    setIsChecked(false);
                    setCurrentTabIndex(1);
                  }}
                >
                  Classrooms
                </button>

                <Link href="/classroom/global">
                  <a className="p-4 text-xl text-center border shadow d-btn-secondary d-btn-block">
                    Global Results
                  </a>
                </Link>
              </div>
            </section>
          )}
          {currentTabIndex === 1 && (
            <section className="">
              <h3 className="text-2xl font-bold">Your Classrooms</h3>

              <div className="p-4">
                <Link href="/classroom/create">
                  <a>
                    <button className="w-full p-4 text-center border border-gray-500 rounded-md shadow-md cursor-pointer">
                      <p>Create a New Classroom</p>
                    </button>
                  </a>
                </Link>
              </div>
              <div className="flex flex-col gap-2 p-2 border-gray-500">
                {props._classrooms.map((classroom) => (
                  <ClassroomCard
                    key={classroom.id}
                    name={classroom.name}
                    members={classroom.members}
                    id={classroom.id}
                    deleteClassroom={() =>
                      props.deleteClassroom(
                        classroom.id,
                        classroom.name,
                        "delete"
                      )
                    }
                  />
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="d-drawer-side">
          <label htmlFor="my-drawer-2" className="d-drawer-overlay"></label>
          <ul className="hidden p-4 d-menu w-80 bg-base-100 text-base-content">
            {menuList.map((item, index) => (
              <li onClick={() => changeTab(index)} key={`menu_nav_${index}`}>
                <a>{item}</a>
              </li>
            ))}
            <li>
              <Link href="/classroom/global">
                <a>Global Results</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function UserPage(props) {
  return (
    <div className="contents">
      <section>
        <h2 className="text-4xl font-bold">Classrooms</h2>
        <p>Welcome, User!</p>
      </section>
      <section className="my-8">
        <hr className="mb-3 border-gray-700" />
        <h3 className="text-2xl font-bold">Joined Classes</h3>

        {false && (
          <div className="p-4">
            <div className="mx-auto w-fit">
              <input className="p-1 border border-gray-500" />
              <button className="p-1 text-white bg-gray-500 border border-gray-500">
                Join
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 p-2 border-gray-500">
          {props._joinedClassrooms.map((classroom) => (
            <ClassroomCard
              key={classroom.id}
              name={classroom.name}
              members={classroom.members}
              id={classroom.id}
              facilitator={classroom.facilitator}
              deleteClassroom={() =>
                props.deleteClassroom(classroom.id, classroom.name, "leave")
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Page() {
  const [classrooms, setClassrooms] = useState([]);
  const [joinedClassrooms, setJoinedClassrooms] = useState([]);

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

  async function loadPageDate() {
    const classrooms = await fetch("/api/actions/accounts/getClassrooms");
    const data = await classrooms.json();

    // console.log(data);

    const ownClassrooms = data.ClassesOwned.map((e) => {
      return {
        id: e.id,
        name: e.ClassProfile.name,
        members: e.Students.length,
      };
    });

    setClassrooms(ownClassrooms);

    const joinedClassrooms = data.ClassesJoined.map((e) => {
      return {
        id: e.class.id,
        name: e.class.ClassProfile.name,
        members: e.class.Students.length,
        facilitator: e.class.Facilitator.User.email,
      };
    });

    setJoinedClassrooms(joinedClassrooms);
  }

  useEffect(() => {
    loadPageDate();
  }, []);

  const deleteClassroom = (id, name, what) => {
    switch (what) {
      case "delete":
        openModal(`Are you sure you want to delete this Classroom [${name}]?`, [
          {
            id: "opti1",
            label: "Yes",
            onClick: async () => {
              const res = await fetch(`/api/actions/classroom/delete/${id}`, {
                method: "DELETE",
              });
              const data = await res.json();
              if (data) {
                closeModal();
                loadPageDate();
              }
            },
          },
          {
            id: "opti2",
            label: "No",
            onClick: closeModal,
          },
        ]);
        break;
      case "leave":
        openModal(`Are you sure you want to leave this Classroom [${name}]?`, [
          {
            id: "opti1",
            label: "Yes",
            onClick: async () => {
              const res = await fetch(`/api/actions/classroom/leave/${id}`, {
                method: "DELETE",
              });
              const data = await res.json();
              if (data) {
                closeModal();
                loadPageDate();
              }
            },
          },
          {
            id: "opti2",
            label: "No",
            onClick: closeModal,
          },
        ]);
        break;
    }
  };

  return (
    <div className="max-w-screen-lg min-h-screen p-2 mx-auto mt-24">
      <AdminOnly>
        <AdminPage
          classrooms={classrooms}
          _classrooms={classrooms}
          deleteClassroom={deleteClassroom}
        ></AdminPage>
      </AdminOnly>
      <UserOnly>
        <UserPage
          joinedClassrooms={joinedClassrooms}
          _joinedClassrooms={joinedClassrooms}
          deleteClassroom={deleteClassroom}
        ></UserPage>
      </UserOnly>
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

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/classroom/global",
      permanent: true,
    },
  };
}
