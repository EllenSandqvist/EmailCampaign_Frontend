import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

interface Campaign {
  id: number;
  title: string;
  company: string;
  summary: string;
  createdAt: string;
  emailsSent: number;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Summer Sale",
    company: "Fashion Co.",
    summary: "Promote our new summer collection with exclusive discounts.",
    createdAt: "2023-06-15",
    emailsSent: 5000,
  },
  {
    id: 2,
    title: "Product Launch",
    company: "Tech Innovations",
    summary: "Introduce our revolutionary smartphone to the market.",
    createdAt: "2023-07-01",
    emailsSent: 10000,
  },
  {
    id: 3,
    title: "Customer Appreciation",
    company: "Gourmet Delights",
    summary: "Thank our loyal customers with special offers and recipes.",
    createdAt: "2023-06-30",
    emailsSent: 3000,
  },
];

const presetAudiences = [
  "Young Adults (18-25)",
  "Parents",
  "Professionals",
  "Retirees",
  "Students",
];

export default function MainPage() {
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [customAudience1, setCustomAudience1] = useState("");
  const [customAudience2, setCustomAudience2] = useState("");

  const handleAudienceSelect = (value: string) => {
    if (!selectedAudiences.includes(value)) {
      setSelectedAudiences([...selectedAudiences, value]);
    }
  };

  const handleRemoveAudience = (audience: string) => {
    setSelectedAudiences(selectedAudiences.filter((a) => a !== audience));
  };

  const handleAddCustomAudience = (value: string) => {
    if (value && !selectedAudiences.includes(value)) {
      setSelectedAudiences([...selectedAudiences, value]);
      if (value === customAudience1) setCustomAudience1("");
      if (value === customAudience2) setCustomAudience2("");
    }
  };

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Current Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign, index) => (
            <Link to={`/campaigns/${campaign.id}`}>
              <Card
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary">
                    {campaign.company}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {campaign.summary}
                  </p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                    <span>Created: {campaign.createdAt}</span>
                    <span>Emails sent: {campaign.emailsSent}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex justify-center">
        <Card className="w-full max-w-2xl bg-primary text-primary-foreground shadow-xl">
          <CardHeader className="border-b border-primary-foreground/10">
            <CardTitle className="text-2xl">Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <Input
                placeholder="Campaign Title"
                className="bg-primary-foreground text-primary"
              />
              <Input
                placeholder="Company Name"
                className="bg-primary-foreground text-primary"
              />
              <Textarea
                placeholder="Company Description"
                className="bg-primary-foreground text-primary"
              />
              <Textarea
                placeholder="Product Description"
                className="bg-primary-foreground text-primary"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAudiences.map((audience) => (
                    <div
                      key={audience}
                      className="flex items-center bg-primary-foreground text-primary rounded-full px-3 py-1 text-sm"
                    >
                      {audience}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0 text-primary hover:text-primary-foreground hover:bg-primary"
                        onClick={() => handleRemoveAudience(audience)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Select onValueChange={handleAudienceSelect}>
                  <SelectTrigger className="bg-primary-foreground text-primary">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {presetAudiences.map((audience) => (
                      <SelectItem key={audience} value={audience}>
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Custom Audience"
                    value={customAudience1}
                    onChange={(e) => setCustomAudience1(e.target.value)}
                    className="bg-primary-foreground text-primary"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleAddCustomAudience(customAudience1)}
                    className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Add
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Create Campaign
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
