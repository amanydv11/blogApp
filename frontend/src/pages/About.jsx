import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className="text-3xl font-serif font-semibold text-center my-7">
            About EduGlint
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to Eduglint, your comprehensive destination for knowledge
              and exploration. We are dedicated to providing valuable and
              engaging content across a wide array of topics, including
              programming languages, regional insights, culinary delights,
              educational institutions, and travel experiences.
            </p>
            <p>
              At Eduglint, we aim to empower learners, travelers, and
              enthusiasts by offering well-researched and reliable information.
              Our platform serves as a bridge to knowledge, connecting you with
              the resources you need to expand your horizons and make informed
              decisions.
            </p>
            <p>
              Whether you are seeking to enhance your technical skills, explore
              the rich cultural heritage of different states, discover exquisite
              cuisines, find the right college, or plan your next journey,
              Eduglint is here to guide you.
            </p>
            <p>
              With a commitment to quality and accuracy, Eduglint is designed to
              inspire curiosity, spark creativity, and promote lifelong
              learning. Together, let’s explore the endless possibilities that
              knowledge can bring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
