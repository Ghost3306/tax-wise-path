import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from "axios";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [taxResults, setTaxResults] = useState<any | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.includes('pdf')) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a PDF file.`,
          variant: "destructive",
        });
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post("http://localhost:8000/tax/upload/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Extracted Data from Django:", res.data);
        setTaxResults(res.data);

        const newFile: UploadedFile = {
          id: Date.now().toString() + i,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date(),
        };
        setUploadedFiles(prev => [...prev, newFile]);

        toast({
          title: "File Processed",
          description: `${file.name} was uploaded and processed successfully.`,
        });

      } catch (err: any) {
        console.error(err);
        toast({
          title: "Upload Failed",
          description: `Failed to process ${file.name}.`,
          variant: "destructive",
        });
      }
    }

    setIsUploading(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "File Removed",
      description: "File has been removed from uploads.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <Upload className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Upload Documents</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your Form 16 (PDF) for automatic extraction
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Upload Area */}
        <Card
          className={`shadow-medium transition-all duration-200 animate-slide-up ${
            isDragOver ? 'border-primary bg-primary/5' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Upload className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {isDragOver ? 'Drop PDF here' : 'Upload your Form 16'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your PDF here, or click to browse
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isUploading}
                className="bg-gradient-primary border-0"
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card className="shadow-medium animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Processed Files ({uploadedFiles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <File className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{file.uploadDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tax Results */}
        {taxResults && (
          <Card className="shadow-medium animate-fade-in mt-6">
            <CardHeader>
              <CardTitle>Extracted Tax Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {/* Taxpayer Type */}
              <p><strong>Taxpayer Type:</strong> {taxResults.cleaned.taxpayer_type}</p>

              {/* Employer Details */}
              {taxResults.extracted_fields?.employer && (
                <>
                  <p className="mt-2"><strong>Employer Details:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    {taxResults.extracted_fields.employer.PAN && <li>PAN: {taxResults.extracted_fields.employer.PAN}</li>}
                    {taxResults.extracted_fields.employer.TAN && <li>TAN: {taxResults.extracted_fields.employer.TAN}</li>}
                  </ul>
                </>
              )}

              {/* Employee Details */}
              {taxResults.extracted_fields?.employee && (
                <>
                  <p className="mt-2"><strong>Employee Details:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    {taxResults.extracted_fields.employee.PAN && <li>PAN: {taxResults.extracted_fields.employee.PAN}</li>}
                  </ul>
                </>
              )}

              {/* Cleaned Values */}
              <p><strong>Gross Income:</strong> ₹{taxResults.cleaned.gross_income}</p>
              <p><strong>TDS:</strong> ₹{taxResults.cleaned.tds}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
