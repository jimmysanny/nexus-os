import os

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Created: {path}')

# --- ADMIN LAYOUT ---
write('src/app/(admin)/admin/layout.tsx', '''import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <div className="text-lg font-extrabold text-[#f5a623]">FFA Admin</div>
          <div className="text-xs text-gray-500 mt-1">Academy Management</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin", label: "Overview", icon: "??" },
            { href: "/admin/courses", label: "Courses", icon: "??" },
            { href: "/admin/students", label: "Students", icon: "??" },
            { href: "/admin/blog", label: "Blog Posts", icon: "??" },
            { href: "/admin/analytics", label: "Analytics", icon: "??" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition text-sm">
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white text-sm transition">
            ? Back to Student View
          </Link>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
''')

# --- ADMIN OVERVIEW ---
write('src/app/(admin)/admin/page.tsx', '''import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminPage() {
  const [courses, students, posts] = await Promise.all([
    db.course.findMany({ include: { enrollments: true, lessons: true } }),
    db.user.findMany({ where: { role: "STUDENT" }, include: { enrollments: true } }),
    db.blogPost.findMany(),
  ]);

  const totalEnrollments = courses.reduce((a, c) => a + c.enrollments.length, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">Admin Overview</h1>
        <p className="text-gray-400">Manage your academy from here.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Courses", value: courses.length, icon: "??", color: "text-blue-400" },
          { label: "Total Students", value: students.length, icon: "??", color: "text-green-400" },
          { label: "Total Enrollments", value: totalEnrollments, icon: "??", color: "text-purple-400" },
          { label: "Blog Posts", value: posts.length, icon: "??", color: "text-[#f5a623]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className={"text-4xl font-extrabold mb-1 " + stat.color}>{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Courses</h2>
            <Link href="/admin/courses/new" className="bg-[#f5a623] text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#e09510] transition">+ New Course</Link>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 5).map((course) => (
              <Link key={course.id} href={"/admin/courses/" + course.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                <div>
                  <div className="font-semibold text-sm">{course.title}</div>
                  <div className="text-xs text-gray-400">{course.lessons.length} lessons · {course.enrollments.length} enrolled</div>
                </div>
                <span className={"text-xs px-2 py-1 rounded-full " + (course.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400")}>
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Students</h2>
            <Link href="/admin/students" className="text-[#f5a623] text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div>
                  <div className="font-semibold text-sm">{student.name || "Unknown"}</div>
                  <div className="text-xs text-gray-400">{student.email}</div>
                </div>
                <div className="text-xs text-gray-400">{student.enrollments.length} courses</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
''')

# --- ADMIN COURSES LIST ---
write('src/app/(admin)/admin/courses/page.tsx', '''import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminCoursesPage() {
  const courses = await db.course.findMany({ include: { lessons: true, enrollments: true }, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Courses</h1>
          <p className="text-gray-400">Create and manage your course catalog.</p>
        </div>
        <Link href="/admin/courses/new" className="bg-[#f5a623] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#e09510] transition">+ New Course</Link>
      </div>
      {courses.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">??</div>
          <h2 className="text-2xl font-bold mb-3">No courses yet</h2>
          <p className="text-gray-400 mb-6">Create your first course to get started.</p>
          <Link href="/admin/courses/new" className="bg-[#f5a623] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#e09510] transition">Create Course</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:border-white/20 transition">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <span className={"text-xs px-2 py-1 rounded-full " + (course.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400")}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{course.description}</p>
                <div className="flex gap-6 text-xs text-gray-500">
                  <span>?? </span>
                  <span>?? {course.lessons.length} lessons</span>
                  <span>?? {course.enrollments.length} students</span>
                </div>
              </div>
              <div className="flex gap-3 ml-6">
                <Link href={"/admin/courses/" + course.id} className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition">Edit</Link>
                <Link href={"/admin/courses/" + course.id + "/lessons"} className="px-4 py-2 bg-[#f5a623]/20 text-[#f5a623] rounded-xl text-sm hover:bg-[#f5a623]/30 transition">Lessons</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
''')

