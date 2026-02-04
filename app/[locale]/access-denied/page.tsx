import { ShieldX } from "lucide-react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldX className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-3">Access Denied</h1>
        
        <p className="text-muted-foreground mb-8">
          You don&apos;t have permission to view this page. Please contact an administrator if you believe this is a mistake.
        </p>
        
        {/* <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link> */}
      </div>
    </div>
  );
};

export default AccessDenied;
