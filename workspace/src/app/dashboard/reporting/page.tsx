
'use client';

import { useState } from 'react';
import { useCollection, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
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
import { Loader2, FileText, FileQuestion } from 'lucide-react';
import {
  askAboutDocuments,
  type AskAboutDocumentsOutput,
} from '@/ai/flows/ai-reporting-hub';
import { Skeleton } from '@/components/ui/skeleton';

type GovernanceDoc = {
  id: string;
  fileName: string;
  storagePath: string;
  metadata: Record<string, any>;
}

export default function ReportingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [queryText, setQueryText] = useState('What is the procedure for handling damaged deliveries?');
  const [result, setResult] = useState<AskAboutDocumentsOutput | null>(null);
  const { toast } = useToast();
  
  const firestore = useFirestore();
  const docsQuery = useMemoFirebase(
    () => query(collection(firestore, 'governanceDocs'), orderBy('fileName')),
    [firestore]
  );
  const { data: documents, isLoading: isLoadingDocs } = useCollection<GovernanceDoc>(docsQuery);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!queryText) {
        toast({
            variant: 'destructive',
            title: 'Query cannot be empty.',
            description: 'Please enter a question to ask the documents.',
        });
        return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const response = await askAboutDocuments({ query: queryText });
      setResult(response);
    } catch (error) {
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
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>
                Get answers from your compliance and SOP documents. The AI will search the documents listed below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    id="query"
                    name="query"
                    placeholder="Ask a question about the documents..."
                    className="min-h-[100px]"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isLoading || isLoadingDocs} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Get Answer
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
           <Card>
              <CardHeader>
                <CardTitle>Available Documents</CardTitle>
                <CardDescription>
                  The AI will search these documents for answers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-3">
                    {isLoadingDocs ? (
                        Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)
                    ) : (
                        documents?.map(doc => (
                            <div key={doc.id} className="flex items-center gap-3 text-sm p-2 rounded-md bg-muted/50">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <span className="font-mono text-muted-foreground">{doc.fileName}</span>
                            </div>
                        ))
                    )}
                    {!isLoadingDocs && documents?.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground py-4">No governance documents found.</p>
                    )}
                  </div>
              </CardContent>
           </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Answer</CardTitle>
            <CardDescription>
              The answer based on the available document content.
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
                <p className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 p-4 rounded-md whitespace-pre-wrap">
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
                      Input a query to get an AI-generated answer from your documents.
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
