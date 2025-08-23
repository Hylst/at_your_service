import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorHandlerProps {
  error?: Error | null;
  onRetry?: () => void;
  onReset?: () => void;
  className?: string;
}

/**
 * ErrorHandler component for displaying and handling errors in the logo creator
 * Provides user-friendly error messages and recovery options
 */
export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  error,
  onRetry,
  onReset,
  className = ''
}) => {
  if (!error) return null;

  return (
    <div className={`p-4 ${className}`}>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm text-muted-foreground">
              {error.message || 'An unexpected error occurred while processing your request.'}
            </p>
            <div className="flex gap-2 mt-3">
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-3 w-3" />
                  Try Again
                </Button>
              )}
              {onReset && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onReset}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorHandler;