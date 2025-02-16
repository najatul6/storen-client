import AdminOverview from "@/components/DashboardView/AdminOverview";
import UserOverview from "@/components/RootView/DashboardView/UserOverview";
import useRole from "@/hooks/useRole";
import { Helmet } from "react-helmet-async";

const Overview = () => {
  const [userRole] = useRole();
  return (
    <div className="p-6 w-full">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>Dashboard Overview | NiN Supply</title>
        <meta
          name="description"
          content="Get a complete overview of your NiN Supply dashboard, including sales, orders, and analytics."
        />
        <meta
          name="keywords"
          content="dashboard, NiN Supply, admin panel, sales overview, analytics, business insights"
        />
        <meta name="author" content="NiN Supply" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="Dashboard Overview | NiN Supply" />
        <meta
          property="og:description"
          content="Monitor sales, orders, and key business metrics from your NiN Supply dashboard."
        />
        <meta
          property="og:image"
          content="https://nin-supply.vercel.app/dashboard-og.jpg"
        />
        <meta
          property="og:url"
          content="https://nin-supply.vercel.app/dashboard/overview"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard Overview | NiN Supply" />
        <meta
          name="twitter:description"
          content="Monitor sales, orders, and key business metrics from your NiN Supply dashboard."
        />
        <meta
          name="twitter:image"
          content="https://nin-supply.vercel.app/twitter-dashboard.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://nin-supply.vercel.app/dashboard" />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://nin-supply.vercel.app/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>

      {/* Helmet for title and meta tags End here */}

      {userRole === "admin" ? <AdminOverview /> : <UserOverview />}
    </div>
  );
};

export default Overview;
