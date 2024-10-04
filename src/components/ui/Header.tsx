import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <Link
          to="/campaigns"
          className="flex items-center text-sm font-medium hover:underline"
        >
          <h1 className="text-2xl font-bold">MarketPro</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserCircle className="h-6 w-6" />
            <span>John Doe</span>
          </div>
          <Button variant="secondary">New Campaign</Button>
          <Button variant="destructive">Log out</Button>
        </div>
      </nav>
    </header>
  );
}
