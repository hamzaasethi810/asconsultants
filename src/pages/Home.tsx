import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Cloud, Shield, Zap, Users, Award } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: Server,
      title: "Server Migration",
      description: "Seamless migration of enterprise servers with zero downtime and complete data integrity."
    },
    {
      icon: Cloud,
      title: "Cloud Architecture",
      description: "Design and implement scalable cloud solutions optimized for performance and cost efficiency."
    },
    {
      icon: Shield,
      title: "Security Audits",
      description: "Comprehensive security assessments and implementation of enterprise-grade protection protocols."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "System optimization and performance tuning for maximum efficiency and reliability."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" },
    { number: "15+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-24 bg-card">
        <div className="luxury-container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Delivering enterprise-grade IT solutions with precision, reliability, and uncompromising quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-elegant hover:shadow-luxury transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center space-y-4">
                  <service.icon className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="text-xl font-heading font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-luxury text-primary-foreground">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2 animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-5xl font-heading font-bold">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="luxury-container text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeInUp">
            <h2 className="text-4xl font-heading font-bold text-primary">
              Ready to Transform Your Infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground">
              Partner with us for world-class IT contracting solutions that drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/inquiry" className="btn-luxury inline-flex items-center justify-center">
                Get Started Today
              </a>
              <a href="/about" className="btn-outline-luxury inline-flex items-center justify-center">
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;