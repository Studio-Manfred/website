import { courses } from "@/lib/courses";
import { CourseDetail } from "@/components/CourseDetail";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Business Design — Studio Manfred" };

export default function Page() {
  return <CourseDetail course={courses.find((c) => c.slug === "business-design")!} />;
}
