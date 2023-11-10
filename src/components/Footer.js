'use client';

// Import required modules and components
import { Footer } from 'flowbite-react';
import { BsLinkedin, BsFacebook, BsGithub, BsTwitter } from 'react-icons/bs';

// Footer component that includes social media icons
function FooterWithSocialMediaIcons() {
  return (
    // Use Flowbite's Footer container
    <Footer container>
      <div className="w-full">
        {/* Insert a divider */}
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            // Display copyright info
            by="Amplyfi Group"
            href="#"
            year={2023}
          />
          {/* Social media icons */}
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-neutral-800">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsLinkedin}/>
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

// Export component for use in other parts of the app
export default FooterWithSocialMediaIcons;