# --- NEW COURSE PAGE ---
write('src/app/(admin)/admin/courses/new/page.tsx', '''"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "" });

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, description: form.description, price: parseFloat(form.price) || 0 }),
    });
    const course = await res.json();
    router.push("/admin/courses/" + course.id);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">New Course</h1>
        <p className="text-gray-400">Fill in the details to create a new course.</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Course Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. 3-Month Foundation Course"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe what students will learn..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition resize-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Price (USD)</label>
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="0 for free"
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
        </div>
        <button onClick={handleSubmit} disabled={loading || !form.title}
          className="w-full bg-[#f5a623] text-black font-bold py-4 rounded-xl hover:bg-[#e09510] transition disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </div>
  );
}
''')

# --- ADMIN COURSE EDIT ---
write('src/app/(admin)/admin/courses/[courseId]/page.tsx', '''"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditCoursePage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/courses/" + courseId).then((r) => r.json()).then(setCourse);
  }, [courseId]);

  async function handleSave() {
    setLoading(true);
    await fetch("/api/courses/" + courseId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: course.title, description: course.description, price: course.price, isPublished: course.isPublished }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!course) return <div className="text-gray-400 animate-pulse">Loading course...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Edit Course</h1>
          <p className="text-gray-400">Update course details and settings.</p>
        </div>
        <Link href={"/admin/courses/" + courseId + "/lessons"} className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition">Manage Lessons ?</Link>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Course Title</label>
          <input value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f5a623] transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea value={course.description || ""} onChange={(e) => setCourse({ ...course, description: e.target.value })}
            rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f5a623] transition resize-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Price (USD)</label>
          <input value={course.price} onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) || 0 })}
            type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f5a623] transition" />
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
          <div>
            <div className="font-semibold">Published</div>
            <div className="text-sm text-gray-400">Make this course visible to students</div>
          </div>
          <button onClick={() => setCourse({ ...course, isPublished: !course.isPublished })}
            className={"w-12 h-6 rounded-full transition-colors " + (course.isPublished ? "bg-[#f5a623]" : "bg-white/20")}>
            <div className={"w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 " + (course.isPublished ? "translate-x-6" : "translate-x-0")} />
          </button>
        </div>
        <button onClick={handleSave} disabled={loading}
          className="w-full bg-[#f5a623] text-black font-bold py-4 rounded-xl hover:bg-[#e09510] transition disabled:opacity-50">
          {saved ? "? Saved!" : loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
''')

# --- ADMIN LESSONS PAGE ---
write('src/app/(admin)/admin/courses/[courseId]/lessons/page.tsx', '''"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function LessonsPage() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetch("/api/courses/" + courseId).then((r) => r.json()).then((c) => { setCourse(c); setLessons(c.lessons || []); });
  }, [courseId]);

  async function addLesson() {
    if (!newTitle.trim()) return;
    setAdding(true);
    const res = await fetch("/api/courses/" + courseId + "/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, position: lessons.length + 1 }),
    });
    const lesson = await res.json();
    setLessons([...lessons, lesson]);
    setNewTitle("");
    setAdding(false);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Lessons</h1>
          <p className="text-gray-400">{course?.title}</p>
        </div>
        <Link href={"/admin/courses/" + courseId} className="text-gray-400 hover:text-white text-sm transition">? Back to Course</Link>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <h2 className="font-bold mb-4">Add New Lesson</h2>
        <div className="flex gap-3">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Lesson title..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
          <button onClick={addLesson} disabled={adding || !newTitle.trim()}
            className="bg-[#f5a623] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#e09510] transition disabled:opacity-50">
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {lessons.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No lessons yet. Add your first lesson above.</div>
        ) : lessons.map((lesson, i) => (
          <div key={lesson.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 bg-[#f5a623]/20 text-[#f5a623] rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <div>
                <div className="font-semibold">{lesson.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {lesson.videoUrl ? "? Video" : "? No video"} · {lesson.fileUrl ? "? PDF" : "? No PDF"}
                </div>
              </div>
            </div>
            <Link href={"/admin/courses/" + courseId + "/lessons/" + lesson.id}
              className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
''')

