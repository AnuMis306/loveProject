import React, { useEffect ,useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Page5.css';
import Page4 from'./Page4';
import 'leaflet/dist/leaflet.css';
import YouTube from 'react-youtube';

const Page5 = () => {
//youtube
    const videoOptions = {
      height: '390',
      width: '640',
      playerVars: {
      autoplay: 1, // Auto play the video when it loads
      },
    };

  // Google Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '450px',
  };

  // Center the map on a default location (you can change it to the first marker)
  const center = {
    lat: 28.6139,  // Default to Delhi
    lng: 77.2090,
  };

  // Locations to be marked
  const locations = [
    {
      label: 'F', // First meet
      title: 'Pune - First Meet',
      lat: 18.5204,
      lng: 73.8567,
    },
    {
      label: 'M', // Marriage
      title: 'Lucknow - Marriage',
      lat: 26.8467,
      lng: 80.9462,
    },
    {
      label: 'H', // Honeymoon
      title: 'Goa - Honeymoon',
      lat: 15.2993,
      lng: 73.9240,
    },
    {
      label: 'D', // First date
      title: 'Delhi - First Date',
      lat: 28.6139,
      lng: 77.2090,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on page load
  }, []);



  return (
    <div className="page5-container">
      {/* Grid Container */}
      <div className="grid-container">
        
        {/* Header Section */}
        <header className="header">        
        <p1>My Dearest love,</p1>,
         <p>I find myself thinking about all the beautiful moments we’ve shared, the laughter that filled our days, and the love that continues to surround me, even from a distance. I remember the little things—the way you’d hold me close, watch me getting ready, apply sindhur, the way u arranged the room when I came, the quiet moments when we’d just enjoy each other's company, how u would hold my hand in car even though you sit in front, the way I would sleep without any worry or thoughts and many more—are etched in my heart.

Though we’re far apart now, those memories keep me going. Each one reminds me of the bond we share, one that no distance can break. I carry those precious moments with me, feeling as though you’re still here beside me. I can’t wait for the day we create new memories together, but until then, I’ll treasure every laugh, every touch, every kiss, and every unforgettable moment we’ve shared.</p>
<p1>Yours forever,</p1>,
        </header>

        {/* Video Section */}
        <section className="video-section">

      
        <div className="video-container">
          
          <YouTube
        videoId="-pFAk8Wn088" // Replace with your YouTube video ID
        opts={videoOptions}
      />
        </div>
        </section>
          
           
        {/* Quote Section */}
        <section className="quote-section">
          
          <blockquote>
            "I love You Baby💋.You are so much more than just my husband, You are the one I cant wait to talk at the start or end of the day, the arms i want wrapped around me when I am feeling alone, and the only person I'd ever want to spend forever with.
            😍❤️💘💖</blockquote>
          <h3>       
          💖💐🌻🌹 Happy Valentines Day Jaan🌹🌻💐💖"
          </h3>
        </section>

        {/* Memory Map Section */}
        <section className="memory-map">
        <h3>Significant Places</h3>
        <div className="map-container">
          <Page4 />  {/* Insert the Google Map component */}
        </div>
      </section>

      </div>
      
      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Created with love💖</p>
      </footer>
    </div>
  );
}

export default Page5;
