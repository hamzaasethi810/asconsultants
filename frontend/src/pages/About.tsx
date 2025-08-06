import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every project executed with meticulous attention to detail and unwavering commitment to excellence."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building lasting relationships through trust, transparency, and collaborative problem-solving."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Setting industry standards through innovative solutions and world-class service delivery."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Pioneering cutting-edge technologies to keep our clients ahead of the digital transformation curve."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-cream">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeInUp">
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-primary">
              About AS Consultants
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For over 15 years, we have been the trusted partner for enterprise clients seeking 
              premium IT infrastructure solutions. Our commitment to excellence and innovation 
              has established us as leaders in the contracting industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-card">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fadeInUp">
              <h2 className="text-4xl font-heading font-bold text-primary">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To deliver world-class IT contracting services that empower businesses 
                to achieve their digital transformation goals. We combine deep technical 
                expertise with a commitment to exceptional service, ensuring every project 
                exceeds expectations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of certified professionals brings decades of collective experience 
                in enterprise infrastructure, cloud architecture, and security implementation. 
                We don't just deliver solutions—we build lasting partnerships.
              </p>
            </div>
            
            <div className="animate-slideInRight">
              <div className="relative">
                <img 
                  src="/cloudsecurity.jpg" 
                  alt="Cloud Security Solutions" 
                  className="w-full h-80 object-cover rounded-lg shadow-luxury border-2 border-primary/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="luxury-container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision, every project, and every client relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-elegant hover:shadow-luxury transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center space-y-4">
                  <value.icon className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="text-xl font-heading font-semibold text-primary">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section
      <section className="py-24 bg-gradient-luxury text-primary-foreground">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 animate-fadeInUp">
              <div className="text-5xl font-heading font-bold">500+</div>
              <div className="text-xl">Successful Projects</div>
              <p className="opacity-90">
                From small-scale migrations to enterprise-wide transformations
              </p>
            </div>
            
            <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-heading font-bold">15+</div>
              <div className="text-xl">Years of Excellence</div>
              <p className="opacity-90">
                Proven track record of delivering innovative IT solutions
              </p>
            </div>
            
            <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="text-5xl font-heading font-bold">24/7</div>
              <div className="text-xl">Support & Monitoring</div>
              <p className="opacity-90">
                Continuous support to ensure optimal system performance
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="luxury-container text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeInUp">
            <h2 className="text-4xl font-heading font-bold text-primary">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover how our expertise can transform your IT infrastructure and drive your business forward.
            </p>
            <a href="/inquiry" className="btn-luxury inline-flex items-center justify-center">
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;