import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

interface Email {
  id: string;
  subject: string;
  content: string;
}

export default function Component() {
  const { id, eid } = useParams();
  const [email, setEmail] = useState<Email | null>(null);
  const [recipients, setRecipients] = useState("");
  const [isSend, setIsSend] = useState(false);

  const fetchEmail = async () => {
    try {
      const response = await fetch(
        `https://email-campaign-platform.vercel.app/campaigns/${id}/emails/${eid}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Could not fetch email");
      }
      const data: Email = await response.json();

      console.log(data);
      setEmail(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  const sendEmail: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://email-campaign-platform.vercel.app/campaigns/${id}/emails/${eid}/send",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recipients, email }),
        }
      );
      if (!response.ok) {
        throw new Error("Could not send email");
      }

      const data = await response.json();
      console.log(data);
      setIsSend(data.isSend);
    } catch (error) {
      console.error(error);
      alert("Could not send email");
    }
  };
  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex flex-row justify-between bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Campaign Email</h1>
        <Link to={`/campaigns/${id}`} className="flex flex-row items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaign
        </Link>
      </div>
      <div className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="text-white text-lg font-medium">
          Subject: {email?.subject}
        </div>
        <div className="flex items-center gap-4">
          <Button className="text-white hover:bg-white hover:text-black transition-colors">
            Schedule Email
          </Button>
          <Button
            variant="destructive"
            className="hover:bg-white hover:text-black transition-colors"
          >
            Delete Email
          </Button>
        </div>
      </div>
      {isSend && (
        <div className="bg-card rounded-lg shadow-lg p-6 mt-4 bg-green-300">
          <div className="prose max-w-none">
            <p>Email sent successfully!</p>
          </div>
        </div>
      )}
      <form className="flex-1 p-8 w-full" onSubmit={sendEmail}>
        <input
          className="mb-3 w-full px-3 py-2 shadow-lg p-6"
          type="email"
          placeholder="You can only send email to the one who owns the resend api key"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
        <div className="bg-card rounded-lg shadow-lg p-6">
          <div className="prose max-w-none">
            <p>{email?.content}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="text-white hover:bg-white hover:text-black transition-colors"
          >
            Send Email
          </Button>
        </div>
      </form>
    </div>
  );
}
