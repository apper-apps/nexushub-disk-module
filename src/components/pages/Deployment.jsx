import React, { useState } from 'react';
import { toast } from 'react-toastify';
import JSZip from 'jszip';
import { ApperIcon } from '@/components/ApperIcon';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';

const Deployment = () => {
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  const deploymentSteps = [
    {
      title: "Build the Application",
      command: "npm run build",
      description: "Creates optimized production build in the 'dist' folder"
    },
    {
      title: "Preview Build Locally",
      command: "npm run preview",
      description: "Test the production build locally before deployment"
    }
  ];

  const hostingOptions = [
    {
      name: "Vercel",
      icon: "Globe",
      description: "Deploy directly from GitHub with automatic builds",
      steps: [
        "Connect your GitHub repository to Vercel",
        "Vercel automatically detects Vite configuration",
        "Deploy with zero configuration needed"
      ],
      url: "https://vercel.com"
    },
    {
      name: "Netlify",
      icon: "Server",
      description: "Drag-and-drop deployment or Git integration",
      steps: [
        "Build: npm run build",
        "Publish directory: dist",
        "Deploy via drag-and-drop or Git integration"
      ],
      url: "https://netlify.com"
    },
    {
      name: "GitHub Pages",
      icon: "Github",
      description: "Free hosting for public repositories",
      steps: [
        "Install: npm install --save-dev gh-pages",
        "Add to package.json scripts: \"deploy\": \"gh-pages -d dist\"",
        "Build and deploy: npm run build && npm run deploy"
      ],
      url: "https://pages.github.com"
    },
    {
      name: "Static Hosting",
      icon: "HardDrive",
      description: "Any static file hosting service",
      steps: [
        "Run: npm run build",
        "Upload the 'dist' folder contents to your hosting provider",
        "Configure server to serve index.html for all routes"
      ],
      url: null
    }
  ];

  const generateProjectZip = async () => {
    setIsGeneratingZip(true);
    
    try {
      const zip = new JSZip();
      
      // Add package.json
      const packageJson = {
        name: "nexushub",
        private: true,
        version: "0.0.0",
        type: "module",
        scripts: {
          dev: "vite",
          build: "vite build",
          lint: "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
          preview: "vite preview"
        },
        dependencies: {
          "@reduxjs/toolkit": "^2.7.0",
          "apexcharts": "^4.7.0",
          "date-fns": "^4.1.0",
          "framer-motion": "^10.16.4",
          "lucide-react": "^0.299.0",
          "react": "^18.2.0",
          "react-apexcharts": "^1.7.0",
          "react-dom": "^18.2.0",
          "react-redux": "^9.2.0",
          "react-router-dom": "^6.15.0",
          "react-toastify": "^11.0.5",
          "jszip": "^3.10.1",
          "clsx": "^2.0.0",
          "tailwind-merge": "^3.0.0"
        },
        devDependencies: {
          "@types/react": "^18.2.15",
          "@types/react-dom": "^18.2.7",
          "@vitejs/plugin-react": "^4.0.3",
          "autoprefixer": "^10.4.15",
          "eslint": "^8.45.0",
          "eslint-plugin-react": "^7.32.2",
          "eslint-plugin-react-hooks": "^4.6.0",
          "eslint-plugin-react-refresh": "^0.4.3",
          "postcss": "^8.5.5",
          "tailwindcss": "^3.3.3",
          "vite": "^6.3.5"
        }
      };
      
      zip.file("package.json", JSON.stringify(packageJson, null, 2));
      
      // Add basic README
      const readme = `# NexusHub

A modern React+Vite marketplace application.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Deployment

See the deployment guide in the application for detailed instructions.

## Features

- Modern React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Toast notifications
- Mock data services
- Responsive design
`;
      
      zip.file("README.md", readme);
      
      // Add deployment instructions
      const deploymentGuide = `# Deployment Guide

## Build Commands

### Development
\`\`\`bash
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

## Hosting Platforms

### Vercel (Recommended)
1. Connect GitHub repository
2. Automatic deployment on push
3. Zero configuration required

### Netlify
1. Build command: \`npm run build\`
2. Publish directory: \`dist\`
3. Deploy via Git or drag-and-drop

### GitHub Pages
1. Install: \`npm install --save-dev gh-pages\`
2. Add script: \`"deploy": "gh-pages -d dist"\`
3. Deploy: \`npm run build && npm run deploy\`

### Static Hosting
1. Run: \`npm run build\`
2. Upload \`dist\` folder contents
3. Configure SPA routing

## Environment Variables

Create \`.env\` file for environment-specific configuration:
\`\`\`
VITE_API_URL=your_api_url
VITE_APP_NAME=NexusHub
\`\`\`

## Production Considerations

- Configure proper routing for SPA
- Set up HTTPS
- Enable gzip compression
- Configure caching headers
- Monitor performance and errors
`;
      
      zip.file("DEPLOYMENT.md", deploymentGuide);
      
      // Generate and download
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nexushub-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Project files downloaded successfully!');
    } catch (error) {
      console.error('Error generating zip:', error);
      toast.error('Failed to generate project zip');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold gradient-text mb-4">
          Deployment Guide
        </h1>
        <p className="text-lg text-gray-300">
          Deploy your NexusHub application to production with these step-by-step instructions.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="glass-surface p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <ApperIcon name="Download" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Download Project</h3>
              <p className="text-gray-400">Get a complete project zip file</p>
            </div>
          </div>
          <Button 
            onClick={generateProjectZip}
            disabled={isGeneratingZip}
            className="w-full btn-glow"
          >
            {isGeneratingZip ? (
              <>
                <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <ApperIcon name="Download" size={16} className="mr-2" />
                Download ZIP
              </>
            )}
          </Button>
        </Card>

        <Card className="glass-surface p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <ApperIcon name="Rocket" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Quick Deploy</h3>
              <p className="text-gray-400">Ready-to-deploy configuration</p>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            Project is pre-configured for major hosting platforms with zero additional setup required.
          </div>
        </Card>
      </div>

      {/* Build Steps */}
      <Card className="glass-surface p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <ApperIcon name="Settings" size={24} className="mr-3 text-primary" />
          Build Steps
        </h2>
        <div className="space-y-4">
          {deploymentSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-background/50">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <div className="bg-surface rounded-lg p-3 mb-2 font-mono text-accent">
                  {step.command}
                </div>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hosting Options */}
      <Card className="glass-surface p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <ApperIcon name="Globe" size={24} className="mr-3 text-primary" />
          Hosting Platforms
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hostingOptions.map((option, index) => (
            <div key={index} className="p-6 rounded-lg bg-background/50 border border-primary/10 card-hover">
              <div className="flex items-center space-x-3 mb-4">
                <ApperIcon name={option.icon} size={24} className="text-accent" />
                <h3 className="text-xl font-semibold">{option.name}</h3>
                {option.url && (
                  <a 
                    href={option.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors"
                  >
                    <ApperIcon name="ExternalLink" size={16} />
                  </a>
                )}
              </div>
              <p className="text-gray-400 mb-4">{option.description}</p>
              <div className="space-y-2">
                {option.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Environment Configuration */}
      <Card className="glass-surface p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <ApperIcon name="Shield" size={24} className="mr-3 text-primary" />
          Environment Configuration
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Environment Variables</h3>
            <p className="text-gray-400 mb-4">Create a <code className="bg-surface px-2 py-1 rounded text-accent">.env</code> file for environment-specific settings:</p>
            <div className="bg-surface rounded-lg p-4 font-mono text-sm">
              <div className="text-accent">VITE_API_URL=your_api_url</div>
              <div className="text-accent">VITE_APP_NAME=NexusHub</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Production Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Configure SPA routing",
                "Enable HTTPS",
                "Set up gzip compression", 
                "Configure caching headers",
                "Monitor performance",
                "Error tracking setup"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle" size={16} className="text-accent" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Deployment;