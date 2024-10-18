import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/authContext";

export function Header() {
  const { user, logout } = useAuth();

  console.log(user);
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
            <span>{user}</span>
          </div>
          <Button variant="secondary">New Campaign</Button>
          {user && (
            <Button variant="destructive" onClick={logout}>
              Log out
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