# --- ADMIN LESSON EDIT ---
write('src/app/(admin)/admin/courses/[courseId]/lessons/[lessonId]/page.tsx', '''"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditLessonPage() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/courses/" + courseId + "/lessons/" + lessonId).then((r) => r.json()).then(setLesson);
  }, [lessonId]);

  async function handleSave() {
    setLoading(true);
    await fetch("/api/courses/" + courseId + "/lessons/" + lessonId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lesson),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!lesson) return <div className="text-gray-400 animate-pulse">Loading lesson...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Edit Lesson</h1>
          <p className="text-gray-400">{lesson.title}</p>
        </div>
        <Link href={"/admin/courses/" + courseId + "/lessons"} className="text-gray-400 hover:text-white text-sm">? Back to Lessons</Link>
      </div>
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">Basic Info</h2>
          <div>
            <label className="block text-sm font-semibold mb-2">Lesson Title</label>
            <input value={lesson.title} onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f5a623] transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea value={lesson.description || ""} onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
              rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f5a623] transition resize-none" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">?? Video</h2>
          <p className="text-sm text-gray-400">Paste a YouTube or Vimeo URL.</p>
          <input value={lesson.videoUrl || ""} onChange={(e) => setLesson({ ...lesson, videoUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
          {lesson.videoUrl && (
            <div className="mt-3 aspect-video rounded-xl overflow-hidden bg-black">
              <iframe src={lesson.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
                className="w-full h-full" allowFullScreen />
            </div>
          )}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">?? PDF / Workbook</h2>
          <p className="text-sm text-gray-400">Paste a direct link to the PDF file (Google Drive, Dropbox, etc.).</p>
          <input value={lesson.fileUrl || ""} onChange={(e) => setLesson({ ...lesson, fileUrl: e.target.value })}
            placeholder="https://drive.google.com/..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">Published</div>
              <div className="text-sm text-gray-400">Make this lesson visible to enrolled students</div>
            </div>
            <button onClick={() => setLesson({ ...lesson, isPublished: !lesson.isPublished })}
              className={"w-12 h-6 rounded-full transition-colors " + (lesson.isPublished ? "bg-[#f5a623]" : "bg-white/20")}>
              <div className={"w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 " + (lesson.isPublished ? "translate-x-6" : "translate-x-0")} />
            </button>
          </div>
        </div>
        <button onClick={handleSave} disabled={loading}
          className="w-full bg-[#f5a623] text-black font-bold py-4 rounded-xl hover:bg-[#e09510] transition disabled:opacity-50">
          {saved ? "? Saved!" : loading ? "Saving..." : "Save Lesson"}
        </button>
      </div>
    </div>
  );
}
''')

# --- ADMIN BLOG ---
write('src/app/(admin)/admin/blog/page.tsx', '''"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog").then((r) => r.json()).then(setPosts);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Blog Posts</h1>
          <p className="text-gray-400">Write and manage trading insights.</p>
        </div>
        <Link href="/admin/blog/new" className="bg-[#f5a623] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#e09510] transition">+ New Post</Link>
      </div>
      {posts.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">??</div>
          <h2 className="text-2xl font-bold mb-3">No posts yet</h2>
          <Link href="/admin/blog/new" className="bg-[#f5a623] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#e09510] transition">Write First Post</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold">{post.title}</h3>
                  <span className={"text-xs px-2 py-1 rounded-full " + (post.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400")}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <Link href={"/admin/blog/" + post.id} className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition">Edit</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
''')

# --- NEW BLOG POST ---
write('src/app/(admin)/admin/blog/new/page.tsx', '''"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "", isPublished: false });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const post = await res.json();
    router.push("/admin/blog");
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">New Blog Post</h1>
        <p className="text-gray-400">Write a trading insight or academy update.</p>
      </div>
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Post Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. How to Read the Dark Zone on NQ Futures"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Cover Image URL (optional)</label>
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your post here..."
              rows={16}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] transition resize-none font-mono text-sm" />
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <div className="font-semibold">Publish immediately</div>
              <div className="text-sm text-gray-400">Make this post visible on the blog</div>
            </div>
            <button onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
              className={"w-12 h-6 rounded-full transition-colors " + (form.isPublished ? "bg-[#f5a623]" : "bg-white/20")}>
              <div className={"w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 " + (form.isPublished ? "translate-x-6" : "translate-x-0")} />
            </button>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={loading || !form.title || !form.content}
          className="w-full bg-[#f5a623] text-black font-bold py-4 rounded-xl hover:bg-[#e09510] transition disabled:opacity-50">
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
}
''')

