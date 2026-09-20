import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";
import { MapParis } from "@/components/MapParis";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you as soon as possible.");
  };

  return (
    <div>
      <PageHeaderBg 
        title="Contact us" 
        subtitle="Our team is here to help"
      />
      
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form and we will get back to you quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+33 6 12 34 56 78" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your needs..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">contact@immoby.fr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opening hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Paris map */}
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Where to find us</h2>
          <MapParis />
        </div>
      </div>
      
      <ParallaxCTA />
    </div>
  );
}
