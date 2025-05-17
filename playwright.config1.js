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

      projects:[
          {
            name:'chrome execution',
            use:{
                  browserName:'chromium',//
                  headless:false,
                  screenshot:'on',
                  trace:'retain-on-failure' //will generate trace.zip only for failed test cases
               }
          },

            {
            name:'safari execution',
            use:{
                  browserName:'webkit',//
                  headless:true,
                  screenshot:'off',
                  trace:'retain-on-failure' //will generate trace.zip only for failed test cases
               }
          }

      ],

    reporter: 'html'

  
  });

  module.exports = config