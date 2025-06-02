import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";

export default function SettingsPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-2xl font-bold tracking-tight mb-1">
                  Settings
                </h1>
                <p className="text-text-secondary text-sm sm:text-base">
                  Manage your account and preferences
                </p>
              </div>
            </header>

            <div className="card p-6">
              <UnderConstruction
                title="Settings Coming Soon"
                message="We're working hard to bring you powerful settings and customization options. Stay tuned!"
                showHomeLink={false}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
