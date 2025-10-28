import ColorPalette from '@/components/ColorPalette';
import Button from '@/components/Button';

export default function ColorsTestPage() {
  return (
    <div className="min-h-screen bg-soft-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-center text-dark-text mb-8">
          Beauty Marketplace Design System
        </h1>
        
        <ColorPalette />
        
        {/* Button Variants Demo */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-heading font-bold text-dark-text mb-6">
            Button Components
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="medium">Primary Button</Button>
            <Button variant="secondary" size="medium">Secondary Button</Button>
            <Button variant="outline" size="medium">Outline Button</Button>
            <Button variant="ghost" size="medium">Ghost Button</Button>
          </div>
        </div>
        
        {/* Color Usage Examples */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-rose-500 text-white rounded-lg">
            <h3 className="text-xl font-heading font-bold">Rose Pink Background</h3>
            <p className="font-body">Perfect for CTAs and important elements</p>
          </div>
          
          <div className="p-6 bg-purple-500 text-white rounded-lg">
            <h3 className="text-xl font-heading font-bold">Accent Purple</h3>
            <p className="font-body">Great for secondary actions</p>
          </div>
        </div>
      </div>
    </div>
  );
}