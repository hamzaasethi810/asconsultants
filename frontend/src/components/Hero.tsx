import { Button } from '@/components/ui/button';
import { ArrowRight, Server, Cloud, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      
      <div className="luxury-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-primary leading-tight">
                AS Consultants
                <br />
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Premium IT infrastructure solutions for enterprise clients. 
                Server migration, cloud optimization, and secure system architecture.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inquiry">
                <Button className="btn-luxury group">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="btn-outline-luxury">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Services preview */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <Server className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm font-medium text-muted-foreground">Server Migration</p>
              </div>
              <div className="text-center space-y-2">
                <Cloud className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm font-medium text-muted-foreground">Cloud Solutions</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm font-medium text-muted-foreground">Security Audits</p>
              </div>
            </div>
          </div>

          {/* Visual element */}
          <div className="hidden lg:block animate-slideInRight">
            <div className="flex items-center justify-center">
              <img 
                src="/apple-touch-icon.png" 
                alt="AS Consultants Logo" 
                className="w-96 h-96 rounded-full shadow-luxury border-4 border-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;