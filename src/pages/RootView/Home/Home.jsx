import CategoryZone from "@/components/RootView/Home/CategoryZone/CategoryZone";
import PopularProducts from "@/components/RootView/Home/PopularProducts/PopularProducts";
import Wholesale from "@/components/RootView/Home/WholeSale/Wholesale";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>NiN Supply | Official Site</title>
        <meta
          name="description"
          content="Discover the best deals on our e-commerce platform for buying and selling high-quality products."
        />
        <meta
          name="keywords"
          content="e-commerce, online shopping, buy and sell, best deals, online store"
        />
        <meta name="author" content="Your Brand Name" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Home | E-commerce" />
        <meta
          property="og:description"
          content="Shop the latest products and enjoy exclusive discounts on our e-commerce platform."
        />
        <meta
          property="og:image"
          content="https://www.najatulislam.me/og-image.jpg"
        />
        <meta property="og:url" content="https://www.najatulislam.me/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | E-commerce" />
        <meta
          name="twitter:description"
          content="Shop the latest products and enjoy exclusive discounts on our e-commerce platform."
        />
        <meta
          name="twitter:image"
          content="https://www.najatulislam.me/twitter-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.najatulislam.me/" />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://www.najatulislam.me/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>

      {/* Helmet for title and meta tags End here */}

      <PopularProducts />
      <CategoryZone />
      <Wholesale />
    </div>
  );
};

export default Home;
