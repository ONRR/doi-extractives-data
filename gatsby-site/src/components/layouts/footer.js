import React from 'react';
import Link from 'gatsby-link';

import logo from "img/DOI-2x.png";
import DownloadIcon from '-!svg-react-loader!img/svg/icon-download-base.svg';

import CONTACT_INFO from 'data/contact.yml';

const Footer = ({ siteMetadata }) => ( 
<footer className="footer">
  <div className="container-page-wrapper">
    <div className="footer-col_left">
      <a href="https://doi.gov"><img className="footer-image" src={logo} alt="Department of the Interior logo" /></a>
    </div>

    <div className="footer-col_right">

      <div className="footer-bottom-left">
        <p className="footer-para_callout footer-para_callout-bigger">Built in the open</p>
        <p className="footer-para">This site (<a href={"https://github.com/onrr/doi-extractives-data/releases/"+siteMetadata.version } className="link-active-beta">{ siteMetadata.version }</a>)
        is powered by <a className="link-active-beta" href="/downloads">open data</a> and <a className="link-active-beta" href="https://github.com/ONRR/doi-extractives-data/">source code</a>. 
        We welcome contributions and comments on <a className="link-active-beta" href="https://github.com/ONRR/doi-extractives-data/issues/new">GitHub</a>.</p>

        <p className="footer-para-small footer-para_last"><a href="https://www.doi.gov/" className="link-beta">Department of the Interior</a> | 
        <a href="https://www.doi.gov/privacy" className="link-beta">Privacy Policy</a> | <a href="https://www.doi.gov/foia" className="link-beta">FOIA</a> | 
        <a href="https://www.usa.gov/" className="link-beta">USA.gov</a></p>

      </div>

      <div className="footer-bottom-right">
        <p className="footer-para_callout">
          <a className="link-beta" href="/downloads/">Download data <DownloadIcon /></a>
        </p>
      </div>

      <div className="footer-bottom footer-bottom-right">
        <p className="footer-para footer-para-small">
          Office of Natural Resources Revenue, { CONTACT_INFO.information_data_management.name }<br/>
          { CONTACT_INFO.information_data_management.street }<br/>
          { CONTACT_INFO.information_data_management.city } { CONTACT_INFO.information_data_management.zip }<br/>
          <a className="link-active-beta" href={"mailto:"+CONTACT_INFO.information_data_management.email}>{ CONTACT_INFO.information_data_management.email }</a>
        </p>
      </div>

    </div>
  </div>

</footer>
);

export default Footer;