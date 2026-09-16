import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer" aria-label="Site Footer">
      <div className="site-footer-inner">
        <p className="site-footer-copyright">Copyright © 2026 Savan</p>

        {/* Original WhatsApp & Google Mail Social Icons */}
        <div className="site-footer-socials">
          {/* Original WhatsApp Icon */}
          <a
            href="https://wa.me/918178618336"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn footer-whatsapp-btn"
            id="footer-whatsapp-link"
            aria-label="Chat on WhatsApp (+91 8178618336)"
            title="WhatsApp: +91 8178618336"
          >
            <svg
              viewBox="0 0 175.216 175.552"
              width="28"
              height="28"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="wa-original-grad" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#57d163" />
                  <stop offset="1" stopColor="#23b33a" />
                </linearGradient>
              </defs>
              <path fill="#fff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z" />
              <path fill="url(#wa-original-grad)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z" />
              <path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" />
            </svg>
          </a>

          {/* Original Google Mail (Gmail) Icon */}
          <a
            href="mailto:ksavan421@gmail.com"
            className="footer-social-btn footer-gmail-btn"
            id="footer-email-link"
            aria-label="Send Email via Google Mail to Savan (ksavan421@gmail.com)"
            title="Google Mail: ksavan421@gmail.com"
          >
            <svg
              viewBox="52 42 88 66"
              width="27"
              height="21"
              aria-hidden="true"
            >
              <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
              <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
              <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
              <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
              <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
