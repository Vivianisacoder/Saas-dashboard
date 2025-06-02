import { Construction } from "lucide-react";
import Link from "next/link";

interface UnderConstructionProps {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
}

export default function UnderConstruction({
  title = "Under Construction",
  message = "This page is currently being built. Please check back later.",
  showHomeLink = true,
}: UnderConstructionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-text-secondary mb-6 max-w-md">{message}</p>
      {showHomeLink && (
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return to Dashboard
        </Link>
      )}
    </div>
  );
}
