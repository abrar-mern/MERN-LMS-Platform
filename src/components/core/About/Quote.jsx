import React from "react";

/**
 * Quote component
 * Props:
 * - intro: string (leading text)
 * - highlights: array of { text, gradientClass }
 * - outro: string (trailing text)
 * - className: additional classes for container
 */
const Quote = ({
  intro = "We are passionate about revolutionizing the way we learn. Our innovative platform",
  highlights = [
    {
      text: "combines technology",
      gradientClass: "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]",
    },
    { text: "expertise", gradientClass: "from-[#FF512F] to-[#F09819]" },
    {
      text: "unparalleled educational experience",
      gradientClass: "from-[#E65C00] to-[#F9D423]",
    },
  ],
  middle = "",
  outro = ".",
  className = "",
}) => {
  const len = highlights.length;

  return (
    <div
      className={`text-lg md:text-3xl lg:text-4xl font-semibold mx-auto py-6 text-center text-white ${className}`}
      role="article"
      aria-label="About quote"
    >
      <span className="text-richblack-5">{intro} </span>

      {len === 0 ? null : (
        <>
          {/* render all highlights except last */}
          {highlights.slice(0, len - 1).map((h, idx) => (
            <React.Fragment key={idx}>
              <span
                className={`bg-gradient-to-b ${h.gradientClass} text-transparent bg-clip-text font-bold`}
              >
                {h.text}
              </span>
              <span className="text-richblack-5">
                {idx < len - 2 ? ", " : ", "}
              </span>
            </React.Fragment>
          ))}

          {/* optional middle text (normal) */}
          {middle ? <span className="text-richblack-5">{middle} </span> : null}

          {/* last highlight */}
          <span
            className={`bg-gradient-to-b ${highlights[len - 1].gradientClass} text-transparent bg-clip-text font-bold`}
          >
            {highlights[len - 1].text}
          </span>
          <span className="text-richblack-5">{outro}</span>
        </>
      )}
    </div>
  );
};

export default Quote;
