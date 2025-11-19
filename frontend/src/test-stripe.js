// Test file to verify Stripe integration
// This file can be deleted after testing

import { loadStripe } from '@stripe/stripe-js';

// Test function to verify Stripe can be loaded
export const testStripeIntegration = async () => {
  try {
    const stripe = await loadStripe('pk_test_your_publishable_key_here');
    if (stripe) {
      console.log('✅ Stripe loaded successfully');
      return true;
    } else {
      console.log('❌ Failed to load Stripe');
      return false;
    }
  } catch (error) {
    console.error('❌ Error loading Stripe:', error);
    return false;
  }
};

// You can call this function in your console to test:
// import { testStripeIntegration } from './test-stripe';
// testStripeIntegration();
