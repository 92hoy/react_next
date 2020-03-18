// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.history.scrollRestoration = "manual"
              if (!String.prototype.startsWith) {
                String.prototype.startsWith = function(searchString, position){
                  position = position || 0;
                  return this.substr(position, searchString.length) === searchString;
              };
            }
        `,
          }}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument