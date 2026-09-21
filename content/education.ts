import type { Education } from "@/types/content";

/** Verbatim from the resume. `expected` never auto-flips; Bhanu updates it after graduating. */
export const education: Education[] = [
  {
    id: "csu-ms-information-systems",
    school: "Cleveland State University",
    degree: "Master of Science in Information Systems",
    location: "Cleveland, OH",
    end: "2026-12",
    expected: true,
    gpa: { label: "GPA", value: "3.77" },
  },
  {
    id: "vaagdevi-btech-ece",
    school: "Vaagdevi College of Engineering",
    degree: "Bachelor of Technology in Electronics & Communication Engineering",
    location: "India",
    start: "2019-08",
    end: "2023-08",
    gpa: { label: "CGPA", value: "3.6" },
  },
];
