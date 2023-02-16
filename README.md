This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## ALL PROJECT CODES

`https://gist.github.com/adrianhajdin/a844254aa10510d62ecafc21d0c3714c`

## SANITY INSTALLATION with Coupon

npm install -g @sanity/cli

`sanity init --coupon javascriptmastery2022`

If already set up (coupon: https://www.sanity.io/freecodecamp)
`sanity init --project 24m7nl70 --dataset boosted-free-2021-12-08`

## Installing Dependencies

`npm install @sanity/client react-google-login react-icons axios uuidv4 zustand --legacy-peer-deps`


`npm i @react-oauth/google jwt-decode`

## Installing tailwindcss

`npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps`

`npx tailwindcss init -p`

## References:

`https://www.sanity.io/docs/how-queries-work`

`https://tailwindcss.com/docs/guides/nextjs`

`https://www.npmjs.com/package/@adaaugusta/react-google-login`

### OAuth Google

`https://developers.google.com/identity/gsi/web/guides/overview`

`https://www.npmjs.com/package/@react-oauth/google`

`https://console.cloud.google.com/`

## VS CODE ICONS

`https://codevoweb.com/top-10-best-vs-code-extensions-for-react-developers/`


## How to resolve Error displaying profile image of post author -- post.postedBy.image (using Image - next/image - in VideoCard.tsx)

Error: Invalid src prop (https://avatars.githubusercontent.com/u/66219090?v=4) on `next/image`, hostname "avatars.githubusercontent.com" is not configured under images in your `next.config.js`

See more info to resolve: 
`https://nextjs.org/docs/messages/next-image-unconfigured-host`

`https://nextjs.org/docs/api-reference/next/image`

`https://nextjs.org/docs/messages/invalid-images-config`

`https://www.sanity.io/plugins/next-sanity-image`

### Add the protocol and hostname in next.config.js:

images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com'
    }
  ]
}

You can also add port and pathname to the images.remotePatterns config ..as in below.

image: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'example.com',
            port: '',
            pathname: '/account123/**',
        },
    ],
}

If you are using an older version of Next.js prior to 12.3.0, you can use images.domains instead:

<!-- next.config.js -->
module.exports = {
  images: {
    domains: ['assets.example.com'],
  },
}

## HTML5 Video

`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video`

`https://developer.chrome.com/blog/play-returns-promise/`
