import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Email {
  eid?: number;
  subject: string;
  content: string;
}

export default function EmailMarketingCampaign() {
  const { id } = useParams();
  const [emails, setEmails] = useState<Email[]>([
    {
      eid: 1,
      subject: "Exclusive offer for our valued customers",
      content: "Dear customer, we have an amazing deal just for you...",
    },
    {
      eid: 2,
      subject: "New product launch - be the first to know!",
      content: "Exciting news! We're launching a revolutionary product...",
    },
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubject && newContent) {
      setEmails([...emails, { subject: newSubject, content: newContent }]);
      setNewSubject("");
      setNewContent("");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Summer Sale Campaign</h2>
          <Link
            to="/campaigns"
            className="flex items-center text-sm font-medium hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Campaigns
          </Link>
        </div>
        <p className="text-lg mb-2">
          <strong>Company:</strong> SunnyDays Apparel
        </p>
        <p className="text-lg mb-2">
          <strong>Product:</strong> Beach-ready summer collection
        </p>
        <p className="text-lg">
          <strong>Target Audience:</strong> Young adults aged 18-35 interested
          in fashion and outdoor activities
        </p>
      </div>

      <div>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Generated Emails</h2>
          <ul className="space-y-6">
            {emails.map((email, index) => (
              <Link to={`/campaigns/${id}/${email.eid}`}>
                <li
                  key={index}
                  className="bg-card text-card-foreground rounded-lg p-4 shadow mb-4"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {email.subject}
                  </h3>
                  <p className="text-muted-foreground">{email.content}</p>
                </li>
              </Link>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Create New Email</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-1"
              >
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Enter email subject"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1"
              >
                Content
              </label>
              <Textarea
                id="content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Enter email content"
                rows={5}
                required
              />
            </div>
            <Button type="submit">Create Email</Button>
          </form>
        </section>
      </div>
    </div>
  );
}
