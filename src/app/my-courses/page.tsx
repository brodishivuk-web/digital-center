import type { Metadata } from "next";
import { MyCoursesView } from "@/components/MyCoursesView";

export const metadata: Metadata = {
  title: "הקורסים שלי | Digital Center",
};

export default function MyCoursesPage() {
  return <MyCoursesView />;
}
