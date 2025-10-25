'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { askAboutDocuments } from '@/ai/flows/ai-reporting-hub';
import { Loader2, FileText, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function AiReportingHub() {
  const [documentContent, setDocumentContent] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();

  const handleAsk = async (e: FormEvent) => {
    e.preventDefault();
    if (!documentContent.trim() || !query.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description:
          'Please provide both document content and a question to get an answer.',
      });
      return;
    }

    setIsLoading(true);
    setAnswer('');

    try {
      const response = await askAboutDocuments({ documentContent, query });
      setAnswer(response.answer);
    } catch (error) {
      console.error('AI Reporting Hub error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get an answer from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText /> Document Input
          </CardTitle>
          <CardDescription>
            Paste your compliance or SOP document content below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAsk}>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="documentContent">Document Content</Label>
              <Textarea
                id="documentContent"
                placeholder="Paste document text here..."
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                className="h-64"
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="query">Your Question</Label>
              <Input
                id="query"
                placeholder="e.g., 'What is the procedure for handling returns?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Ask AI'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles /> AI Answer
          </CardTitle>
          <CardDescription>
            The AI&apos;s answer will appear below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {answer && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Analysis Complete</AlertTitle>
              <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
                {answer}
              </AlertDescription>
            </Alert>
          )}
          {!isLoading && !answer && (
            <div className="text-center text-muted-foreground p-8">
              <p>Your answer will be generated here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
