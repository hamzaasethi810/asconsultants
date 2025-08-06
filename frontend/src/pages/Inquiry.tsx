import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await fetch(`${apiUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setIsSubmitted(true);
      toast({
        title: "Inquiry submitted successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-24 bg-gradient-cream">
          <div className="luxury-container">
            <div className="max-w-2xl mx-auto text-center space-y-8 animate-fadeInUp">
              <CheckCircle className="h-24 w-24 text-primary mx-auto" />
              <h1 className="text-4xl font-heading font-bold text-primary">
                Thank You!
              </h1>
              <p className="text-xl text-muted-foreground">
                Your inquiry has been received. Our team will review your message and get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="btn-luxury">
                Submit Another Inquiry
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gradient-cream">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fadeInUp">
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-primary">
              Start Your Project
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to transform your IT infrastructure? Let's discuss how we can help 
              you achieve your technology goals with our premium contracting services.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8 animate-fadeInUp">
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our team of experts is ready to discuss your project requirements 
                  and provide a comprehensive solution tailored to your needs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-medium text-primary">Email</div>
                    <div className="text-muted-foreground">hello@asconsultants.com</div>
                  </div>
                </div>
                
                {/* <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-medium text-primary">Phone</div>
                    <div className="text-muted-foreground">+703-220-5161</div>
                  </div>
                </div> */}
                
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-medium text-primary">Response Time</div>
                    <div className="text-muted-foreground">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <Card className="border-0 shadow-elegant bg-gradient-cream">
                <CardContent className="p-3">
                  <h3 className="font-heading font-semibold text-primary mb-2">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Initial consultation within 24 hours</li>
                    <li>• Detailed project assessment</li>
                    <li>• Custom solution proposal</li>
                    <li>• Transparent pricing structure</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-luxury animate-slideInRight">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary">
                  Project Inquiry Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-primary font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background border-border focus:border-primary"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-primary font-medium">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-primary font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background border-border focus:border-primary"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-primary font-medium">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="bg-background border-border focus:border-primary resize-none"
                      placeholder="Tell us about your project requirements, timeline, and any specific challenges you're facing..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury w-full group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary-foreground mr-2">
                          <img src="/favicon.ico" alt="AS" className="w-3 h-3" />
                        </div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inquiry;