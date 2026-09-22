import type { Education } from "@/types/content";

/** EXAMPLE CONTENT — entirely fictional schools. */
export const education: Education[] = [
  {
    id: "cascade-state-ms-data-science",
    school: "Cascade State University",
    degree: "Master of Science in Data Science",
    location: "Seattle, WA",
    start: "2019-08",
    end: "2021-05",
    gpa: { label: "GPA", value: "3.8" },
  },
  {
    id: "riverside-college-bs-computer-science",
    school: "Riverside College",
    degree: "Bachelor of Science in Computer Science",
    location: "Portland, OR",
    start: "2014-08",
    end: "2018-05",
    gpa: { label: "GPA", value: "3.5" },
  },
];
