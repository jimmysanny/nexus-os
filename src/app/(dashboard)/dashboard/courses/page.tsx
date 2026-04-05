import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

export default async function CoursesPage() {
  const { userId } = await auth();

  const tenant = await db.tenant.findFirst({ where: { ownerId: userId! } });

  const courses = tenant
    ? await db.course.findMany({
        where: { tenantId: tenant.id },
        include: { _count: { select: { enrollments: true, chapters: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2A4A]">Courses</h1>
          <p className="text-gray-500 mt-1">Manage and publish your courses</p>
        </div>
        <Link
          href="/dashboard/courses/new"
          className="flex items-center gap-2 bg-[#1B2A4A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1B2A4A]/90 transition-colors"
        >
          <Plus size={16} /> New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <BookOpen size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No courses yet</p>
          <p className="text-sm text-gray-400 mt-1">Create your first course to get started</p>
          <Link
            href="/dashboard/courses/new"
            className="mt-4 inline-block bg-[#C9A84C] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#C9A84C]/90 transition-colors"
          >
            Create Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/courses/${course.id}`}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  course.isPublished
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {course.isPublished ? "Published" : "Draft"}
                </span>
                <span className="text-sm font-semibold text-[#C9A84C]">
                  KES {course.price.toLocaleString()}
                </span>
              </div>
              <h3 className="font-semibold text-[#1B2A4A] group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                {course.title}
              </h3>
              {course.description && (
                <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{course.description}</p>
              )}
              <div className="flex gap-4 mt-4 text-xs text-gray-400">
                <span>{course._count.chapters} chapters</span>
                <span>{course._count.enrollments} students</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
