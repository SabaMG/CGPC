// components/FileUploader.tsx
'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from '@nextui-org/react';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ImageFileUploaderProps {
    onUpload: (files: FileList) => Promise<void>;
    onDelete?: (index: number, file: File) => Promise<void>; // Nouveau prop pour la suppression
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number; // in bytes
}

export const ImageFileUploader: React.FC<ImageFileUploaderProps> = ({
    onUpload,
    onDelete,
    accept = 'image/*',
    multiple = true,
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024, // 5MB
}) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]); // Nouveau state pour stocker les fichiers
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            // Reset states
            setError(null);
            setIsUploading(true);
            setUploadProgress(0);

            // Garder les indices des nouvelles previews pour pouvoir les supprimer en cas d'erreur
            const previousPreviewsLength = previews.length;
            const newPreviewsIndices = Array.from(
                { length: acceptedFiles.length },
                (_, i) => previousPreviewsLength + i,
            );

            // Generate previews for images
            const newPreviews = acceptedFiles.map((file) =>
                URL.createObjectURL(file),
            );

            setPreviews((prev) => [...prev, ...newPreviews]);
            setFiles((prev) => [...prev, ...acceptedFiles]);

            try {
                // Convert Files array to FileList
                const dataTransfer = new DataTransfer();

                acceptedFiles.forEach((file) => {
                    dataTransfer.items.add(file);
                });

                // Simulate upload progress
                const progressInterval = setInterval(() => {
                    setUploadProgress((prev) => {
                        if (prev >= 90) {
                            clearInterval(progressInterval);

                            return prev;
                        }

                        return prev + 10;
                    });
                }, 200);

                // Actual upload
                await onUpload(dataTransfer.files);

                // Complete progress
                clearInterval(progressInterval);
                setUploadProgress(100);

                setTimeout(() => {
                    setUploadProgress(0);
                    setIsUploading(false);
                }, 500);
            } catch (err) {
                // En cas d'erreur, supprimer les previews qui viennent d'être ajoutées
                setPreviews((prev) =>
                    prev.filter(
                        (_, index) => !newPreviewsIndices.includes(index),
                    ),
                );
                setFiles((prev) =>
                    prev.filter(
                        (_, index) => !newPreviewsIndices.includes(index),
                    ),
                );

                setError('Error uploading files. Please try again.');
                setIsUploading(false);
                setUploadProgress(0);

                // Nettoyer les URLs des previews pour éviter les fuites de mémoire
                newPreviews.forEach((previewUrl) =>
                    URL.revokeObjectURL(previewUrl),
                );
            }
        },
        [onUpload, previews.length],
    );

    const removePreview = async (index: number) => {
        if (!onDelete) {
            // Si pas de onDelete prop, juste supprimer la preview
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            setFiles((prev) => prev.filter((_, i) => i !== index));

            return;
        }

        try {
            setIsDeleting(index);
            setError(null);

            // Appeler la fonction onDelete
            await onDelete(index, files[index]);

            // Supprimer la preview et le fichier des states
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            setFiles((prev) => prev.filter((_, i) => i !== index));
        } catch (err) {
            setError('Error deleting file. Please try again.');
        } finally {
            setIsDeleting(null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            [accept]: [],
        },
        multiple,
        maxFiles,
        maxSize,
        disabled: isUploading,
    });
    const t = useTranslations('FileUploader');

    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-8
          transition-colors duration-200 ease-in-out
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center gap-4">
                    <Upload className="w-12 h-12 text-gray-400" />

                    <div className="text-center">
                        {isDragActive ? (
                            <p className="text-primary">{t('drop')}</p>
                        ) : (
                            <>
                                <p className="text-gray-600">{t('message')}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    {multiple
                                        ? `${t('upload_up')} ${maxFiles} ${t('files')} (max ${maxSize / 1024 / 1024}${t('taille')})`
                                        : `Upload 1 file (max ${maxSize / 1024 / 1024}MB)`}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Error message */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {/* Upload progress */}
            {isUploading && (
                <Progress
                    className="w-full"
                    color="primary"
                    value={uploadProgress}
                />
            )}

            {/* Image previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {previews.map((preview, index) => (
                        <div key={preview} className="relative group">
                            <img
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                                src={preview}
                            />
                            <button
                                className={`absolute top-1 right-1 p-1 rounded-full 
                                ${isDeleting === index ? 'bg-gray-300' : 'bg-white/80'} 
                                text-gray-700 opacity-0 group-hover:opacity-100
                                transition-opacity duration-200`}
                                disabled={isDeleting === index}
                                onClick={() => removePreview(index)}
                            >
                                <X
                                    className={`w-4 h-4 ${isDeleting === index ? 'animate-spin' : ''}`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
