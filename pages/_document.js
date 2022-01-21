import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document{

  render(){
    return <Html lang='en'>
      <Head>
        <link rel="preload" as="font" crossOrigin="anonymous" href="/fonts/IBMPlexSans-Bold.ttf"/>
        <link rel="preload" as="font" crossOrigin="anonymous" href="/fonts/IBMPlexSans-Regular.ttf"/>
        <link rel="preload" as="font" crossOrigin="anonymous" href="/fonts/IBMPlexSans-SemiBold.ttf"/>
      </Head>
      <body>
        <Main></Main>
        <NextScript></NextScript>
      </body>
     </Html>
  }
}

export default MyDocument