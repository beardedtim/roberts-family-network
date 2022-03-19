# Roberts Family Network

## Development

```
git clone git@github.com:beardedtim/roberts-family-network.git
cd roberts-family-network
docker-compose up -d
cp .env.example .env.local
npm run dev
```

This will autogenerate three users: `tim`, `kit`, and `lar`, along
with assigning them `overlord` and/or `admin` roles. You can change
or modify this inside of `sql/init.sql`

## Authorization

This system uses Auth0 to handle user credentials. We may add Two Factor Authentication
and it will be handled via the same system. RFN DOES NOT STORE ANY PASSWORDS. It does
store your email internally to track the Auth0 with our internal profile.

## Screencaps

_**Feed**_

![](https://imgur.com/1BUhBQW.png)

_**Profile**_

- Others
  ![](https://imgur.com/uxuGPZ0.png)

- Your self
  ![](https://imgur.com/OL4PFI7.png)

_**Authentication by Auth0**_

![](https://imgur.com/hSAobpl.png)

## Demos

_**Update 1**_

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/18cb3422f158435d94a2d96916d96b30" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
