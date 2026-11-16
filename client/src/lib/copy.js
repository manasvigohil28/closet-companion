// All user-facing text lives here so it is easy to edit.
export const copy = {
  appName: 'Closet Companion',
  tagline: 'a place for the clothes you already own',

  nav: {
    closet: 'Closet',
    add: 'Add clothes',
    signOut: 'Sign out',
  },

  welcome: {
    script: 'you made it',
    title: 'Welcome to your closet',
    lede: 'Three small steps, and the clothes you already own start working harder.',
    steps: [
      {
        number: '01',
        title: 'Add your clothes',
        text: 'Upload photos of what you already own. A few pieces are enough to start.',
      },
      {
        number: '02',
        title: 'Plan a look',
        text: 'Tell us about your day in your own words, and get outfits from your own closet.',
      },
      {
        number: '03',
        title: 'Find what to buy next',
        text: 'See the one piece that would add the most new outfits before you shop.',
      },
    ],
    cta: 'Add my first clothes',
    note: 'You can add more any time. Nothing is shared with anyone.',
  },

  soon: {
    title: 'Coming in the next step',
    text: 'This page is being built. Your closet and the upload screen land here soon.',
    back: 'Back to the welcome page',
  },

  auth: {
    signIn: {
      script: 'welcome back',
      title: 'Sign in',
      button: 'Sign in',
      busy: 'Signing in',
      switchPrompt: 'new here?',
      switchLink: 'create an account',
    },
    signUp: {
      script: 'hello there',
      title: 'Create an account',
      button: 'Create account',
      busy: 'Creating your account',
      switchPrompt: 'already have an account?',
      switchLink: 'sign in',
    },
    fields: {
      name: 'Your name',
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      name: 'Asha',
      email: 'you@example.com',
      password: 'at least 8 characters',
    },
    side: {
      line1: 'Upload what you own.',
      line2: 'Plan a look for any day.',
      line3: 'Know what to buy next.',
    },
    errors: {
      nameRequired: 'Add your name so we know what to call you.',
      emailRequired: 'Add your email to continue.',
      emailInvalid: 'That email looks off. Check for a typo.',
      passwordRequired: 'Add your password to continue.',
      passwordShort: 'Use at least 8 characters.',
    },
  },
}
