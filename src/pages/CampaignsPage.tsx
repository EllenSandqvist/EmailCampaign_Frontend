import { useState, useEffect } from "react";
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
  campaignName: string;
  companyName: string;
  companyDescription: string;
  productDescription: string;
  targetAudience: String[];
  createdAt: string | number | Date;
  userId: String;
}

const presetAudiences = [
  "Young Adults (18-25)",
  "Parents",
  "Professionals",
  "Retirees",
  "Students",
];

export default function MainPage() {
  // state for all fetched campaigns:
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  //state for creating a new campaign:
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [customAudience, setCustomAudience] = useState<string>("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(
        "https://email-campaign-platform.vercel.app/campaigns",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Could not fetch campaigns");
      }
      const data: Campaign[] = await response.json();

      console.log(data);
      setCampaigns(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

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

      setCustomAudience("");
    }
  };

  //Code for POST campaign and updating local "campaign"-state
  const createCampaign: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://email-campaign-platform.vercel.app/campaigns",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaignName: campaignTitle,
            companyName: companyName,
            companyDescription: companyDescription,
            productDescription: productDescription,
            targetAudience: selectedAudiences,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not create campaign");
      }

      const data = await response.json();
      setCampaigns([...campaigns, data]);
    } catch (error) {
      console.error("Error creating campaign: ", error);
      alert("Error creating campaign. Please try again.");
    } finally {
      setCampaignTitle("");
      setCompanyName("");
      setCompanyDescription("");
      setProductDescription("");
      setSelectedAudiences([]);
    }
  };

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Current Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <Link to={`/campaigns/${campaign.id}`} key={campaign.id}>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">
                    {campaign.campaignName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary">
                    {campaign.companyName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {campaign.productDescription}
                  </p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                    <span>
                      Created:{" "}
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                    {/* <span>Emails sent: {campaign.emailsSent}</span> */}
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
            <form className="space-y-4" onSubmit={createCampaign}>
              <Input
                placeholder="Campaign Title"
                className="bg-primary-foreground text-primary"
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
              />
              <Input
                placeholder="Company Name"
                className="bg-primary-foreground text-primary"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Textarea
                placeholder="Company Description"
                className="bg-primary-foreground text-primary"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              />
              <Textarea
                placeholder="Product Description"
                className="bg-primary-foreground text-primary"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
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

                <Select onValueChange={handleAudienceSelect} value={""}>
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
                    type="text"
                    placeholder="Custom Audience"
                    value={customAudience}
                    onChange={(e) => setCustomAudience(e.target.value)}
                    className="bg-primary-foreground text-primary"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleAddCustomAudience(customAudience)}
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
