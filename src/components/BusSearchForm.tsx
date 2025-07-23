import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftRight, Calendar, MapPin, Search } from 'lucide-react';
import { cities } from '@/data/busData';

interface SearchFormData {
  from: string;
  to: string;
  date: string;
}

interface BusSearchFormProps {
  onSearch: (data: SearchFormData) => void;
}

export const BusSearchForm = ({ onSearch }: BusSearchFormProps) => {
  const [formData, setFormData] = useState<SearchFormData>({
    from: '',
    to: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.from && formData.to && formData.date) {
      onSearch(formData);
    }
  };

  const swapCities = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-medium animate-fade-in">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                From
              </Label>
              <Select value={formData.from} onValueChange={(value) => setFormData(prev => ({ ...prev, from: value }))}>
                <SelectTrigger className="border-2 focus:ring-primary">
                  <SelectValue placeholder="Select departure city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={swapCities}
                className="rounded-full p-2 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                To
              </Label>
              <Select value={formData.to} onValueChange={(value) => setFormData(prev => ({ ...prev, to: value }))}>
                <SelectTrigger className="border-2 focus:ring-secondary">
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Travel Date
              </Label>
              <Input
                type="date"
                id="date"
                min={today}
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="border-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-medium hover:shadow-strong"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Buses
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};