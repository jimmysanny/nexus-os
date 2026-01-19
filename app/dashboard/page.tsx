import { getFunnels } from "@/app/actions/funnel";

export default async function Dashboard() {
  const funnels = await getFunnels();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Your Funnels</h1>
      <ul>
        {funnels.map((funnel) => (
          <li key={funnel.id}>
            {funnel.name} - Visits: {funnel.visits}
            <a href={`/editor/${funnel.id}`} className="ml-4 text-blue-500">Edit</a>
          </li>
        ))}
      </ul>
      <a href="/editor/new" className="mt-4 block text-blue-500">Create New Funnel</a>
    </div>
  );
}
