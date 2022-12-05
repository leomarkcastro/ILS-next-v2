import AdminOnly from "@/components/auth/AdminOnly";
import GhostOnly from "@/components/auth/GhostOnly";
import UserOnly from "@/components/auth/UserOnly";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Page() {
  const session = useSession();

  const stepsOnExam = [
    {
      title: "Take the Exam",
      how: "The exam consists of 44 questions consisting of either A or B options. Pick the option that best describes you. The exam has no time limit but it is recommended to take it in one sitting.",
      image: "/exam.svg",
    },
    {
      title: "Analyzing the Results",
      how: "After analyzing the exam, you will be given a detailed report of your results. The report will include your learning style, description about your learning type and tips on how to improve your learning.",
      image: "/results.svg",
    },
    {
      title: "Share to the World!",
      how: "If you find this exam useful, feel free to share your result and the exam itself to the world!.",
      image: "/share.svg",
    },
  ];

  return (
    <div className="">
      <section className="flex min-h-screen border-b-8 border-orange-600">
        <div className="flex-1 flex flex-col justify-center items-center min-h-screen px-[10%] max-w-full lg:max-w-[70vw] mx-auto text-center text-black animate__animated animate__fadeIn">
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
          <h1 className="text-5xl">
            Index of{" "}
            <span className="text-orange-600 underline">Learning Styles</span>
          </h1>
          <p className="py-4 text-sm">
            Get to know more about yourself about these exploratory questions
            that would raise your self awareness and possibly your well-being
          </p>
          <p className="text-xs">Based from the Research Paper Conducted by</p>
          <p className="text-xs">Richard M. Felder and Barbara A. Soloman</p>
          <p className="text-xs">North Carolina State University</p>
          <GhostOnly>
            <Link href={"/exam"}>
              <a className="px-3 py-2 mt-4 text-white bg-orange-500 rounded-full w-fit">
                Take Exam
              </a>
            </Link>
          </GhostOnly>
          <UserOnly>
            <Link href={"/exam"}>
              <a className="px-3 py-2 mt-4 text-white bg-orange-500 rounded-full w-fit">
                Take Exam
              </a>
            </Link>
          </UserOnly>
          <AdminOnly>
            <Link href={"/classroom"}>
              <a className="px-3 py-1 mt-4 border-2 border-orange-500 rounded-full w-fit">
                Go To Admin
              </a>
            </Link>
          </AdminOnly>
        </div>
      </section>
      <section className="p-4 py-8 border-b">
        <div className="container max-w-5xl m-8 mx-auto">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            What is a Learning Style?
          </h2>
          <div className="flex flex-wrap text-center md:text-left">
            <div className="w-full p-6 sm:w-1/2">
              <h3 className="mb-3 text-3xl font-bold leading-none text-gray-800">
                History
              </h3>
              <p className="mb-8 text-gray-600">
                The Index of Learning Styles is an on-line survey instrument
                used to assess preferences on four dimensions
                (active/reflective, sensing/intuitive, visual/verbal, and
                sequential/global) of a learning style model formulated by
                Richard M. Felder and Linda K. Silverman. The instrument was
                developed and validated by Richard M. Felder and Barbara A.
                Soloman. Users answer 44 a-b questions and submit the survey,
                and their four preferences are reported back to them immediately
                to be copied or printed out.
              </p>
            </div>
            <div className="w-full p-6 sm:w-1/2">
              <div className="h-[50vh] object-center object-contain relative">
                <Image src="/history.svg" layout="fill" alt="historyOfILS" />
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse flex-wrap sm:flex-row">
            <div className="w-full p-6 mt-6 sm:w-1/2">
              <div className="h-[50vh] object-center object-contain relative">
                <Image src="/think.svg" layout="fill" alt="historyOfILS" />
              </div>
            </div>
            <div className="w-full p-6 mt-6 sm:w-1/2">
              <div className="align-middle">
                <h3 className="mb-3 text-3xl font-bold leading-none text-gray-800">
                  What does the results mean?
                </h3>
                <p className="mb-8 text-gray-600">
                  The survey results provide an indication of the respondent’s
                  learning preferences and an even better indication of the
                  preference distribution of a group of respondents (such as
                  students in a class), but they should not be over-interpreted.
                  A student’s learning style profile provides an indication of
                  possible strengths and tendencies or habits that might lead to
                  difficulty in academic settings. The profile does not reflect
                  a student’s suitability or unsuitability for a particular
                  subject, discipline, or profession.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 py-4 border-b">
        <div className="container flex flex-wrap pt-4 pb-6 mx-auto">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            What are the steps for <br />
            taking this assessment exam?
          </h2>

          <div className="flex flex-col flex-grow flex-shrink w-full p-6 md:w-1/3 md:flex-row">
            {stepsOnExam.map((step, index) => (
              <div className="flex-1" key={`step_${index}`}>
                <div className="relative w-full h-64">
                  <Image src={step.image} layout="fill" alt="" />
                </div>
                <a
                  href="#"
                  className="flex flex-wrap no-underline hover:no-underline"
                >
                  <div className="w-full px-6 text-xl font-bold text-gray-800">
                    {step.title}
                  </div>
                  <p className="w-full px-6 text-xs text-gray-600 md:text-sm">
                    {step.how}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container p-4 py-3 mx-auto mb-12 text-center">
        <h3 className="my-4 mb-8 text-3xl leading-tight">
          Take the Exam Now and Learn More About Yourself!
        </h3>
        <Link href={"/exam"}>
          <a className="px-6 py-3 mt-4 text-xl text-white bg-orange-500 rounded-full">
            Take the Exam Now
          </a>
        </Link>
      </section>
    </div>
  );
}

export default Page;
