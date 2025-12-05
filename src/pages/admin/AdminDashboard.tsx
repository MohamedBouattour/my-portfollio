export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-bold">Total Projects</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">3</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-bold">Admin Status</p>
          <p className="text-4xl font-bold text-green-600 mt-2">✓ Active</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-bold">Last Updated</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">Today</p>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Admin Panel
        </h2>
        <p className="text-gray-700 mb-4">
          Manage your portfolio content from here. Use the sidebar to navigate
          between:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Projects - Add, edit, or delete portfolio projects</li>
          <li>Skills - Manage your technical skills</li>
        </ul>
      </div>
    </div>
  );
}
