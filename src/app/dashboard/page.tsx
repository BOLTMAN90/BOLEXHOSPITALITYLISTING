"use client";

import { Suspense } from "react";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { SiteShell } from "@/components/layout/site-shell";

function DashboardContent() {
  return (
    <SiteShell>
      <UserDashboard />
    </SiteShell>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
