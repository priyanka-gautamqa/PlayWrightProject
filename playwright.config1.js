// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

  const config = defineConfig(
    {
      testDir:'./tests',
      timeout:30*1000,
      expect:{
          timeout:5000
      },

      /**
       *our current website is not  mobile friendly hence test might fail in iphone11 config - browser will open with that screen configurations
       *Two ways to config bbrowser screen -  
       *1. viewport:{width:1000,height:700}
        *2. ...devices['iPhone 14']
       */

        /**
         * SSL CERTIFICATE ERROR
         * Where on opening the websote we get message - your connection is not private ...
         * click on advacne and accept the terms
         * PROPERTY to handle such case : ignoreHttpsErrors:true
         */

        /**
         * Sometimes on opening the website we get popup - google wants to know your location --
         * Allow or not allowed 
         * PROPERTY to handle such case :
         * permissions:['geolocation']
         * 
         */

      projects:[
          {
            name:'chrome',
            use:{
                  browserName:'chromium',//
                  headless:false,
                  screenshot:'on',
                  trace:'retain-on-failure', //will generate trace.zip only for failed test cases
                  // viewport:{width:1000,height:700}
                 //...devices['iPhone 14']
                 //permissions:['geolocation']
                
               }
          },

            {
            name:'safari',
            use:{
                  browserName:'webkit',//
                  headless:false,
                  screenshot:'only-on-failure',
                  trace:'retain-on-failure', //will generate trace.zip only for failed test cases
                  //ignoreHTTPSErrors:true
                  video: 'retain-on-failure',
                  viewport:{width:500,height:700}
               }
          }

      ],

    reporter: 'html'

  
  });

  module.exports = config