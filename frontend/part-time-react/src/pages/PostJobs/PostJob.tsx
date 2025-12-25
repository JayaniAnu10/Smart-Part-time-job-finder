import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PostJob = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 border">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Post a New Job
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details to create your job listing
          </p>

          <form className="space-y-7">
            <div>
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g. Delivery Driver"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Job Category</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logistics">
                    Logistics & Delivery
                  </SelectItem>
                  <SelectItem value="retail">Retail & Sales</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="cleaning">
                    Cleaning & Maintenance
                  </SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="salary-min">Minimum Salary (LKR/day)</Label>
                <Input
                  id="salary-min"
                  type="number"
                  placeholder="2500"
                  className="mt-2"
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="salary-max">Maximum Salary (LKR/day)</Label>
                <Input
                  id="salary-max"
                  type="number"
                  placeholder="3000"
                  className="mt-2"
                  min={0}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Job Location</Label>
              <Input
                id="location"
                placeholder="e.g. Colombo 03, Sri Lanka"
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="start-datetime">Start Time</Label>
                <Input
                  id="start-datetime"
                  type="datetime-local"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="end-datetime">End Time</Label>
                <Input
                  id="end-datetime"
                  type="datetime-local"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the job responsibilities and information..."
                className="mt-2 min-h-37.5 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="List the required qualifications and skills..."
                className="mt-2 min-h-30 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="benefits">Benefits (Optional)</Label>
              <Textarea
                id="benefits"
                placeholder="List any benefits or perks..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="vacancies">Number of Vacancies</Label>
              <Input
                id="vacancies"
                type="number"
                placeholder="1"
                className="mt-2"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Publish Job
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
