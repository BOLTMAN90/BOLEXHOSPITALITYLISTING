"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Car,
  ConciergeBell,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
  {
    id: "concierge",
    icon: ConciergeBell,
    title: "24/7 Concierge",
    description: "Personal assistance anytime, anywhere in the world.",
  },
  {
    id: "transfers",
    icon: Car,
    title: "Airport Transfers",
    description: "Seamless private transfers in luxury vehicles.",
  },
  {
    id: "chef",
    icon: UtensilsCrossed,
    title: "Private Chef",
    description: "World-class dining experiences in your residence.",
  },
  {
    id: "experiences",
    icon: Sparkles,
    title: "Bespoke Experiences",
    description: "Custom itineraries and exclusive access curated for you.",
  },
];

export function ConciergeServices() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("concierge");
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: "",
    notes: "",
  });

  const openRequest = (serviceId: string) => {
    setSelectedService(serviceId);
    setOpen(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.dates) {
      toast.error("Please fill in name, email, and dates.");
      return;
    }
    toast.success("Request received. Our concierge team will contact you shortly.");
    setForm({ name: "", email: "", dates: "", notes: "" });
    setOpen(false);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="flex flex-col rounded-2xl border border-border/60 bg-bolex-secondary/50 p-6 transition-shadow hover:shadow-luxury"
          >
            <service.icon className="size-6 text-bolex-accent" />
            <h3 className="text-h3 mt-4 text-bolex-primary">{service.title}</h3>
            <p className="text-body mt-2 flex-1 text-bolex-primary/65">
              {service.description}
            </p>
            <Button
              variant="outline"
              onClick={() => openRequest(service.id)}
              className="mt-6 w-full border-bolex-primary/20"
            >
              Request Service
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md gap-4">
          <DialogHeader>
            <DialogTitle className="font-heading">Concierge Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="concierge-service">Service type</Label>
              <Select
                value={selectedService}
                onValueChange={(value) => value && setSelectedService(value)}
              >
                <SelectTrigger id="concierge-service" className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="concierge-name">Full name</Label>
              <Input
                id="concierge-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concierge-email">Email</Label>
              <Input
                id="concierge-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concierge-dates">Travel dates</Label>
              <Input
                id="concierge-dates"
                value={form.dates}
                onChange={(e) => setForm({ ...form, dates: e.target.value })}
                placeholder="e.g. June 12 – June 18"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concierge-notes">Notes</Label>
              <Textarea
                id="concierge-notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Tell us how we can assist you..."
                rows={3}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
            >
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