# --- ADMIN STUDENTS ---
write('src/app/(admin)/admin/students/page.tsx', '''import { db } from "@/lib/db";

export default async function AdminStudentsPage() {
  const students = await db.user.findMany({
    where: { role: "STUDENT" },
    include: { enrollments: { include: { course: true } }, certificates: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">Students</h1>
        <p className="text-gray-400">{students.length} registered students</p>
      </div>
      {students.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">??</div>
          <h2 className="text-2xl font-bold mb-3">No students yet</h2>
          <p className="text-gray-400">Students will appear here once they sign up.</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left text-xs text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Courses</th>
                <th className="px-6 py-4">Certificates</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {student.imageUrl && <img src={student.imageUrl} className="w-8 h-8 rounded-full" alt="" />}
                      <span className="font-semibold text-sm">{student.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{student.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.enrollments.map((e) => (
                        <span key={e.id} className="text-xs bg-[#f5a623]/20 text-[#f5a623] px-2 py-0.5 rounded-full">{e.course.title.substring(0, 20)}</span>
                      ))}
                      {student.enrollments.length === 0 && <span className="text-xs text-gray-500">None</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={"text-sm font-bold " + (student.certificates.length > 0 ? "text-[#f5a623]" : "text-gray-500")}>{student.certificates.length}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{new Date(student.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
''')

# --- STUDENT COURSE VIEW ---
write('src/app/(dashboard)/courses/[courseId]/page.tsx', '''import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: { lessons: { where: { isPublished: true }, orderBy: { position: "asc" } }, enrollments: true },
  });

  if (!course) redirect("/dashboard/courses");

  const isEnrolled = course.enrollments.some((e) => e.userId === user?.id);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#f5a623]">Futures Forex Academy</Link>
        <div className="flex gap-6 text-sm text-gray-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/courses" className="text-white font-semibold">Courses</Link>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/dashboard/courses" className="text-gray-400 hover:text-white text-sm mb-6 inline-block">? Back to Courses</Link>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 text-[#f5a623] text-xs font-semibold px-3 py-1 rounded-full mb-4">{course.lessons.length} Lessons</div>
            <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
            <p className="text-gray-400 text-lg mb-8">{course.description}</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Course Curriculum</h2>
              </div>
              {course.lessons.length === 0 ? (
                <div className="p-12 text-center text-gray-400">No lessons yet.</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {course.lessons.map((lesson, i) => (
                    <div key={lesson.id} className="flex items-center justify-between p-5 hover:bg-white/5 transition">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 bg-[#f5a623]/20 text-[#f5a623] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                        <div>
                          <div className="font-semibold">{lesson.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5 flex gap-3">
                            {lesson.videoUrl && <span>?? Video</span>}
                            {lesson.fileUrl && <span>?? PDF</span>}
                          </div>
                        </div>
                      </div>
                      {isEnrolled ? (
                        <Link href={"/dashboard/courses/" + course.id + "/lessons/" + lesson.id}
                          className="text-[#f5a623] text-sm font-semibold hover:underline">Watch ?</Link>
                      ) : (
                        <span className="text-gray-500 text-sm">??</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-6">
              <div className="text-4xl font-extrabold text-[#f5a623] mb-2">{course.price === 0 ? "Free" : "$" + course.price}</div>
              <div className="text-gray-400 text-sm mb-6">{course.lessons.length} lessons included</div>
              {isEnrolled ? (
                <div>
                  <div className="bg-green-500/20 text-green-400 text-center py-3 rounded-xl font-semibold mb-4">? Enrolled</div>
                  {course.lessons[0] && (
                    <Link href={"/dashboard/courses/" + course.id + "/lessons/" + course.lessons[0].id}
                      className="block text-center bg-[#f5a623] text-black font-bold py-3 rounded-xl hover:bg-[#e09510] transition">
                      Continue Learning ?
                    </Link>
                  )}
                </div>
              ) : (
                <form action="/api/enrollments" method="POST">
                  <input type="hidden" name="courseId" value={course.id} />
                  <Link href="#enroll"
                    className="block text-center bg-[#f5a623] text-black font-bold py-4 rounded-xl hover:bg-[#e09510] transition text-lg">
                    {course.price === 0 ? "Enroll Free" : "Enroll Now"}
                  </Link>
                </form>
              )}
              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-[#f5a623]">?</span> {course.lessons.length} structured lessons</li>
                <li className="flex items-center gap-2"><span className="text-[#f5a623]">?</span> Video lessons + PDF workbooks</li>
                <li className="flex items-center gap-2"><span className="text-[#f5a623]">?</span> Progress tracking</li>
                <li className="flex items-center gap-2"><span className="text-[#f5a623]">?</span> Certificate on completion</li>
                <li className="flex items-center gap-2"><span className="text-[#f5a623]">?</span> Discord community access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
''')

