import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <p className="text-sm font-semibold text-orange-500 mb-2">Route Error</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error.status} {error.statusText}
          </h1>
          <p className="text-sm text-gray-600">
            {typeof error.data === "string"
              ? error.data
              : "Something went wrong while loading this page."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <p className="text-sm font-semibold text-orange-500 mb-2">Application Error</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-sm text-gray-600">
          Please refresh the page or try again later.
        </p>
      </div>
    </div>
  );
}
