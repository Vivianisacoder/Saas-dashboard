import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import CountrySessions from "@/components/CountrySessions";

export default function CustomersPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-2xl font-bold tracking-tight mb-1">
                  Customers
                </h1>
                <p className="text-text-secondary text-sm sm:text-base">
                  Manage and analyze your customer base
                </p>
              </div>
            </header>

            <div className="grid gap-6">
              <div className="card p-6">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-6">
                  Geographic Distribution
                </h3>
                <CountrySessions />
              </div>
              {/* Add more customer-related components here */}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