# --- STUDENT LESSON VIEW ---
write('src/app/(dashboard)/courses/[courseId]/lessons/[lessonId]/page.tsx', '''import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

function getEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  if (url.includes("vimeo.com/")) return url.replace("vimeo.com/", "player.vimeo.com/video/");
  return url;
}

export default async function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  const enrollment = await db.enrollment.findUnique({ where: { userId_courseId: { userId: user?.id ?? "", courseId: params.courseId } } });
  if (!enrollment) redirect("/dashboard/courses/" + params.courseId);

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: { lessons: { where: { isPublished: true }, orderBy: { position: "asc" } } },
  });

  const lesson = await db.lesson.findUnique({ where: { id: params.lessonId } });
  if (!lesson || !course) redirect("/dashboard/courses");

  const currentIndex = course.lessons.findIndex((l) => l.id === params.lessonId);
  const prevLesson = course.lessons[currentIndex - 1];
  const nextLesson = course.lessons[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <aside className="w-72 border-r border-white/10 fixed h-full flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href={"/dashboard/courses/" + course.id} className="text-[#f5a623] text-sm hover:underline">? {course.title}</Link>
          <div className="text-xs text-gray-400 mt-1">{course.lessons.length} lessons</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {course.lessons.map((l, i) => (
            <Link key={l.id} href={"/dashboard/courses/" + course.id + "/lessons/" + l.id}
              className={"flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition " + (l.id === params.lessonId ? "bg-[#f5a623]/20 text-[#f5a623] font-semibold" : "text-gray-300 hover:bg-white/5 hover:text-white")}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
              <span className="truncate">{l.title}</span>
            </Link>
          ))}
        </div>
      </aside>
      <main className="ml-72 flex-1 p-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-6">{lesson.title}</h1>
        {lesson.videoUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-8">
            <iframe src={getEmbedUrl(lesson.videoUrl)} className="w-full h-full" allowFullScreen />
          </div>
        )}
        {lesson.description && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="font-bold mb-3">About This Lesson</h2>
            <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
          </div>
        )}
        {lesson.fileUrl && (
          <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-2xl p-6 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">??</span>
              <div>
                <div className="font-bold">Lesson Workbook</div>
                <div className="text-sm text-gray-400">PDF download included with this lesson</div>
              </div>
            </div>
            <a href={lesson.fileUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#f5a623] text-black font-bold px-5 py-2 rounded-xl hover:bg-[#e09510] transition text-sm">
              Download PDF
            </a>
          </div>
        )}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
          {prevLesson ? (
            <Link href={"/dashboard/courses/" + course.id + "/lessons/" + prevLesson.id}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              ? {prevLesson.title}
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link href={"/dashboard/courses/" + course.id + "/lessons/" + nextLesson.id}
              className="flex items-center gap-2 bg-[#f5a623] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#e09510] transition">
              Next: {nextLesson.title} ?
            </Link>
          ) : (
            <Link href={"/dashboard/courses/" + course.id}
              className="flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition">
              ? Complete Course
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
''')

# --- API ROUTES ---
write('src/app/api/courses/[courseId]/route.ts', '''import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const course = await db.course.findUnique({ where: { id: params.courseId }, include: { lessons: { orderBy: { position: "asc" } } } });
  return NextResponse.json(course);
}

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const data = await req.json();
  const course = await db.course.update({ where: { id: params.courseId }, data });
  return NextResponse.json(course);
}
''')

