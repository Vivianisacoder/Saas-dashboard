import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-2xl font-bold tracking-tight mb-1">
                  Profile
                </h1>
                <p className="text-text-secondary text-sm sm:text-base">
                  Manage your personal information
                </p>
              </div>
            </header>

            <div className="grid gap-6">
              <div className="card p-6">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-6">
                  Personal Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                      👨🏻‍💻
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">John Doe</h4>
                      <p className="text-text-secondary">Administrator</p>
                      <p className="text-text-secondary text-sm">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 border-t border-white/[0.05] pt-6">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Location
                      </p>
                      <p className="font-medium">San Francisco, CA</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Time Zone
                      </p>
                      <p className="font-medium">Pacific Time (PT)</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Member Since
                      </p>
                      <p className="font-medium">March 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Last Login
                      </p>
                      <p className="font-medium">Today at 2:34 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
