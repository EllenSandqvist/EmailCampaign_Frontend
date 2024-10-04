import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

export default function Component() {
  const id = useParams().id;
  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex flex-row justify-between bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Summer Sale Campaign</h1>
        <Link to={`/campaigns/${id}`}>Back to Campaign</Link>
      </div>
      <div className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="text-white text-lg font-medium">
          Subject: Huge Savings on Summer Essentials
        </div>
        <div className="flex items-center gap-4">
          <Button className="text-white hover:bg-white hover:text-black transition-colors">
            Save as Draft
          </Button>
          <Button className="text-white hover:bg-white hover:text-black transition-colors">
            Schedule Email
          </Button>
          <Button
            variant="destructive"
            className="hover:bg-white hover:text-black transition-colors"
          >
            Delete Email
          </Button>
          <Button className="text-white hover:bg-white hover:text-black transition-colors">
            Send Email
          </Button>
        </div>
      </div>
      <section className="flex-1 p-8">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <div className="prose max-w-none">
            <p>Dear Valued Customers,</p>
            <p>
              We're excited to announce our Summer Sale, where you can enjoy
              incredible savings on a wide range of summer essentials. From
              lightweight clothing to outdoor gear, we've got everything you
              need to make the most of the warm weather.
            </p>
            <p>
              Don't miss out on this limited-time opportunity to stock up on all
              your summer must-haves. Shop now and take advantage of our
              unbeatable discounts.
            </p>
            <p>We look forward to seeing you in our stores or online.</p>
            <p>
              Best regards,
              <br />
              The Acme Team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
