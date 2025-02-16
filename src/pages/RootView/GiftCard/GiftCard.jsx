import Container from "@/components/common/Container";
import ProductCardSkeleton from "@/components/RootView/common/ProductCardSkeleton";
import ShopItem from "@/components/RootView/common/ShopItem";
import useProduct from "@/hooks/useProduct";
import { Helmet } from "react-helmet-async";

const GiftCard = () => {
  const [products, isLoading] = useProduct();
  const giftCardProduct = products.filter(
    (product) => product.category === "gift-card"
  );
  return (
    <Container>
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>Gift Cards | E-commerce</title>
        <meta
          name="description"
          content="Buy gift cards for your loved ones and surprise them with exclusive deals."
        />
        <meta
          name="keywords"
          content="gift cards, e-commerce, online shopping, buy and sell, best deals"
        />
        <meta name="author" content="Your Brand Name" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Gift Cards | E-commerce" />
        <meta
          property="og:description"
          content="Buy gift cards for your loved ones and surprise them with exclusive deals."
        />
        <meta
          property="og:image"
          content="https://www.najatulislam.me/og-image.jpg"
        />
        <meta property="og:url" content="https://www.najatulislam.me/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gift Cards | E-commerce" />
        <meta
          name="twitter:description"
          content="Buy gift cards for your loved ones and surprise them with exclusive deals."
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
      <h2 className="text-2xl font-bold text-center mb-8">Gift Card</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <ShopItem item={giftCardProduct} />
      )}
    </Container>
  );
};

export default GiftCard;
