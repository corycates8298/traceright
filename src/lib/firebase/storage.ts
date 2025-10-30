'use client';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();
const storage = getStorage();

/**
 * Uploads a file to Firebase Storage and saves its metadata to Firestore.
 * @param file The file to upload.
 * @param path The path in Firebase Storage where the file will be stored.
 * @param uploaderId The UID of the user uploading the file.
 * @param onProgress Callback function to track upload progress.
 * @returns A promise that resolves when the upload is complete.
 */
export const uploadFile = (
  file: File,
  path: string,
  uploaderId: string,
  onProgress: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const metadata = await getMetadata(uploadTask.snapshot.ref);

          // Save metadata to Firestore
          const fileDocRef = doc(firestore, 'uploads', metadata.name);
          await setDoc(fileDocRef, {
            name: metadata.name,
            path: metadata.fullPath,
            url: downloadURL,
            contentType: metadata.contentType,
            size: metadata.size,
            timeCreated: metadata.timeCreated,
            uploaderId: uploaderId,
            updatedAt: serverTimestamp(),
          });
          resolve();
        } catch (error) {
          console.error('Failed to save metadata:', error);
          reject(error);
        }
      }
    );
  });
};

/**
 * Lists all files in a given storage path.
 * @param path The path to list files from.
 * @returns A promise that resolves with an array of file metadata.
 */
export const listFiles = async (path: string) => {
  const listRef = ref(storage, path);
  const res = await listAll(listRef);
  
  const files = await Promise.all(
    res.items.map(async (itemRef) => {
      const metadata = await getMetadata(itemRef);
      return {
        name: metadata.name,
        path: metadata.fullPath,
        size: metadata.size,
        contentType: metadata.contentType,
        timeCreated: metadata.timeCreated,
      };
    })
  );

  return files;
};

/**
 * Deletes a file from Firebase Storage.
 * @param path The full path of the file to delete.
 * @returns A promise that resolves when the file is deleted.
 */
export const deleteFile = (path: string): Promise<void> => {
  const fileRef = ref(storage, path);
  return deleteObject(fileRef);
};

/**
 * Gets the download URL for a file in Firebase Storage.
 * @param path The full path of the file.
 * @returns A promise that resolves with the download URL.
 */
export const getFileUrl = (path: string): Promise<string> => {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
}
