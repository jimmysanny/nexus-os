export default function SettingsPage() {
  return (
    <div className="p-8 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-8">
        <div>
            <h3 className="text-xl font-bold mb-2">Profile Information</h3>
            <p className="text-gray-400 mb-4">Manage your account details and password.</p>
            <div className="flex gap-4">
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition">Edit Profile</button>
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition">Change Password</button>
            </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
            <h3 className="text-xl font-bold mb-2 text-red-400">Danger Zone</h3>
            <p className="text-gray-400 mb-4">Permanently delete your account and all data.</p>
            <button className="border border-red-900 text-red-500 hover:bg-red-900/20 px-4 py-2 rounded-lg font-medium transition">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
