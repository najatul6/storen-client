import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center text-4xl text-center">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>About | NiN Supply</title>
        <meta
          name="description"
          content="Learn more about NiN Supply, our mission, and our team."
        />
        <meta
          name="keywords"
          content="about, mission, team, NiN Supply, company information"
        />
        <meta name="author" content="NiN Supply" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="About | NiN Supply" />
        <meta
          property="og:description"
          content="Learn more about NiN Supply, our mission, and our team."
        />
        <meta
          property="og:image"
          content="https://nin-supply.vercel.app/about-og.jpg"
        />
        <meta property="og:url" content="https://nin-supply.vercel.app/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | NiN Supply" />
        <meta
          name="twitter:description"
          content="Learn more about NiN Supply, our mission, and our team."
        />
        <meta
          name="twitter:image"
          content="https://nin-supply.vercel.app/twitter-about.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://nin-supply.vercel.app/about" />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://nin-supply.vercel.app/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>
      {/* Helmet for title and meta tags End here */}
      About Page is Coming soon
    </div>
  );
};

export default About;