write('src/app/api/courses/[courseId]/lessons/route.ts', '''import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { title, position } = await req.json();
  const lesson = await db.lesson.create({ data: { title, position, courseId: params.courseId } });
  return NextResponse.json(lesson);
}
''')

write('src/app/api/courses/[courseId]/lessons/[lessonId]/route.ts', '''import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { courseId: string; lessonId: string } }) {
  const lesson = await db.lesson.findUnique({ where: { id: params.lessonId } });
  return NextResponse.json(lesson);
}

export async function PATCH(req: Request, { params }: { params: { courseId: string; lessonId: string } }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const data = await req.json();
  const lesson = await db.lesson.update({ where: { id: params.lessonId }, data });
  return NextResponse.json(lesson);
}
''')

write('src/app/api/blog/route.ts', '''import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const data = await req.json();
  const post = await db.blogPost.create({ data });
  return NextResponse.json(post);
}
''')

write('src/app/api/enrollments/route.ts', '''import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { courseId } = await req.json();
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return new NextResponse("User not found", { status: 404 });
  const existing = await db.enrollment.findUnique({ where: { userId_courseId: { userId: user.id, courseId } } });
  if (existing) return NextResponse.json(existing);
  const enrollment = await db.enrollment.create({ data: { userId: user.id, courseId } });
  return NextResponse.json(enrollment);
}
''')

# --- ABOUT PAGE ---
write('src/app/(marketing)/about/page.tsx', '''import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#f5a623]">Futures Forex Academy</Link>
          <div className="flex gap-6 text-sm text-gray-300">
            <Link href="/#courses" className="hover:text-white">Courses</Link>
            <Link href="/about" className="text-white font-semibold">About</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/sign-in" className="hover:text-white">Login</Link>
          </div>
        </div>
      </nav>
      <main>
        <section className="pt-40 pb-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-[#f5a623]/10 border border-[#f5a623]/30 text-[#f5a623] text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">Our Story</div>
            <h1 className="text-6xl font-extrabold mb-6">Built by Traders, <span className="text-[#f5a623]">For Traders.</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">Futures Forex Academy was founded with a single mission: to give retail traders access to the same algorithmic frameworks used by institutional players — presented in a clear, structured, and results-driven curriculum.</p>
          </div>
        </section>
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-16">The THADI System</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-4xl mb-4">??</div>
                <h3 className="text-2xl font-bold mb-3 text-[#f5a623]">TrendSync</h3>
                <p className="text-gray-400 leading-relaxed">TrendSync is our proprietary trend identification framework. It teaches traders how to identify the dominant market trend across multiple timeframes and align every trade decision with institutional order flow — eliminating countertrend trades that destroy accounts.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-4xl mb-4">??</div>
                <h3 className="text-2xl font-bold mb-3 text-[#f5a623]">Dark Zone R.A.D.A.R.</h3>
                <p className="text-gray-400 leading-relaxed">R.A.D.A.R. (Reversal Area Detection and Response) is our precision entry system. It identifies the specific price zones where institutions are actively buying or selling — giving you high-probability entries with defined risk and clear targets.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6">Why Choose FFA?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: "??", title: "Algorithm-First", desc: "Every concept is backed by a systematic, repeatable algorithm — not gut feelings or indicators." },
                { icon: "??", title: "Structured Curriculum", desc: "From market basics to live algo deployment — a clear path from beginner to professional trader." },
                { icon: "??", title: "Community Driven", desc: "Join a Discord community of traders applying the same framework — get feedback, share setups, grow together." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6">Ready to Trade with Structure?</h2>
            <p className="text-gray-400 text-lg mb-10">Join hundreds of traders who have transformed their trading using the THADI system.</p>
            <Link href="/sign-up" className="bg-[#f5a623] text-black font-bold px-12 py-5 rounded-xl text-xl hover:bg-[#e09510] transition">Start Learning Free</Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-12 px-6 text-center text-gray-500 text-sm">
        <div className="text-[#f5a623] font-bold text-lg mb-3">Futures Forex Academy</div>
        <p>© 2026 Futures Forex Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
''')

print("\\n? ALL PAGES CREATED SUCCESSFULLY!")
print("Pages created: Admin dashboard, Course builder, Lesson editor, Blog editor, Students table, Course view, Lesson player, About page, All API routes")
