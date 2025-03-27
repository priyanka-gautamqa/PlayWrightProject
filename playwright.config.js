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

    reporter: 'html',
    use:{
      browserName:'chromium',
     //browserName:'firefox'
    // browserName:'webkit', //safari
     headless:false
    }

  
  });

  module.exports = config