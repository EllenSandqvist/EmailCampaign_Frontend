import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCompletion } from "ai/react";

interface Email {
  id: string;
  subject: string;
  content: string;
}

interface Campaign {
  id: number;
  campaignName: string;
  companyName: string;
  companyDescription: string;
  productDescription: string;
  targetAudience: String[];
  createdAt: string | number | Date;
  userId: String;
}

//TODO Fetch av campaign är ok, uppdatera return med rätt värden
export default function EmailMarketingCampaign() {
  const { id } = useParams();
  const [emails, setEmails] = useState<Email[]>([]);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [generatedContent, setGeneratedContent] = useState({
    title: "",
    content: "",
  });

  const fetchCampaign = async () => {
    try {
      const response = await fetch(
        `https://email-campaign-platform.vercel.app/campaigns/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Could not fetch campaign");
      }
      const data: Campaign = await response.json();

      console.log(data);
      setCampaign(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch(
        `https://email-campaign-platform.vercel.app/campaigns/${id}/emails`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Could not fetch emails");
      }
      const data: Email[] = await response.json();

      console.log(data);
      setEmails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://email-campaign-platform.vercel.app/campaigns/${id}/emails`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: title,
            content: content,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Could not save email. Try again");
      }
      const data = await response.json();
      setEmails([...emails, data]);
    } catch (error) {
      console.error(error);
      alert("Could not save email. Please try again");
    }
  };

  // Ändrad kod från tidigare const { complete, completion, isLoading } = useCompletion({
  const { complete, completion } = useCompletion({
    api: "https://email-campaign-platform.vercel.app/ai",
    credentials: "include",
    onResponse: (response) => {
      console.log("Streaming started", response);
      const reader = response.body?.getReader();
      if (reader) {
        readStream(reader);
      }
    },
    // Ändrad kod från tidigare onFinish: (prompt, completion) => {
    onFinish: (completion) => {
      console.log("Streaming finished", completion);
    },
  });

  const readStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line.startsWith("data: ")) {
          const jsonStr = line.slice(6);
          if (jsonStr === "[DONE]") {
            console.log("Stream complete");
          } else {
            try {
              const parsedData = JSON.parse(jsonStr);
              setGeneratedContent((prev) => ({ ...prev, ...parsedData }));
            } catch (error) {
              console.error("Failed to parse JSON:", error);
            }
          }
        }
      }

      buffer = lines[lines.length - 1];
    }
  };
  useEffect(() => {
    if (completion) {
      try {
        const parsedCompletion = JSON.parse(completion);
        setGeneratedContent(parsedCompletion);
      } catch (error) {
        console.error("Failed to parse completion:", error);
      }
    }
  }, [completion]);

  useEffect(() => {
    setTitle(generatedContent.title);
    setContent(generatedContent.content);
  }, [generatedContent]);

  const handleAiCheck = async () => {
    try {
      await complete("", {
        body: { title, content },
        headers: {
          "Content-Type": "application/json",
          mode: "check",
        },
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleAiGenerate = async () => {
    try {
      await complete("", {
        body: {
          company: campaign?.companyName,
          productDescription: campaign?.productDescription,
          audience: campaign?.targetAudience,
        },
        headers: {
          "Content-Type": "application/json",
          mode: "generate",
        },
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setGeneratedContent({ title: "", content: "" });
  //   await complete("", {
  //     body: { topic, audience, tone, length },
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    <div className="w-full">
      <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{campaign?.companyName}</h2>
          <Link
            to="/campaigns"
            className="flex items-center text-sm font-medium hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Campaigns
          </Link>
        </div>
        <p className="text-lg mb-2">
          <strong>Campaign:</strong> {campaign?.campaignName}
        </p>
        <p className="text-lg mb-2">
          <strong>Product Description:</strong> {campaign?.productDescription}
        </p>
        <div className="text-lg">
          <strong>Target Audience:</strong>{" "}
          <ul>
            {campaign?.targetAudience.map((audience, index) => (
              <li className="list-disc ml-4" key={index}>
                {" "}
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Generated Emails</h2>
          <ul className="space-y-6">
            {emails?.map((email) => (
              <Link to={`/campaigns/${id}/${email.id}`} key={email.id}>
                <li className="bg-card text-card-foreground rounded-lg p-4 shadow mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {email.subject}
                  </h3>
                  <p className="text-muted-foreground truncate">
                    {email.content}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Create New Email</h2>
          <form
            onSubmit={handleSave}
            className="space-y-4 border p-4 bg-white rounded-lg shadow mb-4"
          >
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter email subject"
                // required
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter email content"
                rows={10}
                // required
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2">
                <Button onClick={handleAiGenerate}>let AI do it!</Button>
                <Button
                  onClick={() => {
                    handleAiCheck();
                  }}
                >
                  AI grammer check
                </Button>
              </div>
              <Button
                onClick={handleSave}
                type="submit"
                className="bg-green-700 hover:bg-green-600"
              >
                Save Email
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
