'use client';

import { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { uploadFile } from '@/lib/firebase/storage';
import { useUser } from '@/firebase';

interface FileUploadProps {
  onUploadComplete: () => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const { user } = useUser();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ file, errors }) => {
        toast({
          variant: 'destructive',
          title: `File Rejected: ${file.name}`,
          description: errors.map((e) => e.message).join(', '),
        });
      });
    },
  });

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleUpload = async () => {
    if (files.length === 0 || !user) return;

    setIsUploading(true);
    setUploadProgress({});

    const uploadPromises = files.map(
      (file) =>
        new Promise<void>((resolve, reject) => {
          uploadFile(file, `uploads/${file.name}`, user.uid, (progress) => {
            setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
          })
            .then(() => {
              setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
              resolve();
            })
            .catch((error) => {
              toast({
                variant: 'destructive',
                title: `Upload Failed: ${file.name}`,
                description: error.message,
              });
              reject(error);
            });
        })
    );

    try {
      await Promise.all(uploadPromises);
      toast({
        title: 'Upload Complete',
        description: `${files.length} file(s) have been successfully uploaded.`,
      });
      setFiles([]);
      onUploadComplete(); // Notify parent component
    } catch (error) {
      console.error('An error occurred during one or more uploads.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const allUploadsDone = useMemo(() => {
    return files.every(file => uploadProgress[file.name] === 100);
  }, [files, uploadProgress]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Uploader</CardTitle>
        <CardDescription>Drag and drop files or click to browse.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-8 w-8" />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag 'n' drop files here, or click to select</p>
            )}
            <p className="text-xs">(Max 10MB per file)</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Files to upload:</h4>
            <ul className="space-y-2">
              {files.map((file) => (
                <li key={file.name} className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                  <File className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{file.name}</p>
                    {isUploading && (
                      <Progress value={uploadProgress[file.name] || 0} className="h-2 mt-1" />
                    )}
                  </div>
                  {uploadProgress[file.name] === 100 ? (
                     <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(file.name)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button onClick={handleUpload} disabled={isUploading || files.length === 0} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            `Upload ${files.length} File(s)`
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
