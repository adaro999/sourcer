import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="JobTarget provides organizations with verified job postings and automated distribution to state job banks and sites that reach minorities, veterans, and individuals with disabilities; helping to ensure your organization's compliance with VEVRAA, Section 503 and Executive Order 11246."
          />
          <link rel="stylesheet" href={process.env.NEXT_PUBLIC_ASSET_UI_THEME_FONT} />
          <link rel="stylesheet" href={process.env.NEXT_PUBLIC_ASSET_FONT_AWESOME} />
          <link rel="stylesheet" href={process.env.NEXT_PUBLIC_ASSET_UI_THEME_CSS} />
        </Head>
        <body>
          <Main />
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_API_KEY_GTM_ID}');
            `}
          </Script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
