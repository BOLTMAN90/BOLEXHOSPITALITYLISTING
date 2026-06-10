export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  trip: string;
  avatar: string;
  rating: number;
  verified?: boolean;
  hasVideo?: boolean;
}
