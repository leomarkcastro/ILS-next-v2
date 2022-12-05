import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
      <div
        className="flex flex-col justify-center items-center h-[80vh] text-center p-8 pt-20 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52) 50%, rgba(255, 255, 255, 1) 70%), url('/bg2.jpg')`,
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-5xl mb-8">Take The Exam</h1>
        <p className="max-w-[70%] my-4 hidden md:block">
          The Index of Learning Styles is an on-line survey instrument used to
          assess preferences on four dimensions (active/reflective,
          sensing/intuitive, visual/verbal, and sequential/global) of a learning
          style model formulated by Richard M. Felder and Linda K. Silverman.
        </p>
        <Link href="/exam/take">
          <a className="px-4 py-2 rounded-full bg-orange-500 text-white">
            Take the Exam
          </a>
        </Link>
      </div>
      <section className="p-4 border-b py-4">
        <div className="container mx-auto flex flex-wrap pt-4 pb-6">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            What are the steps for <br />
            taking this assessment exam?
          </h2>

          <div className="w-full md:w-1/3 p-6 flex flex-col md:flex-row flex-grow flex-shrink">
            {stepsOnExam.map((step, index) => (
              <div className="flex-1" key={`step_${index}`}>
                <div className="w-full h-64 relative">
                  <Image src={step.image} layout="fill" alt="" />
                </div>
                <a
                  href="#"
                  className="flex flex-wrap no-underline hover:no-underline"
                >
                  <div className="w-full font-bold text-xl text-gray-800 px-6">
                    {step.title}
                  </div>
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    {step.how}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
