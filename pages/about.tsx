import Image from "next/image";
import Link from "next/link";

function Page() {
  return (
    <div className="mt-20 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold">About</h1>
      <div className="mt-8 flex flex-col gap-4 text-justify px-12">
        <p>
          The Index of Learning Styles is an on-line survey instrument used to
          assess preferences on four dimensions (active/reflective,
          sensing/intuitive, visual/verbal, and sequential/global) of a learning
          style model formulated by Richard M. Felder and Linda K. Silverman.
          The instrument was developed and validated by Richard M. Felder and
          Barbara A. Soloman. Users answer 44 a-b questions and submit the
          survey, and their four preferences are reported back to them
          immediately to be copied or printed out. The results are not stored:
          when the report window is closed,the results are irretrievably lost.
        </p>
        <p>
          ILS users should be aware of an important point. The survey results
          provide an indication of the respondent’s learning preferences and an
          even better indication of the preference distribution of a group of
          respondents (such as students in a class), but they should not be
          over-interpreted. A student’s learning style profile provides an
          indication of possible strengths and tendencies or habits that might
          lead to difficulty in academic settings. The profile does not reflect
          a student’s suitability or unsuitability for a particular subject,
          discipline, or profession. Such labeling is at best misleading, and
          can be harmful if the student uses the label as justification for a
          major shift in curriculum or career choice.
        </p>
      </div>
    </div>
  );
}

export default Page;
