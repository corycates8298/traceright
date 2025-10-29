'use client';

import { useState, useEffect } from 'react';
import { listFiles, deleteFile, getFileUrl } from '@/lib/firebase/storage';
import { useUser } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Download, File, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface FileMetadata {
  name: string;
  path: string;
  size: number;
  contentType?: string;
  timeCreated: string;
}

export function FileManager() {
  const { user } = useUser();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const fileList = await listFiles('uploads/');
      setFiles(fileList);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching files',
        description: 'Could not retrieve the list of uploaded files.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (filePath: string) => {
    setIsDeleting(filePath);
    try {
      await deleteFile(filePath);
      toast({
        title: 'File Deleted',
        description: `${filePath} has been successfully deleted.`,
      });
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        variant: 'destructive',
        title: 'Error Deleting File',
        description: 'Could not delete the selected file.',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleDownload = async (filePath: string) => {
    try {
        const url = await getFileUrl(filePath);
        window.open(url, '_blank');
    } catch (error) {
        console.error('Error getting download URL:', error);
        toast({
            variant: 'destructive',
            title: 'Download Error',
            description: 'Could not get the download link for the file.'
        })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
        <CardDescription>View and manage uploaded documents.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : files.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No files found.
                </TableCell>
              </TableRow>
            ) : (
              files.map((file) => (
                <TableRow key={file.path}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <File className="h-4 w-4 text-muted-foreground" />
                    {file.name}
                  </TableCell>
                  <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                  <TableCell>{format(new Date(file.timeCreated), 'PPp')}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(file.path)}>
                        <Download className="h-4 w-4" />
                    </Button>
                    {user && ( // Only show delete for logged-in users (rules will enforce admin)
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" disabled={isDeleting === file.path}>
                                {isDeleting === file.path ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the file <span className="font-medium">{file.name}</span>.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(file.path)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
