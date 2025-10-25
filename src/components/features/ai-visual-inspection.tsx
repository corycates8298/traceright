'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  Upload,
  Sparkles,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { aiVisualInspection } from '@/ai/flows/ai-visual-inspection';
import { Progress } from '@/components/ui/progress';

type InspectionResult = {
  damageDetected: boolean;
  labelVerified: boolean;
  confidenceScore: number;
  details: string;
};

const toDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function AiVisualInspection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InspectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      const dataUrl = await toDataURL(file);
      setSelectedImage(dataUrl);
    }
  };

  const handleInspect = async () => {
    if (!selectedImage) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image to inspect.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await aiVisualInspection({ photoDataUri: selectedImage });
      setResult(response);
    } catch (error) {
      console.error('AI Visual Inspection error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to perform visual inspection.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSample = () => {
    const sampleImage = PlaceHolderImages.find(
      (p) => p.id === 'delivery-photo-1'
    );
    if (sampleImage) {
      setSelectedImage(sampleImage.imageUrl);
      setResult(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Delivery Photo</CardTitle>
          <CardDescription>
            Select a photo of the delivery to check for damage and verify
            labels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected delivery"
                width={600}
                height={400}
                className="object-contain h-full w-full"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <Upload className="mx-auto h-12 w-12" />
                <p>Image preview will appear here</p>
              </div>
            )}
          </div>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
            <Button variant="secondary" onClick={handleUseSample}>
              Use Sample
            </Button>
          </div>
          <Button onClick={handleInspect} disabled={isLoading || !selectedImage}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inspecting...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Inspect
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inspection Results</CardTitle>
          <CardDescription>
            The AI&apos;s analysis of the photo will be shown below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className={
                    result.damageDetected ? 'bg-destructive/10 border-destructive' : 'bg-green-500/10 border-green-500'
                  }
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Damage Detection</CardTitle>
                    {result.damageDetected ? (
                       <ShieldAlert className="h-4 w-4 text-destructive" />
                    ) : (
                       <ShieldCheck className="h-4 w-4 text-green-500" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                       {result.damageDetected ? 'Damage Detected' : 'No Damage'}
                    </div>
                  </CardContent>
                </Card>
                 <Card
                  className={
                    result.labelVerified ? 'bg-green-500/10 border-green-500' : 'bg-destructive/10 border-destructive'
                  }
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Label Verification</CardTitle>
                     {result.labelVerified ? (
                       <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                       <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                       {result.labelVerified ? 'Verified' : 'Not Verified'}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Label>Confidence Score</Label>
                <div className="flex items-center gap-2">
                  <Progress value={result.confidenceScore * 100} />
                  <span className="font-bold">
                    {(result.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div>
                <Label>Details</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{result.details}</p>
              </div>
            </div>
          )}
           {!isLoading && !result && (
            <div className="text-center text-muted-foreground p-8">
              <p>Inspection results will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
