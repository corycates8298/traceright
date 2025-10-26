'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  askAboutDocuments,
  type AskAboutDocumentsOutput,
} from '@/ai/flows/ai-reporting-hub';

export default function ReportingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AskAboutDocumentsOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const documentContent = formData.get('document-content') as string;
    const query = formData.get('query') as string;

    try {
      const response = await askAboutDocuments({ documentContent, query });
      setResult(response);
    } catch (error)
 {
      console.error('Error asking about documents:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get an answer. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Reporting Hub" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ask About Your Documents</CardTitle>
            <CardDescription>
              Get answers from your compliance and SOP documents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="document-content"
                  name="document-content"
                  placeholder="Paste the content of your documents here..."
                  className="min-h-[200px]"
                  defaultValue="Standard Operating Procedure for Warehouse Goods Receiving: All deliveries must be inspected for damage before acceptance. Any visible damage must be noted on the bill of lading. All items must be scanned into the inventory system within 2 hours of receipt."
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  id="query"
                  name="query"
                  placeholder="Ask a question about the documents..."
                  className="min-h-[80px]"
                  defaultValue="What is the procedure for handling damaged deliveries?"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Get Answer'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Answer</CardTitle>
            <CardDescription>
              The answer based on the document content provided.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {result ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground bg-slate-100 p-4 rounded-md">
                    {result.answer}
                </p>
              </div>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg p-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      No question asked
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Input document content and a query to get an answer.
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
