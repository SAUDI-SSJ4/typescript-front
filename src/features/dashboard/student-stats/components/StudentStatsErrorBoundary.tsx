import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class StudentStatsErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('StudentStats Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-6">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              حدث خطأ غير متوقع
            </h3>
            <p className="text-gray-600 mb-4">
              حدث خطأ أثناء عرض الإحصائيات. يرجى المحاولة مرة أخرى.
            </p>
            {this.state.error && (
              <details className="text-left bg-gray-50 p-3 rounded-lg mb-4">
                <summary className="cursor-pointer text-sm text-gray-700 font-medium">
                  تفاصيل الخطأ
                </summary>
                <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button onClick={this.handleRetry} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              إعادة المحاولة
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}


