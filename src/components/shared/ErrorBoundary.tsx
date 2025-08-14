import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ غير متوقع</h2>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى أو إعادة تحميل الصفحة.
          </p>
          
          {this.state.error && (
            <details className="mb-4 text-xs text-gray-500 max-w-md">
              <summary className="cursor-pointer hover:text-gray-700">تفاصيل الخطأ</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-left direction-ltr whitespace-pre-wrap">
                {this.state.error.message}
              </pre>
            </details>
          )}
          
          <div className="flex gap-3">
            <Button onClick={this.handleReset} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              المحاولة مرة أخرى
            </Button>
            <Button onClick={this.handleReload} className="bg-blue-600 hover:bg-blue-700">
              إعادة تحميل الصفحة
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


