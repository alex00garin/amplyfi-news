'use client';

import { Footer } from 'flowbite-react';
import { BsLinkedin, BsFacebook, BsGithub, BsTwitter } from 'react-icons/bs';

// Footer component with social media icons
function FooterWithSocialMediaIcons() {
  return (
    <Footer container>
      <div className="w-full">
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Amplyfi Group"
            href="#"
            year={2023}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-neutral-800">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterWithSocialMediaIcons;
