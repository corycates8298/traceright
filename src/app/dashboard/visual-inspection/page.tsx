
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle, XCircle } from 'lucide-react';
import {
  aiVisualInspection,
  type AIVisualInspectionOutput,
} from '@/ai/flows/ai-visual-inspection';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function VisualInspectionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIVisualInspectionOutput | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const defaultImage = PlaceHolderImages.find(p => p.id === 'delivery-photo-1');

  useEffect(() => {
    if (defaultImage && !preview) {
      setPreview(defaultImage.imageUrl);
    }
  }, [defaultImage, preview]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) {
      toast({
        variant: 'destructive',
        title: 'No image selected',
        description: 'Please upload an image to analyze.',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      // The AI flow expects a Base64 data URI. If the preview is a direct URL (like from placeholder),
      // we need to fetch and convert it first.
      let imageDataUri = preview;
      if (!preview.startsWith('data:')) {
        const response = await fetch(preview);
        const blob = await response.blob();
        imageDataUri = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
      
      const response = await aiVisualInspection({ photoDataUri: imageDataUri });
      setResult(response);
    } catch (error) {
      console.error('Error with visual inspection:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze the image. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Visual Inspection" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Delivery Photo</CardTitle>
            <CardDescription>
              Upload an image of a delivery to check for damage and verify labels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
              {preview ? (
                <Image src={preview} alt="Delivery preview" width={600} height={400} className="object-contain h-full w-full" />
              ) : (
                 <div className="text-muted-foreground">Image preview</div>
              )}
            </div>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                </Button>
                <Button onClick={handleAnalyze} disabled={isLoading || !preview}>
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                    </>
                ) : (
                    'Analyze Image'
                )}
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inspection Results</CardTitle>
            <CardDescription>
              AI-powered analysis of the delivery photo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {result ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">Damage Detection</h4>
                    {result.damageDetected ? (
                      <XCircle className="h-6 w-6 text-red-500" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.damageDetected ? 'Damage detected.' : 'No damage detected.'}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">Label Verification</h4>
                     {result.labelVerified ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                   <p className="text-sm text-muted-foreground">{result.labelVerified ? 'Label verified.' : 'Label could not be verified.'}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Confidence Score</h4>
                  <div className="flex items-center gap-3">
                    <Progress value={result.confidenceScore * 100} className="h-2" />
                    <span className="font-mono text-sm">{(result.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                </div>

                 <div>
                  <h4 className="font-semibold">Details</h4>
                  <p className="text-sm text-muted-foreground">{result.details}</p>
                </div>
              </div>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      No analysis performed
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upload or select an image and click "Analyze" to see results.
                    </p>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
